"use client";

import { useState, useEffect, useRef } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  label: string;
  count: number;
  items: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    id: "compra",
    label: "Compra",
    count: 4,
    items: [
      {
        question: "Como funciona o processo de compra?",
        answer:
          "O processo de compra envolve busca do imóvel, negociação, assinatura do contrato, pagamento do sinal, financiamento (se necessário) e registro em cartório.",
      },
      {
        question: "Quais documentos são necessários?",
        answer:
          "RG, CPF, comprovante de renda, extrato do FGTS (se aplicável), declaração de imposto de renda e comprovante de endereço.",
      },
      {
        question: "Posso visitar os imóveis antes de comprar?",
        answer:
          "Sim! Agendamos visitas presenciais ou oferecemos turmas virtuais em 360 graus para você conhecer cada detalhe.",
      },
      {
        question: "Qual o prazo médio para fechar um negócio?",
        answer:
          "Em média, o processo leva de 30 a 60 dias, dependendo do tipo de financiamento e documentação envolvida.",
      },
    ],
  },
  {
    id: "financiamento",
    label: "Financiamento",
    count: 3,
    items: [
      {
        question: "Como solicitar financiamento?",
        answer:
          "Após escolher o imóvel, apresentamos as melhores opções de financiamento bancário e consórcio, comparando taxas e prazos.",
      },
      {
        question: "Qual a taxa de juros atual?",
        answer:
          "As taxas variam de 9% a 12% ao ano, dependendo do banco, perfil do comprador e prazo de pagamento.",
      },
      {
        question: "Posso usar o FGTS para dar entrada?",
        answer:
          "Sim! O FGTS pode ser utilizado para dar entrada no imóvel, pagar parcelas ou amortizar o saldo devedor.",
      },
    ],
  },
  {
    id: "documentacao",
    label: "Documentação",
    count: 3,
    items: [
      {
        question: "Quais documentos para financiamento?",
        answer:
          "Documentos pessoais (RG, CPF), comprovantes de renda, extrato do FGTS, declaração de IR e documentos do imóvel.",
      },
      {
        question: "Como obter certidões negativas?",
        answer:
          "Emitimos gratuitamente as certidões de regularidade fiscal, trabalhista e civil necessárias para o negócio.",
      },
      {
        question: "O que é a matrícula do imóvel?",
        answer:
          "A matrícula é um documento que comprova a propriedade do imóvel, emitido pelo cartório de registro de imóveis.",
      },
    ],
  },
  {
    id: "locacao",
    label: "Locação",
    count: 3,
    items: [
      {
        question: "Como alugar um imóvel?",
        answer:
          "Escolha o imóvel, envie sua proposta, assine o contrato e realize o pagamento do sinal e primeira parcela.",
      },
      {
        question: "O que verificar no contrato de locação?",
        answer:
          "Verifique prazo, valor do aluguel, reajustes, multa rescisória, responsabilidades por reparos e garantias exigidas.",
      },
      {
        question: "Quais garantias são aceitas?",
        answer:
          "Caução, fiador ou seguro fiança locatício. A maioria dos proprietários aceita qualquer uma dessas opções.",
      },
    ],
  },
];

export function FAQPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalQuestions = faqCategories.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );

  const toggleCategory = (categoryId: string) => {
    setActiveCategory(activeCategory === categoryId ? null : categoryId);
    setExpandedItems([]);
  };

  const toggleItem = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const closePanel = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveCategory(null);
      setExpandedItems([]);
    }, 300);
  };

  useEffect(() => {
    const handlePanelToggle = (e: Event) => {
      const source = (e as CustomEvent).detail.source;
      if (source !== "faq") {
        closePanel();
      }
    };
    window.addEventListener("panel:toggle", handlePanelToggle);
    return () => {
      window.removeEventListener("panel:toggle", handlePanelToggle);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <div className={`c-faq-panel ${isOpen ? "is-open" : ""}`}>
      {/* Toggle Button */}
      <button
        type="button"
        className="c-faq-panel_toggle"
        onClick={() => {
          const next = !isOpen;
          if (next) {
            if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
            setIsOpen(true);
            window.dispatchEvent(new CustomEvent("panel:toggle", { detail: { source: "faq" } }));
          } else {
            closePanel();
          }
        }}
        aria-expanded={isOpen}
        aria-controls="faq-panel"
      >
        <span className="c-faq-panel_toggle_label">
          Perguntas Frequentes <sup>{totalQuestions}</sup>
        </span>
        <span className="c-faq-panel_toggle_icon">
          <svg
            width="12"
            height="8"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L5 5L9 1"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {/* Dialog Panel */}
      <div id="faq-panel" role="dialog" aria-modal="true" className="c-faq-panel_dialog">
        <div className="c-faq-panel_categories">
          {faqCategories.map((category, index) => (
            <button
              key={category.id}
              type="button"
              className={`c-faq-panel_category ${
                activeCategory === category.id ? "is-active" : ""
              }`}
              style={{ "--index": index } as React.CSSProperties}
              onClick={() => toggleCategory(category.id)}
            >
              <span className="c-faq-panel_category_label">{category.label}</span>
              <span className="c-faq-panel_category_count">{category.count}</span>
            </button>
          ))}
        </div>

        {activeCategory && (
          <div className="c-faq-panel_items">
            {faqCategories
              .find((cat) => cat.id === activeCategory)
              ?.items.map((item, index) => (
                <div
                  key={item.question}
                  className={`c-faq-panel_item ${
                    expandedItems.includes(item.question) ? "is-expanded" : ""
                  }`}
                  style={{ "--index": index } as React.CSSProperties}
                >
                  <button
                    type="button"
                    className="c-faq-panel_item_question"
                    onClick={() => toggleItem(item.question)}
                  >
                    <span>{item.question}</span>
                    <span className="c-faq-panel_item_arrow">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3 4.5L6 7.5L9 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  {expandedItems.includes(item.question) && (
                    <div className="c-faq-panel_item_answer">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
