import Hero from "./components/Hero";
import Features from "./components/Features";
import DailyWorkout from "./components/DailyWorkout";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-brand-primary selection:text-white">
      <Hero />
      <Features />
      <DailyWorkout />
      <Footer />
    </main>
  );
}
