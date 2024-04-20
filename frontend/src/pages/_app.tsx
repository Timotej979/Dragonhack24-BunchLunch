import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center justify-center">
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}

export default MyApp;
