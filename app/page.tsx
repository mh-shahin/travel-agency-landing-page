import AboutUs from "@/components/home/AboutUs";
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";
import TopDestinations from "@/components/home/TopDestinations";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <TopDestinations />
        <AboutUs />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}