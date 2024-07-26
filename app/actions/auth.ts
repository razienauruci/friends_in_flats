'use client'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation';

export function useSignOut() {
  const router = useRouter();

  return async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/login');
  }
}