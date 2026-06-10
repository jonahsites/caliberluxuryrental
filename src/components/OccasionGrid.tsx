import { Briefcase, Award, Camera, MapPin } from 'lucide-react';

export default function OccasionGrid() {
  const occasions = [
    {
      icon: Briefcase,
      title: 'EXECUTIVE TRAVEL',
      description: 'Make a powerful impression with high-end vehicles delivered to your hotel, hangar, or office.',
    },
    {
      icon: Award,
      title: 'SPECIAL EVENTS',
      description: 'Arrive in ultimate style for weddings, galas, red carpets, and high-profile private events.',
    },
    {
      icon: Camera,
      title: 'CONTENT & MEDIA',
      description: 'Stand out in your commercial photoshoots, video productions, and brand collaborations.',
    },
    {
      icon: MapPin,
      title: 'AUSTIN EXPERIENCES',
      description: 'Elevate your weekend cruises, luxury vacations, or once-in-a-lifetime driving experiences.',
    }
  ];

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl tracking-[0.25em] text-white font-light uppercase">
          BUILT FOR EVERY OCCASION
        </h2>
        <div className="h-[1px] w-20 bg-[#c5a880] mx-auto"></div>
        <p className="text-gray-400 font-sans text-xs tracking-[0.15em] uppercase max-w-xl mx-auto">
          Tailored luxury handoffs designed around your professional and lifestyle demands
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {occasions.map((occ, idx) => {
          const Icon = occ.icon;
          return (
            <div 
              key={idx} 
              className="bg-[#0c0c0c] border border-white/5 rounded-sm p-8 text-center group transition-all duration-300 hover:bg-[#121212] hover:border-white/10"
            >
              <div className="inline-flex items-center justify-center h-16 w-16 bg-white/[0.02] border border-white/5 rounded-sm mb-6 text-[#c5a880] transition-all duration-300 group-hover:bg-[#c5a880] group-hover:text-black">
                <Icon className="h-6 w-6 stroke-[1.2]" />
              </div>
              <h3 className="font-serif text-md tracking-[0.15em] text-white font-bold mb-3">
                {occ.title}
              </h3>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                {occ.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
