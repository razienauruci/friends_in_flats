'use client';

import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ApartmentCard from './ApartmentCard';
import SearchFilters from './SearchFilters';
import Link from 'next/link';

interface Apartment {
  id: string;
  name: string;
  location: string;
  price: number;
  description: string;
}

interface Room {
  id: string;
  apartment_id: string;
  name: string;
  size: number;
  equipment: string;
  image_url: string;
}

const ListingsPage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchLocation, setSearchLocation] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [priceRange, setPriceRange] = useState<{ min: number, max: number }>({ min: 0, max: 10000 });

  // Create supabase client
  const supabase = createClient();

  useEffect(() => {
    const fetchApartments = async () => {
      const { data: apartmentsData, error: apartmentsError } = await supabase.from('apartments').select('*');
      if (apartmentsError) console.error(apartmentsError);
      else {
        setApartments(apartmentsData);
        if (apartmentsData.length > 0) {
          const prices = apartmentsData.map(apartment => apartment.price);
          setPriceRange({
            min: Math.min(...prices),
            max: Math.max(...prices),
          });
        }
      }
    };

    const fetchRooms = async () => {
      const { data: roomsData, error: roomsError } = await supabase.from('rooms').select('*');
      if (roomsError) console.error(roomsError);
      else setRooms(roomsData);
    };

    fetchApartments();
    fetchRooms();
  }, [supabase]);

  const getUniqueLocations = () => {
    const locations = apartments.map(apartment => apartment.location);
    return Array.from(new Set(locations)).sort();
  };

  const filteredApartments = apartments.filter(apartment => {
    return (
      (searchLocation === '' || apartment.location.toLowerCase().includes(searchLocation.toLowerCase())) &&
      (maxPrice === undefined || apartment.price <= maxPrice)
    );
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="absolute top-4 right-4">
          <Link href="/" passHref>
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Home</button>
          </Link>
        </div>
        <h1 className="text-5xl font-[Montserrat] text-blue-900 mb-10 border-b-4 border-blue-600 pb-4">Available Flats</h1>
        <SearchFilters 
          setSearchLocation={setSearchLocation} 
          setMaxPrice={setMaxPrice} 
          locations={getUniqueLocations()} 
          priceRange={priceRange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          {filteredApartments.map(apartment => (
            <ApartmentCard key={apartment.id} apartment={apartment} rooms={rooms.filter(room => room.apartment_id === apartment.id)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
