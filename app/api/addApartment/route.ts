import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
  const supabase = createClient();
  const { name, location, price, description } = await request.json();

  const { data, error } = await supabase
    .from('apartments')
    .insert({ name, location, price, description })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, id: data.id }, { status: 200 });
}