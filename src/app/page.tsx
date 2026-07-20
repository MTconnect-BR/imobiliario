import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CategorySection from "@/components/CategorySection";
import LocationsSection from "@/components/LocationsSection";
import PopularSearches from "@/components/PopularSearches";
import Footer from "@/components/Footer";

const categories = [
  {
    id: "6",
    title: "Casas à venda",
    description:
      "Encontre casas para comprar e tenha um cantinho só seu. Casas com amplo espaço, área de lazer e localização privilegiada.",
    linkText: "Ver casas à venda",
    linkHref: "/comprar/imovel/rio-de-janeiro?categoria=Casa",
    backgroundImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    accentColor: "#1b4332",
  },
  {
    id: "1",
    title: "Apartamentos à venda",
    description:
      "Apartamentos modernos com toda a infraestrutura que você precisa. Varanda, academia, salão de festas e muito mais.",
    linkText: "Ver apartamentos à venda",
    linkHref: "/comprar/imovel/rio-de-janeiro?categoria=Apartamento",
    backgroundImage:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop",
    accentColor: "#1a365d",
  },
  {
    id: "16",
    title: "Galpões à venda",
    description:
      "Galpões comerciais e industriais para seu negócio. Espaços amplos, localização estratégica e ótima acessibilidade.",
    linkText: "Ver galpões à venda",
    linkHref: "/comprar/imovel/rio-de-janeiro?categoria=Galp%C3%A3o",
    backgroundImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    accentColor: "#2d3748",
  },
  {
    id: "32",
    title: "Terrenos à venda",
    description:
      "Terrenos para construir o imóvel dos seus sonhos. Áreas com infraestrutura, água, luz e esgoto disponível.",
    linkText: "Ver terrenos à venda",
    linkHref: "/comprar/imovel/rio-de-janeiro?categoria=Terreno",
    backgroundImage:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&h=600&fit=crop",
    accentColor: "#3d4f5f",
  },
  {
    id: "144",
    title: "Andares Corporativos",
    description:
      "Andares corporativos para empresas que buscam localização premium. Salas modernas, infraestrutura completa e endereço nobre.",
    linkText: "Ver andares corporativos",
    linkHref: "/comprar/imovel/rio-de-janeiro?categoria=Andar%20Corporativo",
    backgroundImage:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    accentColor: "#134e4a",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        {categories.map((category, index) => (
          <CategorySection
            key={category.id}
            categoryId={category.id}
            title={category.title}
            description={category.description}
            linkText={category.linkText}
            linkHref={category.linkHref}
            backgroundImage={category.backgroundImage}
            accentColor={category.accentColor}
            reverse={index % 2 === 1}
          />
        ))}
        <LocationsSection />
        <PopularSearches />
      </main>
      <Footer />
    </div>
  );
}
