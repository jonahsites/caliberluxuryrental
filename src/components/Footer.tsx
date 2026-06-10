import { Instagram, Facebook, Twitter, Youtube, Phone, Mail, MapPin } from 'lucide-react';

interface FooterProps {
  onSectionClick: (sectionId: string) => void;
  onBookClick: () => void;
}

export default function Footer({ onSectionClick, onBookClick }: FooterProps) {
  const quickLinks = [
    { label: 'Fleet', id: 'fleet' },
    { label: 'Services', id: 'services' },
    { label: 'About Us', id: 'about' },
    { label: 'Reviews', id: 'reviews' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'contact' },
  ];

  const infoLinks = [
    { label: 'Terms & Conditions', id: 'terms' },
    { label: 'Privacy Policy', id: 'privacy' },
    { label: 'Insurance Details', id: 'insurance' },
    { label: 'Delivery Areas', id: 'delivery' },
  ];

  return (
    <footer className="bg-[#060606] border-t border-white/5 text-gray-400 font-sans text-xs pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Core grid content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/5">
          
          {/* Col 1: Brand details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex flex-col">
              <span className="font-serif text-xl tracking-[0.2em] text-white font-bold mb-0.5">
                CALIBER
              </span>
              <span className="text-[0.5rem] tracking-[0.4em] text-gray-500 font-sans uppercase">
                — LUXURY RENTAL —
              </span>
            </div>
            
            <p className="text-gray-400 text-xs leading-relaxed max-w-sm">
              Austin's leading exotic and luxury car rental service. Delivering unmatched precision engineering, white-glove arrival logistics, and memorable Texas Hill Country grand cruises.
            </p>

            {/* Social icons */}
            <div className="flex space-x-4">
              <a href="#" className="h-9 w-9 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/25 transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/25 transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/25 transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/25 transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-[0.65rem] tracking-[0.25em] text-white font-bold uppercase">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => onSectionClick(link.id)}
                    className="hover:text-[#c5a880] cursor-pointer transition-colors block text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Information (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-[0.65rem] tracking-[0.25em] text-white font-bold uppercase">
              INFORMATION
            </h4>
            <ul className="space-y-2.5">
              {infoLinks.map((link) => (
                <li key={link.label}>
                  <a href="#" className="hover:text-[#c5a880] transition-colors block">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-[0.65rem] tracking-[0.25em] text-white font-bold uppercase">
              CONTACT US
            </h4>
            
            <ul className="space-y-3 font-sans">
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-[#c5a880] shrink-0" />
                <a href="tel:5129981207" className="hover:text-white transition-colors">
                  (512) 998-1207
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-[#c5a880] shrink-0" />
                <a href="mailto:info@caliberluxuryrentals.com" className="hover:text-white transition-colors truncate">
                  info@caliberluxuryrentals.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-[#c5a880] shrink-0" />
                <span className="text-gray-400">Austin, TX</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="w-full bg-white/[0.03] border border-white/10 hover:border-[#c5a880] hover:text-white text-gray-300 py-3 rounded-sm text-xs tracking-wider font-semibold transition-all cursor-pointer"
              >
                BOOK NOW
              </button>
            </div>
          </div>

        </div>

        {/* Footer bottom details */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-600 text-[0.62rem] uppercase tracking-[0.15em]">
          <span>© 2026 Caliber Luxury Rental. All Rights Reserved.</span>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400">Terms</a>
            <a href="#" className="hover:text-gray-400">Privacy</a>
            <a href="#" className="hover:text-gray-400">Sitemap</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
