import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const formData = await request.formData();
  const apartmentId = formData.get('apartmentId');
  const name = formData.get('name') as string;
  const size = formData.get('size') as string;
  const equipment = formData.get('equipment') as string;
  const image = formData.get('image') as File;

  // Upload image
  const { data: imageData, error: imageError } = await supabase.storage
    .from('room-images')
    .upload(`${apartmentId}/${name}-${Date.now()}.jpg`, image);

  if (imageError) {
    return NextResponse.json({ error: 'Error uploading image' }, { status: 500 });
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
    return NextResponse.json({ error: 'Error adding room' }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}