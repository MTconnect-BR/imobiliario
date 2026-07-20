import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BuySection from "@/components/BuySection";
import ConsortiumSection from "@/components/ConsortiumSection";
import FinancingSection from "@/components/FinancingSection";
import LocationsSection from "@/components/LocationsSection";
import PopularSearches from "@/components/PopularSearches";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <BuySection />
        <ConsortiumSection />
        <FinancingSection />
        <LocationsSection />
        <PopularSearches />
      </main>
      <Footer />
    </div>
  );
}
