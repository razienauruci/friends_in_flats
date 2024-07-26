import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    console.log("Code from email confirmation: " + code);
    const supabase = createClient();
    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);
      if (error) throw error;

      // If successful, redirect to the home page
      return NextResponse.redirect(new URL('/', requestUrl.origin));
    } catch (error) {
      console.error('Error in auth callback:', error);
      // Redirect to an error page or login page with an error message
      return NextResponse.redirect(new URL('/login?error=AuthenticationFailed', requestUrl.origin));
    }
  }

  // If no code is present, redirect to the home page
  return NextResponse.redirect(new URL('/', requestUrl.origin));
}