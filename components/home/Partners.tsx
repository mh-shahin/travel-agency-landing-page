 import Image from "next/image"; 
 import img1 from "@/components/home/image/expedia.png";
 import img2 from "@/components/home/image/trivago.png";
 import img3 from "@/components/home/image/booking.com.png";
 import img4 from "@/components/home/image/airbnv.png";
 
export default function Partners() {

  return (
    <section className="py-6 px-4 md:px-8">
      <div className="flex flex-wrap justify-center items-center gap-12">
        <Image src={img1} alt="Expedia" />
        <Image src={img2} alt="Erivago" />
        <Image src={img3} alt="Booking.com" />
        <Image src={img4} alt="Airbnb" />
      </div>
    </section>
  );
}