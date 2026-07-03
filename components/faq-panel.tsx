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
          "O processo de compra envolve busca do imovel, negociacao, assinatura do contrato, pagamento do sinal, financiamento (se necessario) e registro em cartorio.",
      },
      {
        question: "Quais documentos sao necessarios?",
        answer:
          "RG, CPF, comprovante de renda, extrato do FGTS (se aplicavel), declaracao de imposto de renda e comprovante de endereco.",
      },
      {
        question: "Posso visitar os imoveis antes de comprar?",
        answer:
          "Sim! Agendamos visitas presenciais ou oferecemos turmas virtuais em 360 graus para voce conhecer cada detalhe.",
      },
      {
        question: "Qual o prazo medio para fechar um negocio?",
        answer:
          "Em media, o processo leva de 30 a 60 dias, dependendo do tipo de financiamento e documentacao envolvida.",
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
          "Apos escolher o imovel, apresentamos as melhores opcoes de financiamento bancario e consorcio, comparando taxas e prazos.",
      },
      {
        question: "Qual a taxa de juros atual?",
        answer:
          "As taxas variam de 9% a 12% ao ano, dependendo do banco, perfil do comprador e prazo de pagamento.",
      },
      {
        question: "Posso usar o FGRS para dar entrada?",
        answer:
          "Sim! O FGTS pode ser utilizado para dar entrada no imovel, pagar parcelas ou amortizar o saldo devedor.",
      },
    ],
  },
  {
    id: "documentacao",
    label: "Documentacao",
    count: 3,
    items: [
      {
        question: "Quais documentos para financiamento?",
        answer:
          "Documentos pessoais (RG, CPF), comprovantes de renda, extrato do FGTS, declaracao de IR e documentos do imovel.",
      },
      {
        question: "Como obter certidoes negativas?",
        answer:
          "Emitimos gratuitamente as certidoes de regularidade fiscal, trabalhista e civil necessarias para o negocio.",
      },
      {
        question: "O que e a matricula do imovel?",
        answer:
          "A matricula e um documento que comprova a propriedade do imovel, emitido pelo cartorio de registro de imoveis.",
      },
    ],
  },
  {
    id: "locacao",
    label: "Locacao",
    count: 3,
    items: [
      {
        question: "Como alugar um imovel?",
        answer:
          "Escolha o imovel, envie sua proposta, assine o contrato e realize o pagamento do sinal e primeira parcela.",
      },
      {
        question: "O que verificar no contrato de locacao?",
        answer:
          "Verifique prazo, valor do aluguel, reajustes, multa rescisoria, responsabilidades por reparos e garantias exigidas.",
      },
      {
        question: "Quais garantias sao aceitas?",
        answer:
          "Caucao, fiador ou seguro fianca locaticia. A maioria dos proprietarios aceita qualquer uma dessas opcoes.",
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
