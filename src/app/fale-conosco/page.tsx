"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function FaleConoscoPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-4">Fale Conosco</h1>
            <p className="text-xl text-primary-100">
              Estamos aqui para ajudar você
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Como recebo atendimento */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Como recebo atendimento?
            </h2>
            <p className="text-gray-600 mb-6">
              Se você precisar de ajuda, nossa Central de Ajuda é o caminho
              mais rápido para encontrar respostas. Lá você pode resolver
              pendências e tirar dúvidas com facilidade.
            </p>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">
                Pela nossa Central de Ajuda, é possível:
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Agendar visitas em imóveis</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Acompanhar o status de pagamentos e propostas</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Gerenciar documentos e informações do imóvel ou do contrato
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-primary mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>
                    Falar com nosso time de especialistas
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Como falo com um especialista */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Como falo com um especialista?
            </h2>
            <p className="text-gray-600 mb-6">
              Se a Central de Ajuda não resolver sua dúvida, você pode iniciar
              uma conversa direta com nosso time. Pelo WhatsApp, é rápido e
              prático.
            </p>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Atendimento via WhatsApp
                  </h3>
                  <p className="text-sm text-gray-500">
                    Clique no botão abaixo para iniciar uma conversa
                  </p>
                </div>
              </div>
              <a
                href="https://api.whatsapp.com/send?phone=5508005431000&text=Olá! Preciso de ajuda."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Falar no WhatsApp
              </a>
            </div>
          </section>

          {/* Horários e canais */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Horários e canais de atendimento
            </h2>
            <p className="text-gray-600 mb-6">
              Você também pode entrar em contato por telefone. Confira os
              números e horários de acordo com o seu perfil:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Alugando */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Para quem está comprando
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Telefone e WhatsApp:</span>{" "}
                    4020-1955
                  </p>
                  <p>
                    <span className="font-medium">Segunda a sexta:</span> das
                    08:00 às 19:00
                  </p>
                  <p>
                    <span className="font-medium">Sábado:</span> das 08:00 às
                    17:00
                  </p>
                </div>
              </div>

              {/* Comprando/Vendendo */}
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Para quem está comprando ou vendendo
                  </h3>
                </div>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Telefone:</span> 4007-2071
                  </p>
                  <p>
                    <span className="font-medium">Segunda a sexta:</span> das
                    08:00 às 19:00
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Dúvidas frequentes */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Dúvidas frequentes
            </h2>
            <div className="space-y-4">
              <details className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  Como agendar uma visita em um imóvel?
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Para agendar uma visita, encontre o imóvel desejado e clique
                  no botão &quot;Tenho interesse&quot;. Você será redirecionado
                  para o WhatsApp onde poderá agendar diretamente com o
                  proprietário ou corretor.
                </div>
              </details>

              <details className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  Como enviar uma proposta de compra?
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Após encontrar o imóvel ideal, clique em &quot;Tenho
                  interesse&quot; e envie sua proposta via WhatsApp. Nosso time
                  entrará em contato para orientá-lo sobre o processo.
                </div>
              </details>

              <details className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  Quais documentos são necessários para comprar?
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  Geralmente são necessários: documento de identidade (RG ou
                  CNH), comprovante de renda, comprovante de residência e
                  fiador ou seguro-fiança. Os requisitos podem variar
                  conforme o imóvel.
                </div>
              </details>

              <details className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <summary className="p-6 cursor-pointer font-semibold text-gray-900 hover:bg-gray-50 transition-colors">
                  Como funciona o processo de compra?
                </summary>
                <div className="px-6 pb-6 text-gray-600">
                  O processo de compra envolve: pesquisa do imóvel, visita,
                  negociação, análise de documentação, assinatura do contrato
                  e escritura. Nosso time acompanha cada etapa para
                  garantir sua segurança.
                </div>
              </details>
            </div>
          </section>

          {/* Outros canais */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Outros canais
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a
                href="mailto:contato@sienagestao.com.br"
                className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-md transition-shadow block"
              >
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">E-mail</h3>
                <p className="text-sm text-gray-500 mt-1">
                  contato@sienagestao.com.br
                </p>
              </a>

              <a
                href="tel:08005431000"
                className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-md transition-shadow block"
              >
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">Telefone</h3>
                <p className="text-sm text-gray-500 mt-1">0800 543 1000</p>
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=5508005431000&text=Olá! Preciso de ajuda."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white p-6 rounded-xl border border-gray-200 text-center hover:shadow-md transition-shadow block"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                <p className="text-sm text-gray-500 mt-1">0800 543 1000</p>
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
