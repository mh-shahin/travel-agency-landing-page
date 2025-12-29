import AboutUs from "@/components/home/AboutUs";
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import Testimonials from "@/components/home/Testimonials";
import TopDestinations from "@/components/home/TopDestinations";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar></Navbar>
      <Hero></Hero>
      <Partners></Partners>
      <TopDestinations></TopDestinations>
      <AboutUs></AboutUs>
      <Testimonials></Testimonials>
      <Footer></Footer>
    </main>
  );
}