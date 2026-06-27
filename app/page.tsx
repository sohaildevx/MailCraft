import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FadeIn from "../components/FadeIn";

export default function Home() {
  return (
    <>
      <main className="bg-[#0c0c0a] min-h-screen">
        <Navbar />
        <FadeIn>
          <Hero />
        </FadeIn>
      </main>
    </>
  );
}
