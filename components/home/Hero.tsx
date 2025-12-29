
import Image from 'next/image';
import img from "@/components/home/image/plane.jpg";
export default function Hero() {
  return (
    <section className="relative h-150 rounded-3xl overflow-hidden mx-4 md:mx-8 mt-8">
      <div className="absolute inset-0 ">
        <Image
          src={img}
          alt="Hero Image"
          fill
          className=" object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />
      </div>
      
      <div className="relative h-full flex items-center px-8 md:px-16">
        <div className="max-w-2xl text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Experience<br />
            The Magic Of<br />
            Flight!
          </h1>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors mt-4">
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
}