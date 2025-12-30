'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { Star } from 'lucide-react';
import { Testimonial } from '@/types/index';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials?featured=true');
      const data = await response.json();
      if (data.success) setTestimonials(data.data);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="py-16 text-center">Loading testimonials...</div>;
  }

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-50 ">
      <div className="mb-8 relative w-full max-w-312 mx-auto">
        <h2 className="text-4xl md:text-4xl font-bold text-blue-600 mb-2">
          Customer Testimonial
        </h2>
        <p className="text-black mt-1">Loved by our Valued Clients</p>
      </div>

      <div className='justify-center items-center flex mx-auto max-w-6xl'>
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={12}   // 🔥 reduced card gap
          slidesPerView={1}
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
          }}
          className="pb-10"
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t._id}>
              <TestimonialCard testimonial={t} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="rounded-4xl overflow-hidden shadow-md bg-blue-600 flex flex-col h-full">

      {/* TOP AREA */}
      <div className="bg-blue-100 px-6 pt-6 pb-10 rounded-4xl">
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 ${i < testimonial.rating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
                }`}
            />
          ))}
        </div>

        <p className="text-gray-700 leading-relaxed">
          {testimonial.comment}
        </p>
      </div>

      {/* BLUE PROFILE SECTION */}
      <div className="bg-blue-600 flex items-center gap-4 p-5 rounded-3xl">
        <Image
          src={testimonial.image || '/default-avatar.png'}
          alt={testimonial.name}
          width={50}
          height={50}
          className="rounded-full object-cover border-2 border-white"
        />

        <div>
          <h4 className="font-semibold text-white">{testimonial.name}</h4>
          <p className="text-sm text-blue-200">{testimonial.role}</p>
        </div>
      </div>

    </div>
  );
}
