export default function PopularSearches() {
  const searches = [
    { text: "Apartamento para alugar em Curitiba", href: "#" },
    { text: "Apartamento para alugar em Goiânia", href: "#" },
    { text: "Apartamento para alugar em Salvador", href: "#" },
    { text: "Apartamento para alugar em Santos", href: "#" },
    { text: "Apartamento para alugar em Niterói", href: "#" },
    { text: "Casas à venda em Jundiaí", href: "#" },
    { text: "Casas à venda em Barueri", href: "#" },
    { text: "Apartamento à venda Butantã", href: "#" },
    { text: "Apartamento à venda Brooklin", href: "#" },
    { text: "Apartamento à venda Tatuapé", href: "#" },
    { text: "Casas para alugar na Mooca", href: "#" },
    { text: "Casas para alugar em Jabaquara", href: "#" },
    { text: "Casas para alugar em Vila Matilde", href: "#" },
    { text: "Apartamento à venda Itaquera", href: "#" },
    { text: "Casas para alugar no Ipiranga", href: "#" },
    { text: "Casas para alugar na Freguesia do Ó", href: "#" },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-[12px] border-[#d4dbd2] rounded-lg bg-white p-8 lg:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10">
            Buscas mais populares
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5">
            {searches.map((search, index) => (
              <a
                key={index}
                href={search.href}
                className="text-gray-800 hover:text-primary transition-colors"
              >
                {search.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
