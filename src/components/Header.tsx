"use client";

import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">Sexto</span>
              <span className="text-2xl font-bold text-foreground">Andar</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#alugar"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Alugar
            </a>
            <a
              href="#comprar"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Comprar
            </a>
            <a
              href="#consorcio"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Consórcio
            </a>
            <a
              href="#financiamento"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Financiamento
            </a>
            <a
              href="#anunciar"
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              Anunciar
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#ajuda"
              className="text-gray-600 hover:text-primary font-medium transition-colors"
            >
              Ajuda
            </a>
            <a
              href="#entrar"
              className="bg-primary text-white px-6 py-2 rounded-full font-medium hover:bg-primary-dark transition-colors"
            >
              Entrar
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <a
              href="#alugar"
              className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium"
            >
              Alugar
            </a>
            <a
              href="#comprar"
              className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium"
            >
              Comprar
            </a>
            <a
              href="#consorcio"
              className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium"
            >
              Consórcio
            </a>
            <a
              href="#financiamento"
              className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium"
            >
              Financiamento
            </a>
            <a
              href="#anunciar"
              className="block px-3 py-2 text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md font-medium"
            >
              Anunciar
            </a>
            <a
              href="#entrar"
              className="block px-3 py-2 bg-primary text-white text-center rounded-full font-medium hover:bg-primary-dark"
            >
              Entrar
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
