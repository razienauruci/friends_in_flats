'use client';
import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/Header/Header';
import { ApartmentForm } from './ApartmentForm';
import { RoomForm } from './RoomForm';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function LandlordOnboarding({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [apartmentId, setApartmentId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // Create supabase client
  const supabase = createClient();

  useEffect(() => {
    const checkAuthentication = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      }
    };

    checkAuthentication();
  }, [supabase, router]);

  const handleApartmentCreated = useCallback((id: number) => {
    setApartmentId(id);
  }, []);

  const handleRoomAdded = useCallback(() => {
    router.push('/landlord/onboarding?message=Room added successfully');
  }, [router]);

  const handleFinish = useCallback(() => {
    router.push('/landlord/dashboard');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Landlord Onboarding</h1>

        {searchParams?.message && (
          <div className="mt-8 p-4 bg-green-100 text-green-700 rounded-md text-center">
            {searchParams.message}
          </div>
        )}

        {errorMessage && (
          <div className="mt-8 p-4 bg-red-100 text-red-700 rounded-md text-center">
            {errorMessage}
          </div>
        )}

        {apartmentId === null ? (
          <ApartmentForm onApartmentCreated={handleApartmentCreated} setErrorMessage={setErrorMessage} />
        ) : (
          <RoomForm apartmentId={apartmentId} onRoomAdded={handleRoomAdded} setErrorMessage={setErrorMessage} />
        )}

        {apartmentId !== null && (
          <button
            onClick={handleFinish}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-colors"
          >
            Finish
          </button>
        )}
      </main>
    </div>
  );
}
