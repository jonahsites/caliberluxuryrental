import { useState } from 'react';
import { Users, Gauge, ArrowRight, ArrowLeft } from 'lucide-react';
import { CARS_DATA } from '../data';
import { Car } from '../types';

interface FleetCarouselProps {
  onSelectCar: (car: Car) => void;
  onBookCar: (car: Car) => void;
}

export default function FleetCarousel({ onSelectCar, onBookCar }: FleetCarouselProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'sports' | 'suv' | 'luxury'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredCars = activeCategory === 'all' 
    ? CARS_DATA 
    : CARS_DATA.filter(car => car.category === activeCategory);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCars.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCars.length) % filteredCars.length);
  };

  return (
    <div className="space-y-10">
      
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl tracking-[0.2em] text-white font-light">
            OUR FEATURED FLEET
          </h2>
          <p className="text-gray-400 font-sans text-xs tracking-[0.15em] mt-2 uppercase">
            Curated precision engineering, ready for the open road
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {(['all', 'sports', 'suv', 'luxury'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
              className={`text-[0.65rem] tracking-[0.2em] font-sans font-medium px-4 py-2 rounded-sm border transition-all duration-300 uppercase cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#c5a880] text-black border-[#c5a880]'
                  : 'bg-transparent text-gray-400 border-white/10 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid / Slider container */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <div 
              key={car.id} 
              className="bg-[#0c0c0c] border border-white/10 rounded-sm overflow-hidden flex flex-col group transition-all duration-500 hover:border-[#c5a880]/30 hover:shadow-2xl hover:shadow-[#c5a880]/5"
            >
              {/* Image Container with tag */}
              <div className="relative aspect-video overflow-hidden bg-black/40">
                <img
                  src={car.image}
                  alt={car.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 text-[0.55rem] tracking-[0.2em] text-[#c5a880] font-semibold uppercase">
                  {car.category}
                </div>
              </div>

              {/* Title & Brand */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-[0.6rem] tracking-[0.3em] text-gray-500 font-sans font-medium uppercase mb-1">
                    {car.brand}
                  </div>
                  <h3 className="font-serif text-lg tracking-wider text-white font-bold group-hover:text-[#c5a880] transition-colors duration-300">
                    {car.name}
                  </h3>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 py-3 border-y border-white/5">
                  <div className="flex items-center space-x-2 text-gray-405">
                    <Users className="h-4 w-4 text-[#c5a880] shrink-0" />
                    <span className="text-xs text-gray-400">{car.seats} Seats</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-405">
                    <Gauge className="h-4 w-4 text-[#c5a880] shrink-0" />
                    <span className="text-xs text-gray-400 truncate">{car.transmission}</span>
                  </div>
                </div>

                {/* Pricing and Button */}
                <div className="pt-2 flex flex-col gap-4">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[0.6rem] tracking-widest text-gray-500 font-serif">DAILY RATE</span>
                    <span className="font-serif text-lg text-[#c5a880] font-bold">
                      ${car.price.toLocaleString()}<span className="text-xs text-gray-400 font-sans font-normal font-serif"> / Day</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <button
                      onClick={() => onSelectCar(car)}
                      className="border border-white/10 hover:border-[#c5a880]/30 hover:bg-white/[0.02] text-white text-[0.65rem] tracking-wider font-semibold py-2.5 transition-all duration-300 uppercase rounded-sm cursor-pointer"
                    >
                      VIEW DETAILS
                    </button>
                    <button
                      onClick={() => onBookCar(car)}
                      className="bg-transparent hover:bg-[#c5a880] text-[#c5a880] hover:text-black border border-[#c5a880] text-[0.65rem] tracking-wider font-semibold py-2.5 transition-all duration-300 uppercase rounded-sm cursor-pointer"
                    >
                      RENT NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Small warning if no cars match filter (though our static data matches everything) */}
        {filteredCars.length === 0 && (
          <div className="text-center py-20 text-gray-500 font-sans text-sm">
            No luxurious vehicles matching this category at the moment.
          </div>
        )}
      </div>

      {/* Link to all fleet / contact at bottom */}
      <div className="flex justify-center pt-4">
        <button 
          onClick={() => setActiveCategory('all')}
          className="group inline-flex items-center space-x-2 text-xs tracking-[0.2em] text-[#c5a880] hover:text-white transition-colors duration-300 uppercase cursor-pointer"
        >
          <span>VIEW ALL VEHICLES</span>
          <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

    </div>
  );
}
