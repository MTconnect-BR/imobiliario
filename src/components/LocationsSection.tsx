"use client";

export default function LocationsSection() {
  const locations = [
    {
      city: "São Paulo",
      links: [
        "Apartamentos para comprar em São Paulo",
        "Casas para comprar em São Paulo",
        "Studios e kitnets para comprar em São Paulo",
        "Casas em condomínio para comprar em São Paulo",
        "Condomínios à venda em São Paulo",
      ],
    },
    {
      city: "Rio de Janeiro",
      links: [
        "Apartamentos para comprar em Rio de Janeiro",
        "Casas para comprar em Rio de Janeiro",
        "Studios e kitnets para comprar em Rio de Janeiro",
        "Casas em condomínio para comprar em Rio de Janeiro",
        "Condomínios à venda no Rio de Janeiro",
      ],
    },
    {
      city: "Porto Alegre",
      links: [
        "Apartamentos para comprar em Porto Alegre",
        "Casas para comprar em Porto Alegre",
        "Studios e kitnets para comprar em Porto Alegre",
        "Casas em condomínio para comprar em Porto Alegre",
        "Condomínios à venda em Porto Alegre",
      ],
    },
    {
      city: "Belo Horizonte",
      links: [
        "Apartamentos para comprar em Belo Horizonte",
        "Casas para comprar em Belo Horizonte",
        "Studios e kitnets para comprar em Belo Horizonte",
        "Casas em condomínio para comprar em Belo Horizonte",
        "Condomínios à venda em Belo Horizonte",
      ],
    },
  ];

  return (
    <section className="py-10 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Onde você quiser, tem uma Siena
        </h2>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {locations.map((location, index) => (
            <div key={index}>
              <h3 className="text-2xl font-bold text-primary mb-6">
                {location.city}
              </h3>
              <ul className="space-y-4">
                {location.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href="#"
                      className="text-gray-700 hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
