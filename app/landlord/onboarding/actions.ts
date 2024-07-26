'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addApartment(prevState: any, formData: FormData) {
  const supabase = createClient();

  const name = formData.get('name') as string;
  const location = formData.get('location') as string;
  const price = parseInt(formData.get('price') as string);
  const description = formData.get('description') as string;

  const { data, error } = await supabase
    .from('apartments')
    .insert({ name, location, price, description })
    .select()
    .single();

  if (error) {
    return { error: error.message, success: false, id: null };
  }

  revalidatePath('/landlord/onboarding');
  return { error: null, success: true, id: data.id };
}


export async function addRoom(prevState: any, formData: FormData) {
//   const supabase = createServerComponentClient({ cookies });
const supabase = createClient();
  
  // Ensure the user is authenticated
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    return { error: 'User is not authenticated', success: false };
  }

  const apartmentId = formData.get('apartmentId') as string;
  const name = formData.get('name') as string;
  const size = formData.get('size') as string;
  const equipment = formData.get('equipment') as string;
  const image = formData.get('image') as File;

  if (!image) {
    return { error: 'No image file provided', success: false };
  }

  // Upload image
  const { data: imageData, error: imageError } = await supabase.storage
    .from('room-images')
    .upload(`${apartmentId}/${name}-${Date.now()}.png`, image, {
      contentType: 'image/png'
    });

  if (imageError) {
    console.error('Image upload error:', imageError);
    return { error: `Error uploading image: ${imageError.message}`, success: false };
  }

  // Get public URL of the uploaded image
  const { data: { publicUrl } } = supabase.storage
    .from('room-images')
    .getPublicUrl(imageData.path);

  // Insert room
  const { error: roomError } = await supabase
    .from('rooms')
    .insert({
      apartment_id: apartmentId,
      name,
      size,
      equipment,
      image_url: publicUrl,
    });

  if (roomError) {
    console.error('Room insertion error:', roomError);
    return { error: `Error adding room: ${roomError.message}`, success: false };
  }

  revalidatePath('/landlord/onboarding');
  return { error: null, success: true };
}
