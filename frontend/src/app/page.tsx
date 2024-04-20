import Image from "next/image";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Convincing from "../components/Convincing";
import Pricing from "../components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Navbar/>
      <div className="flex flex-col items-center justify-center min-h-screen">
      <Hero/>
      <div className="flex flex-col items-center justify-center min-h-screen -mt-32">
      <Convincing/>
      <Pricing/>
      <Footer/>
      </div>
      </div>
    </main>
  );
}
