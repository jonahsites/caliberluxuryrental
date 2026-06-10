import { useState, useEffect } from 'react';
import { CalendarRange, ArrowRight, ShieldAlert, KeyRound, Phone, MapPin, Trash2, Check, Clock, X } from 'lucide-react';
import NavBar from './components/NavBar';
import StatStrip from './components/StatStrip';
import FleetCarousel from './components/FleetCarousel';
import OccasionGrid from './components/OccasionGrid';
import DifferenceSection from './components/DifferenceSection';
import ReviewsSection from './components/ReviewsSection';
import BookingModal from './components/BookingModal';
import Footer from './components/Footer';
import { Car } from './types';

// Image paths matching generated files
const HERO_IMAGE = "/src/assets/images/caliber_hero_1781106354072.png";
const BRIDGE_IMAGE = "/src/assets/images/caliber_bridge_1781106363563.png";
const MANSION_IMAGE = "/src/assets/images/caliber_mansion_1781106372448.png";

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  
  // High-end reservations sidebar / panel
  const [reservations, setReservations] = useState<any[]>([]);
  const [isReservationsOpen, setIsReservationsOpen] = useState(false);

  useEffect(() => {
    // Load existing reservations from storage
    const stored = localStorage.getItem('caliber_reservations');
    if (stored) {
      setReservations(JSON.parse(stored));
    }
  }, [isBookingOpen]); // refresh when modal closes (which might add reservations)

  const handleBookCar = (car: Car) => {
    setSelectedCar(car);
    setIsBookingOpen(true);
  };

  const handleReserveGeneral = () => {
    setSelectedCar(null);
    setIsBookingOpen(true);
  };

  const handleSectionScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80; // height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleDeleteReservation = (ref: string) => {
    const updated = reservations.filter(res => res.ref !== ref);
    localStorage.setItem('caliber_reservations', JSON.stringify(updated));
    setReservations(updated);
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white selection:bg-[#c5a880]/30 selection:text-white overflow-hidden relative">
      
      {/* Navigation Bar */}
      <NavBar 
        onReserveClick={handleReserveGeneral} 
        onSectionClick={handleSectionScroll} 
      />

      {/* FLOATING RESERVATIONS TRIGGERS (UX Touch) */}
      {reservations.length > 0 && (
        <button
          onClick={() => setIsReservationsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#c5a880] text-black font-semibold rounded-full p-4 shadow-2xl flex items-center gap-2 tracking-wide text-xs hover:bg-[#b09168] hover:scale-105 transition-all duration-300 border border-black/10 cursor-pointer"
        >
          <CalendarRange className="h-5 w-5 animate-pulse" />
          <span className="font-serif">MY RENTALS ({reservations.length})</span>
        </button>
      )}

      {/* HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-screen flex flex-col justify-center items-center pt-20"
      >
        {/* Background Image with elegant overlay gradient */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-[1.01]"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        >
          {/* Radial and Linear gradients to ensure total text contrast and luxury frame */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#060606] via-black/15 to-black/35"></div>
          <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#060606]/80"></div>
        </div>

        {/* Content Box */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-16 lg:py-24 space-y-12">
          
          {/* Main Title Block */}
          <div className="max-w-3xl space-y-6">
            <span className="font-sans text-[#c5a880] text-xs tracking-[0.4em] uppercase block font-medium animate-fade-in">
              ★★★★★ Austin's Premier Fleet
            </span>
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-7xl font-light uppercase tracking-widest leading-[1.12]">
              <span className="text-[#c5a880] block font-light">AUSTIN</span>
              <span className="text-[#c5a880] block font-light">EXOTIC</span>
              <span className="text-white block font-light">CAR RENTALS,</span>
              <span className="text-white block text-3xl sm:text-4xl lg:text-6xl font-extralight mt-2">DELIVERED LIKE A</span>
              <span className="text-white block text-3xl sm:text-4xl lg:text-6xl font-extralight">CONCIERGE SERVICE</span>
            </h1>
            <p className="text-gray-300 font-sans text-sm sm:text-base tracking-[0.10em] leading-relaxed max-w-xl">
              Exclusive vehicles. White-glove delivery. Unforgettable experiences. Cruise the Hill Country or arrive in luxury downtown.
            </p>
          </div>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <button
              onClick={handleReserveGeneral}
              className="bg-[#c5a880] hover:bg-[#b09168] text-black font-semibold text-xs tracking-[0.15em] px-8 py-4 rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-gold-500/10 cursor-pointer uppercase text-center"
            >
              RESERVE YOUR VEHICLE
            </button>
            <button
              onClick={() => handleSectionScroll('fleet')}
              className="border border-white/20 hover:border-white/50 bg-black/30 hover:bg-white/[0.03] text-white font-semibold text-xs tracking-[0.15em] px-8 py-4 rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer uppercase text-center"
            >
              VIEW OUR FLEET
            </button>
          </div>

        </div>

        {/* Floating Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
          <span className="text-[0.55rem] tracking-[0.3em] uppercase text-gray-500 font-sans">Scroll Details</span>
          <div className="h-6 w-[1px] bg-gray-500 animate-bounce"></div>
        </div>
      </section>

      {/* STAT STRIPE */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 mb-24">
        <StatStrip />
      </section>

      {/* OUR FEATURED FLEET */}
      <section id="fleet" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
        <FleetCarousel onSelectCar={setSelectedCar} onBookCar={handleBookCar} />
      </section>

      {/* AUSTIN'S PREMIER CHOICE (Left text, Right Image) */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-white/5 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="font-serif text-[#c5a880] text-xs tracking-[0.3em] uppercase block font-semibold">
                ELITE TRANSPORTATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.2em] text-white font-light uppercase leading-tight">
                AUSTIN'S PREMIER CHOICE <br />
                FOR EXOTIC CAR RENTALS
              </h2>
              <div className="h-[1px] w-16 bg-[#c5a880] mt-2"></div>
            </div>

            <p className="text-gray-300 font-sans text-sm leading-relaxed max-w-xl">
              From downtown to the Hill Country and everything in between, we deliver an unmatched rental experience with the world's most sought-after vehicles. Our streamlined paperwork, remote security scans, and direct premium delivery ensure you bypass traditional ticket counters entirely.
            </p>

            <p className="text-gray-400 font-sans text-xs leading-relaxed max-w-xl italic">
              "We don't just rent cars. We deliver the absolute pinnacle of luxury transport directly to your tarmac, driveway, or private estate across Central Texas."— Caliber Team
            </p>

            <div className="pt-4">
              <button
                onClick={() => handleSectionScroll('difference')}
                className="inline-flex items-center space-x-3 border-b border-[#c5a880] pb-2 text-xs tracking-[0.2em] text-[#c5a880] hover:text-white hover:border-white transition-all cursor-pointer uppercase font-medium"
              >
                <span>Learn More About Us</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            </div>
          </div>

          {/* Right Image Block */}
          <div className="lg:col-span-6">
            <div className="relative rounded-sm overflow-hidden border border-white/10 group aspect-video shadow-2xl">
              <img
                src={BRIDGE_IMAGE}
                alt="Austin 360 Bridge at sunset"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/0 to-black/10"></div>
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 font-serif text-[0.6rem] tracking-[0.25em] text-white uppercase rounded-xs">
                PENNYBACKER BRIDGE, AUSTIN
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* BUILT FOR EVERY OCCASION */}
      <section id="services" className="bg-[#090909] border-y border-white/5 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <OccasionGrid />
        </div>
      </section>

      {/* THE CALIBER DIFFERENCE */}
      <section id="difference" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 scroll-mt-20">
        <DifferenceSection mansionImage={MANSION_IMAGE} />
      </section>

      {/* WHAT OUR CLIENTS SAY */}
      <section id="reviews" className="bg-[#090909] border-y border-white/5 py-24 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReviewsSection />
        </div>
      </section>

      {/* READY TO EXPERIENCE CALIBER (CTA) */}
      <section className="relative py-28 flex items-center justify-center overflow-hidden">
        {/* Sleek aesthetic background layer */}
        <div className="absolute inset-0 bg-[#0c0c0c] flex items-center justify-center opacity-40">
          <div className="h-96 w-96 rounded-full bg-[#c5a880]/15 blur-[120px]"></div>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <span className="font-serif text-[#c5a880] text-xs tracking-[0.3em] uppercase block font-semibold">
              PRESTIGE MEETS CONCIERGE LOGISTICS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] text-white font-light uppercase">
              READY TO EXPERIENCE CALIBER?
            </h2>
            <p className="text-gray-400 font-sans text-xs tracking-[0.15em] uppercase">
              Reserve your dream vehicle today and let us handle the rest.
            </p>
          </div>

          <div className="h-[1px] w-24 bg-[#c5a880] mx-auto"></div>

          <div>
            <button
              onClick={handleReserveGeneral}
              className="bg-[#c5a880] hover:bg-[#b09168] text-black font-semibold text-xs tracking-[0.2em] px-12 py-5 rounded-sm transition-all duration-300 transform hover:-translate-y-0.5 shadow-xl shadow-gold-500/15 cursor-pointer uppercase font-sans"
            >
              RESERVE YOUR VEHICLE
            </button>
          </div>
        </div>
      </section>

      {/* CONTACT DIRECTORY GRID SECTION */}
      <section id="contact" className="bg-[#090909] border-t border-white/5 py-20 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-12">
          <div className="space-y-3">
            <span className="font-serif text-[#c5a880] text-xs tracking-[0.3em] uppercase">AUSTIN PRIVATE OFFICE</span>
            <h3 className="font-serif text-2xl text-white font-light tracking-widest uppercase">IMMEDIATE TRACEABLE LOGISTICS</h3>
            <div className="h-[1px] w-12 bg-[#c5a880] mx-auto"></div>
          </div>

          <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
            Our private line is monitored 24/7. When reserving, an executive butler is instantly dispatched to handle your paperwork, coordinate safe delivery limits, and guarantee pristine physical vehicle standards on receipt.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto pt-6 text-xs">
            <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-sm space-y-2">
              <Phone className="h-5 w-5 text-[#c5a880] mx-auto stroke-[1.5]" />
              <p className="text-white font-semibold">Voice / SMS Protocol</p>
              <a href="tel:5129981207" className="text-[#c5a880] hover:underline font-mono">
                (512) 998-1207
              </a>
            </div>
            
            <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-sm space-y-2">
              <Clock className="h-5 w-5 text-[#c5a880] mx-auto stroke-[1.5]" />
              <p className="text-white font-semibold">Active Hours</p>
              <p className="text-gray-400">24 Hours / 7 Days</p>
              <span className="text-[0.6rem] text-gold-500 font-mono">All Holidays Included</span>
            </div>

            <div className="bg-[#0c0c0c] border border-white/5 p-6 rounded-sm space-y-2">
              <MapPin className="h-5 w-5 text-[#c5a880] mx-auto stroke-[1.5]" />
              <p className="text-white font-semibold">Handoff Terminals</p>
              <p className="text-gray-400">Private Jet (ABIA), Estates,</p>
              <span className="text-[0.6rem] text-gold-500">Corporate Offices, Hotels</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer 
        onSectionClick={handleSectionScroll} 
        onBookClick={handleReserveGeneral} 
      />

      {/* VEHICLE DETAILS DRAWER / MODAL POPUP */}
      {selectedCar && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-[#0c0c0c] border border-white/10 rounded-sm w-full max-w-2xl shadow-2xl overflow-hidden animate-scale-up">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCar(null)}
              className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 z-10 cursor-pointer transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Spec Image header */}
            <div className="relative aspect-video bg-black">
              <img
                src={selectedCar.image}
                alt={selectedCar.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-[0.55rem] tracking-[0.3em] text-[#c5a880] font-sans font-semibold uppercase block mb-1">
                  {selectedCar.brand}
                </span>
                <h4 className="font-serif text-2xl text-white font-bold uppercase tracking-widest">
                  {selectedCar.name}
                </h4>
              </div>
            </div>

            {/* Content particulars */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                {selectedCar.description}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#121212] border border-white/5 p-4 rounded-sm text-xs">
                <div>
                  <span className="text-gray-500 uppercase text-[0.55rem] tracking-wider block">Engine:</span>
                  <span className="text-white font-semibold font-mono">{selectedCar.engine}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase text-[0.55rem] tracking-wider block">Horsepower:</span>
                  <span className="text-white font-semibold font-mono">{selectedCar.hp} hp</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase text-[0.55rem] tracking-wider block">0 - 60 mph:</span>
                  <span className="text-white font-semibold font-mono">{selectedCar.acceleration}</span>
                </div>
                <div>
                  <span className="text-gray-500 uppercase text-[0.55rem] tracking-wider block">Top Speed:</span>
                  <span className="text-[#c5a880] font-semibold font-mono">{selectedCar.topSpeed}</span>
                </div>
              </div>

              {/* Action grid */}
              <div className="flex justify-between items-center pt-4 border-t border-white/5">
                <div>
                  <span className="text-[0.6rem] text-gray-500 tracking-wider block">EXECUTIVE DAILY RATE</span>
                  <span className="font-serif text-xl text-[#c5a880] font-bold">
                    ${selectedCar.price.toLocaleString()} <span className="text-xs text-gray-400 font-normal font-sans">/ Day</span>
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedCar(null)}
                    className="px-5 py-3 border border-white/10 hover:border-white/30 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const carToBook = selectedCar;
                      setSelectedCar(null);
                      handleBookCar(carToBook);
                    }}
                    className="px-6 py-3 bg-[#c5a880] hover:bg-[#b09168] text-black font-semibold text-xs uppercase tracking-wider rounded-sm transition-colors cursor-pointer"
                  >
                    Rent This Vehicle
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* BOOKING FLOW MODAL */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        preselectedCar={selectedCar} 
      />

      {/* SIDEBAR drawer for active user reservations list (UX touch) */}
      {isReservationsOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-[#0c0c0c] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl h-full animate-fade-in">
            
            <div className="space-y-6 overflow-y-auto">
              <div className="flex justify-between items-center border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <CalendarRange className="h-5 w-5 text-[#c5a880]" />
                  <span className="font-serif text-sm tracking-widest text-white font-bold">MY RESERVATIONS</span>
                </div>
                <button 
                  onClick={() => setIsReservationsOpen(false)} 
                  className="text-gray-400 hover:text-white p-1 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {reservations.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-xs">
                  No rentals booked yet. Select a supercar above to start!
                </div>
              ) : (
                <div className="space-y-4">
                  {reservations.map((res) => (
                    <div 
                      key={res.ref} 
                      className="bg-[#121212] border border-white/5 p-4 rounded-sm space-y-4 relative group"
                    >
                      <button 
                        onClick={() => handleDeleteReservation(res.ref)}
                        className="absolute top-4 right-4 text-gray-500 hover:text-red-400 p-1 cursor-pointer transition-colors"
                        title="Cancel reservation request"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      <div className="flex items-center gap-3">
                        <img 
                          src={res.carImage} 
                          alt={res.carName} 
                          className="h-10 aspect-video object-cover rounded-xs border border-white/5"
                        />
                        <div>
                          <span className="bg-emerald-500/10 text-emerald-400 text-[0.55rem] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-semibold">
                            {res.status}
                          </span>
                          <h5 className="font-serif text-xs text-white uppercase font-bold tracking-wide mt-1">
                            {res.carName}
                          </h5>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[0.65rem] text-gray-400 font-sans border-t border-white/5 pt-3">
                        <div>
                          <span className="text-gray-500 block">Booking Reference:</span>
                          <span className="font-mono text-white select-all">{res.ref}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Rental Period:</span>
                          <span className="text-white">{res.days} Days</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Trip Dates:</span>
                          <span className="text-white">{res.startDate} to {res.endDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 block">Total Price:</span>
                          <span className="text-[#c5a880] font-semibold">${res.totalAmount.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="bg-black/40 border border-white/5 rounded-sm p-2 text-[0.6rem] text-gray-400 leading-relaxed">
                        <span className="text-white">White-Glove instructions:</span> Your butler is verifying auto policy coverage. Ensure your phone number ({res.phone}) is active to finalize verification constraints.
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar bottom action */}
            <div className="border-t border-white/5 pt-4 space-y-3">
              <button
                onClick={() => {
                  setIsReservationsOpen(false);
                  handleReserveGeneral();
                }}
                className="w-full bg-[#c5a880] hover:bg-[#b09168] text-black font-semibold text-xs tracking-wider py-3.5 rounded-sm transition-colors text-center cursor-pointer"
              >
                BOOK NEW EXOTIC
              </button>
              <button
                onClick={() => setIsReservationsOpen(false)}
                className="w-full bg-white/[0.03] text-gray-400 hover:text-white text-xs tracking-wider py-3.5 rounded-sm transition-colors text-center cursor-pointer"
              >
                CLOSE DRAWER
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
