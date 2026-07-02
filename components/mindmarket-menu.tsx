"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

interface SubMenuItem {
  label: string;
  href: string;
}

interface MenuItem {
  label: string;
  href?: string;
  children?: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    label: "Imóveis",
    children: [
      { label: "Casas", href: "/imoveis/casas" },
      { label: "Apartamentos", href: "/imoveis/apartamentos" },
      { label: "Terrenos", href: "/imoveis/terrenos" },
      { label: "Comerciais", href: "/imoveis/comerciais" },
    ],
  },
  {
    label: "Financiamento",
    children: [
      { label: "Simulação", href: "/financiamento/simulacao" },
      { label: "Crédito Imobiliário", href: "/financiamento/credito" },
      { label: "Consórcio", href: "/financiamento/consorcio" },
    ],
  },
  {
    label: "Sobre",
    children: [
      { label: "A Empresa", href: "/sobre/empresa" },
      { label: "Equipe", href: "/sobre/equipe" },
      { label: "Parceiros", href: "/sobre/parceiros" },
    ],
  },
  { label: "Blog", href: "/blog" },
  { label: "CRM", href: "/crm" },
  { label: "Contato", href: "/contato" },
];

export function MindMarketMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSubmenu, setExpandedSubmenu] = useState<string | null>(null);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
    setExpandedSubmenu(null);
  }, []);

  const toggleSubmenu = useCallback((label: string) => {
    setExpandedSubmenu((prev) => (prev === label ? null : label));
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setExpandedSubmenu(null);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.documentElement.classList.add("has-menu-mobile-open");
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.classList.remove("has-menu-mobile-open");
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.classList.remove("has-menu-mobile-open");
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Desktop Menu */}
      <nav className="c-menu-desktop">
        <div className="c-menu-desktop_bar">
          <div className="c-menu-desktop_inner">
            <ul className="c-menu-desktop_list">
              {menuItems.map((item) => (
                <li key={item.label} className="c-menu-desktop_item">
                  {item.children ? (
                    <>
                      <button
                        className="c-menu-desktop_link"
                        onClick={() => toggleSubmenu(item.label)}
                        aria-expanded={expandedSubmenu === item.label}
                      >
                        <span className="c-menu-desktop_link_label">
                          {item.label}
                        </span>
                        <svg
                          className={`c-menu-desktop_arrow ${expandedSubmenu === item.label ? "-active" : ""}`}
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div
                        className={`c-menu-desktop_dropdown ${expandedSubmenu === item.label ? "-active" : ""}`}
                      >
                        <ul className="c-menu-desktop_dropdown_list">
                          {item.children.map((subItem) => (
                            <li
                              key={subItem.label}
                              className="c-menu-desktop_dropdown_item"
                            >
                              <Link
                                href={subItem.href}
                                className="c-menu-desktop_dropdown_link"
                                onClick={closeMenu}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className="c-menu-desktop_link"
                      onClick={closeMenu}
                    >
                      <span className="c-menu-desktop_link_label">
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="c-menu-desktop_cta">
            <button
              className="c-menu-desktop_button"
              onClick={toggleMenu}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              <span className="c-menu-desktop_button_icon -default">
                <span className="c-menu-desktop_button_icon_line"></span>
                <span className="c-menu-desktop_button_icon_line"></span>
                <span className="c-menu-desktop_button_icon_line"></span>
              </span>
              <span className="c-menu-desktop_button_icon -close">
                <span className="c-menu-desktop_button_icon_line"></span>
                <span className="c-menu-desktop_button_icon_line"></span>
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Desktop Contact Box - Separado */}
      <Link href="/contato" className="c-menu-desktop_contact_box">
        Fale Conosco
      </Link>

      {/* Desktop Footer Links */}
      <div className="c-menu-desktop_footer_links">
        <Link href="/termos-de-servico" className="c-menu-desktop_footer_link">
          Termos de Serviço
        </Link>
        <Link href="/politica-de-privacidade" className="c-menu-desktop_footer_link">
          Política de Privacidade
        </Link>
      </div>

      {/* Mobile Menu */}
      <div className="c-menu-mobile">
        <div className="c-menu-mobile_bar">
          <div className="c-menu-mobile_logo">
            <Link href="/" className="c-menu-mobile_logo_text" onClick={closeMenu}>
              Imobiliário
            </Link>
          </div>
          <div className="c-menu-mobile_cta">
            <Link
              href="/contato"
              className="c-menu-mobile_contact"
              onClick={closeMenu}
            >
              Fale Conosco
            </Link>
            <button
              className="c-menu-mobile_burger"
              onClick={toggleMenu}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              <span className="c-menu-mobile_burger_icon -default">
                <span className="c-menu-mobile_burger_icon_line"></span>
                <span className="c-menu-mobile_burger_icon_line"></span>
                <span className="c-menu-mobile_burger_icon_line"></span>
              </span>
              <span className="c-menu-mobile_burger_icon -close">
                <span className="c-menu-mobile_burger_icon_line"></span>
                <span className="c-menu-mobile_burger_icon_line"></span>
              </span>
            </button>
          </div>
        </div>
        <div className="c-menu-mobile_nav">
          <div className="c-menu-mobile_nav_inner">
            <ul className="c-menu-mobile_list">
              {menuItems.map((item, index) => (
                <li
                  key={item.label}
                  className="c-menu-mobile_list_item"
                  style={{ "--index": index } as React.CSSProperties}
                >
                  {item.children ? (
                    <>
                      <button
                        className="c-menu-mobile_accordion_button"
                        onClick={() => toggleSubmenu(item.label)}
                        aria-expanded={expandedSubmenu === item.label}
                      >
                        <span className="c-menu-mobile_accordion_label">
                          {item.label}
                        </span>
                        <svg
                          className={`c-menu-mobile_arrow ${expandedSubmenu === item.label ? "-active" : ""}`}
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M3 4.5L6 7.5L9 4.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <div
                        className={`c-menu-mobile_dropdown ${expandedSubmenu === item.label ? "-active" : ""}`}
                      >
                        <ul className="c-menu-mobile_dropdown_list">
                          {item.children.map((subItem) => (
                            <li
                              key={subItem.label}
                              className="c-menu-mobile_dropdown_item"
                            >
                              <Link
                                href={subItem.href}
                                className="c-menu-mobile_dropdown_link"
                                onClick={closeMenu}
                              >
                                {subItem.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href || "#"}
                      className="c-menu-mobile_nav_link"
                      onClick={closeMenu}
                    >
                      <span className="c-menu-mobile_nav_link_label">
                        {item.label}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="c-menu-mobile_footer_links">
              <Link
                href="/termos-de-servico"
                className="c-menu-mobile_footer_link"
                onClick={closeMenu}
              >
                Termos de Serviço
              </Link>
              <Link
                href="/politica-de-privacidade"
                className="c-menu-mobile_footer_link"
                onClick={closeMenu}
              >
                Política de Privacidade
              </Link>
            </div>
          </div>
          <Link
            href="/contato"
            className="c-menu-mobile_nav_contact"
            onClick={closeMenu}
          >
            <span className="c-menu-mobile_nav_contact_label">
              Fale Conosco
            </span>
            <div className="c-menu-mobile_nav_contact_icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
