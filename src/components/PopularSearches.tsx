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
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-10 text-center">
          Buscas mais populares
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {searches.map((search, index) => (
            <a
              key={index}
              href={search.href}
              className="text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-3 rounded-lg transition-colors text-sm"
            >
              {search.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
