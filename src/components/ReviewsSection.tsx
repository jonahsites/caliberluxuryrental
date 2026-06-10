import { useState } from 'react';
import { Star, ChevronRight, ChevronLeft } from 'lucide-react';
import { REVIEWS_DATA } from '../data';

export default function ReviewsSection() {
  const [startIndex, setStartIndex] = useState(0);

  const visibleReviews = REVIEWS_DATA.slice(startIndex, startIndex + 3);

  const handleNext = () => {
    if (startIndex + 3 < REVIEWS_DATA.length) {
      setStartIndex((prev) => prev + 1);
    } else {
      setStartIndex(0); // loop
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    } else {
      setStartIndex(Math.max(0, REVIEWS_DATA.length - 3));
    }
  };

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl tracking-[0.25em] text-white font-light uppercase">
          WHAT OUR CLIENTS SAY
        </h2>
        <div className="h-[1px] w-20 bg-[#c5a880] mx-auto"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch">
        
        {/* Google Card */}
        <div className="bg-[#0c0c0c] border border-white/10 rounded-sm p-8 flex flex-col items-center justify-center text-center space-y-4">
          <span className="font-sans text-2xl font-bold tracking-tight text-white flex items-center">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </span>
          <div className="space-y-1">
            <p className="font-serif text-3xl text-white font-bold">5.0</p>
            <div className="flex justify-center text-[#c5a880] gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-current stroke-none" />
              ))}
            </div>
          </div>
          <p className="text-[0.65rem] tracking-[0.15em] text-gray-500 font-sans uppercase">
            Based on 300+ reviews
          </p>
        </div>

        {/* Dynamic Slid Reviews */}
        {visibleReviews.map((rev) => (
          <div 
            key={rev.id} 
            className="bg-[#0b0b0b] border border-white/5 hover:border-white/15 rounded-sm p-8 flex flex-col justify-between space-y-6 transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <div className="space-y-4">
              <div className="flex text-[#c5a880] gap-0.5">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current stroke-none" />
                ))}
              </div>
              <p className="text-xs text-gray-300 italic font-sans leading-relaxed">
                "{rev.text}"
              </p>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-wider font-semibold text-white font-serif">
                {rev.author}
              </span>
              <span className="text-[0.65rem] text-gray-500 tracking-widest uppercase">
                Verified Renter
              </span>
            </div>
          </div>
        ))}

      </div>

      {/* Nav Arrow indicators */}
      <div className="flex justify-center gap-4 pt-4">
        <button
          onClick={handlePrev}
          className="p-3 border border-white/10 hover:border-[#c5a880] text-gray-400 hover:text-white rounded-full transition-all cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={handleNext}
          className="p-3 border border-white/10 hover:border-[#c5a880] text-gray-400 hover:text-white rounded-full transition-all cursor-pointer"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

    </div>
  );
}
