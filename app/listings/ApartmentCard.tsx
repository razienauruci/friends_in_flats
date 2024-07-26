import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';

interface Room {
  id: string;
  apartment_id: string;
  name: string;
  size: number;
  equipment: string;
  image_url: string;
}

interface Apartment {
  id: string;
  name: string;
  location: string;
  price: number;
  description: string;
}

interface ApartmentCardProps {
  apartment: Apartment;
  rooms: Room[];
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment, rooms }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-2 text-gray-900">{apartment.name}</h2>
      <p className="text-gray-800 mb-2">{apartment.location}</p>
      <p className="text-gray-800 mb-2">Price: ${apartment.price}</p>
      <p className="text-gray-800 mb-4">{apartment.description}</p>
      <h3 className="text-xl font-bold mb-2 text-gray-900">Rooms:</h3>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        navigation
        modules={[Navigation]}
        className="mySwiper"
      >
        {rooms.map((room) => (
          <SwiperSlide key={room.id}>
            <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
              <h4 className="text-lg font-bold text-gray-900">{room.name}</h4>
              <p className="text-gray-800">Size: {room.size} sqm</p>
              <p className="text-gray-800">Equipment: {room.equipment}</p>
              <img src={room.image_url} alt={room.name} className="w-full h-48 object-cover mt-2 rounded-md" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ApartmentCard;
