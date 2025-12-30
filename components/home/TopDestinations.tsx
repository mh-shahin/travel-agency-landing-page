'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Destination } from '@/types/index';

export default function TopDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      const response = await fetch('/api/destinations?featured=true');
      const data = await response.json();
      if (data.success) {
        setDestinations(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch destinations:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-16 text-center">Loading destinations...</div>;
  }

  return (
    <section className="py-16 px-4 md:px-8">
      <div className="mb-8 relative w-full max-w-312 mx-auto">
        <h2 className="text-4xl md:text-4xl font-bold text-blue-600 mb-2">
          Top Destination
        </h2>
        <p className="text-black">Explore our top destinations voted by customers</p>
      </div>

      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {destinations.map((dest) => (
            <SwiperSlide key={dest._id}>
              <DestinationCard destination={dest} />
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 hover:bg-gray-50">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <div className="bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow">
      <div className="destination-image-wrapper relative mx-auto rounded-4xl">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover p-2"
        />
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-bold text-lg">{destination.location} - {destination.name}</h3>
          </div>
          <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{destination.rating}</span>
          </div>
        </div>
        <p className="text-gray-700 text-sm">{destination.description}</p>
      </div>
    </div>
  );
}