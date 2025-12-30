import Image from 'next/image';
import img from "@/components/home/image/Rectangle 1.png";
import img2 from "@/components/home/image/Vector.png";

export default function Hero() {
  return (
    <section className="relative h-150 rounded-3xl mx-4 md:mx-8 mt-8">

      {/* Background Image Wrapper */}
      <div className="relative w-full max-w-312 h-138 mx-auto">
        <Image
          src={img}
          alt="Hero Image"
          fill
          className="object-cover"
        />
        <div className="absolute bg-linear-to-r from-black/50 to-transparent" />

        {/* TEXT MUST BE INSIDE THIS WRAPPER */}
        <div className="absolute inset-0 flex items-center px-8 md:px-16 z-10">
          <div className="max-w-2xl text-white">
            <p className="font-mono text-base">Elevate Your Travel Journey</p>

            <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Experience<br />
              The Magic Of<br />
              Flight!
            </h1>

            <button className="bg-blue-600 hover:bg-blue-700 flex text-white px-8 py-3 rounded-full transition-colors mt-4">
              <Image src={img2} alt="icon" width={15} height={15} className="inline-block mr-2" />
              <p>Book Trip</p>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}
