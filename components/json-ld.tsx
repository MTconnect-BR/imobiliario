interface FAQItem {
  question: string;
  answer: string;
}

export function FAQJsonLd({ items }: { items: FAQItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface RealEstateListingProps {
  id: string;
  title: string;
  description: string;
  url: string;
  image?: string;
  price?: number;
  priceCurrency?: string;
  address?: string;
  city?: string;
  state?: string;
  area?: number;
  bedrooms?: number;
  bathrooms?: number;
  type?: string;
  status?: string;
}

export function RealEstateListingJsonLd({
  title,
  description,
  url,
  image,
  price,
  priceCurrency = "BRL",
  address,
  city,
  state,
  area,
  bedrooms,
  bathrooms,
}: RealEstateListingProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description,
    url,
    image: image || "https://www.xn--sienagestoimobiliria-yxb9a.com.br/og.svg",
    brand: {
      "@type": "Brand",
      name: "Siena Gestão & Imobiliária",
    },
    offers: {
      "@type": "Offer",
      priceCurrency,
      price: price || 0,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Siena Gestão & Imobiliária",
      },
    },
    ...(address && {
      address: {
        "@type": "PostalAddress",
        streetAddress: address,
        addressLocality: city,
        addressRegion: state,
        addressCountry: "BR",
      },
    }),
    ...(area && { floorSize: { "@type": "QuantitativeValue", value: area, unitCode: "m2" } }),
    ...(bedrooms && { numberOfRooms: bedrooms }),
    ...(bathrooms && {
      numberOfBathroomsTotal: bathrooms,
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface LocalBusinessProps {
  name: string;
  description: string;
  url: string;
  phone?: string;
  email?: string;
}

export function LocalBusinessJsonLd({ name, description, url, phone, email }: LocalBusinessProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name,
    description,
    url,
    telephone: phone,
    email,
    areaServed: {
      "@type": "Country",
      name: "Brasil",
    },
    knowsLanguage: ["pt-BR", "pt"],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
