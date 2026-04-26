import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import About from "@/components/About";
import Certificates from "@/components/Certificates";
import Reviews from "@/components/Reviews";
import Pricing from "@/components/Pricing";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyMobileCTA from "@/components/StickyMobileCTA";

const Index = () => (
  <>
    <Navbar />
    <Hero />
    <Services />
    <WhyUs />
    <Process />
    <About />
    <Certificates />
    <Reviews />
    <Pricing />
    <Gallery />
    <Contact />
    <Footer />
    <StickyMobileCTA />
  </>
);

export default Index;
