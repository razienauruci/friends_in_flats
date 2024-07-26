'use client';

import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useSignOut } from '@/app/actions/auth';
import { Session } from '@supabase/supabase-js';

// export default async function User() {
//   const supabase = createClient();

//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   const signOut = async () => {
//     'use server';

//     const supabase = createClient();
//     await supabase.auth.signOut();
//     return redirect('/login');
//   };

//   return (
//     session && (
//       <div className="flex items-center gap-4">
//         Hey, {session.user.email}!
//         <form action={signOut}>
//           <button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
//             Logout
//           </button>
//         </form>
//       </div>
//     )
//   );
// }

export default function User() {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClient();
  const signOut = useSignOut();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    return null;
  }

  return (
    <div className="flex items-center space-x-4 text-blue-600">
      <span>Hey, {session.user.email}!</span>
      <button onClick={signOut} className="hover:text-blue-800 transition-colors">
        Sign out
      </button>
    </div>
  );
}
