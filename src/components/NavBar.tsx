import { useState } from 'react';
import { Menu, X, Shield } from 'lucide-react';

interface NavBarProps {
  onReserveClick: () => void;
  onSectionClick: (sectionId: string) => void;
}

export default function NavBar({ onReserveClick, onSectionClick }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: 'FLEET', target: 'fleet' },
    { label: 'SERVICES', target: 'services' },
    { label: 'ABOUT', target: 'about' },
    { label: 'REVIEWS', target: 'reviews' },
    { label: 'FAQ', target: 'faq' },
    { label: 'CONTACT', target: 'contact' },
  ];

  const handleLinkClick = (target: string) => {
    onSectionClick(target);
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#060606]/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => handleLinkClick('hero')} 
            className="flex flex-col cursor-pointer group"
          >
            <span className="font-serif text-2xl tracking-[0.25em] text-white font-semibold transition-colors duration-300 group-hover:text-[#c5a880]">
              CALIBER
            </span>
            <span className="text-[0.55rem] tracking-[0.45em] text-gray-400 font-sans mt-0.5 transition-colors duration-300 group-hover:text-white">
              — LUXURY RENTAL —
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.target)}
                className="text-xs tracking-[0.2em] text-gray-350 hover:text-white font-sans transition-colors duration-300 cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <button
              onClick={onReserveClick}
              className="bg-[#c5a880] hover:bg-[#b09168] text-black font-semibold text-xs tracking-[0.15em] px-6 py-2.5 rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-gold-500/10 cursor-pointer"
            >
              RESERVE NOW
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0a0a0a] border-b border-white/10 animate-fade-in">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleLinkClick(link.target)}
                className="block w-full text-left px-4 py-3 text-sm tracking-[0.2em] text-gray-300 hover:bg-[#121212] hover:text-white font-sans rounded-md transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-4 px-4">
              <button
                onClick={() => {
                  onReserveClick();
                  setIsOpen(false);
                }}
                className="w-full bg-[#c5a880] hover:bg-[#b09168] text-black font-semibold text-xs text-center tracking-[0.15em] py-3 rounded-sm transition-all"
              >
                RESERVE NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
