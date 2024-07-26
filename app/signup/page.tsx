import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Header from '@/components/Header/Header';

export default async function Signup({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    return redirect('/');
  }

  const signUp = async (formData: FormData) => {
    'use server';

    const origin = headers().get('origin');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const supabase = createClient();

    if (password !== confirmPassword) {
      return redirect('/signup?message=Passwords do not match');
    }

    const {data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    
    if (error) {
      console.error('Signup error:', error);
      return redirect(`/signup?message=${encodeURIComponent(error.message)}`);
    }
  
    if (data?.user?.identities?.length === 0) {
      return redirect('/signup?message=Email already in use');
    }
  
    return redirect(
      `/confirm?message=Check email (${email}) to continue sign in process`
    );
  };

  return (
    <div className="min-h-screen bg-indigo-600">
      <Header />

      <Link
        href="/"
        className="py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover text-sm m-4"
      >
        Home
      </Link>

      <div className="w-full px-8 sm:max-w-md mx-auto mt-4 bg-blue-50 p-6 shadow-md rounded-lg">
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-4 text-blue-900 mb-4"
          action={signUp}
        >
          <label className="text-md text-blue-900" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-white border border-blue-300 text-blue-900 placeholder-blue-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md text-blue-900" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-white border border-blue-300 text-blue-900 placeholder-blue-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <label className="text-md text-blue-900" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-white border border-blue-300 text-blue-900 placeholder-blue-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
            required
          />
          <button className="bg-blue-600 rounded-md px-4 py-2 text-white hover:bg-blue-700 transition mb-2">
            Sign up
          </button>

          {searchParams?.message && (
            <p className="mt-4 p-4 bg-blue-100 text-blue-800 text-center rounded-md">
              {searchParams.message}
            </p>
          )}
        </form>

        <Link
          href="/login"
          className="rounded-md no-underline text-blue-900 text-sm"
        >
          Already have an account? Sign In
        </Link>
      </div>
    </div>
  );
}
