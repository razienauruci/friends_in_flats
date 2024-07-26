import Header from '@/components/Header/Header';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function Login({
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

  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Could not authenticate user');
    }

    return redirect('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-10">
        <Link
          href="/"
          className="py-2 px-4 rounded-md no-underline text-blue-600 bg-sand-200 hover:bg-sand-300 text-sm m-4"
        >
          Home
        </Link>

        <div className="w-full px-8 sm:max-w-md mx-auto mt-4 bg-blue-50 p-6 shadow-md rounded-lg">
          <form
            className="flex-1 flex flex-col w-full justify-center gap-4 text-blue-800"
            action={signIn}
          >
            <label className="text-lg" htmlFor="email">
              Email
            </label>
            <input
              className="rounded-md px-4 py-2 bg-white border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              name="email"
              placeholder="you@example.com"
              required
            />
            <label className="text-lg" htmlFor="password">
              Password
            </label>
            <input
              className="rounded-md px-4 py-2 bg-white border border-blue-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
            <button className="bg-blue-600 rounded-md px-4 py-2 text-white hover:bg-blue-700 transition mb-2">
              Sign In
            </button>

            {searchParams?.message && (
              <p className="mt-4 p-4 bg-blue-100 text-blue-800 text-center rounded-md">
                {searchParams.message}
              </p>
            )}
          </form>

          <Link
            href="/forgot-password"
            className="rounded-md no-underline text-blue-600 text-sm mt-4"
          >
            Forgotten Password.
          </Link>

          <br />
          <br />

          <Link
            href="/signup"
            className="rounded-md no-underline text-blue-600 text-sm"
          >
            Don't have an Account? Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}