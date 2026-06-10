import { Check } from 'lucide-react';

interface DifferenceSectionProps {
  mansionImage: string;
}

export default function DifferenceSection({ mansionImage }: DifferenceSectionProps) {
  const points = [
    {
      title: 'CONCIERGE DELIVERY',
      desc: 'We deliver to your home, hotel, airport, office, or private hangar, ensuring a hands-free arrival experience.',
    },
    {
      title: 'PRIVATE HANDOFF',
      desc: 'Discreet, professional, and tailored entirely to your security protocols and calendar schedule.',
    },
    {
      title: 'FULLY INSURED',
      desc: 'Pre-verified coverage, fully compliant physical protections, and dynamic assistance for ultimate safety.',
    },
    {
      title: 'FLEXIBLE RENTALS',
      desc: 'Customized daily, weekly, or long-term multi-month packages optimized for your localized requirements.',
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
      {/* Text column */}
      <div className="lg:col-span-5 space-y-8">
        <div className="space-y-4">
          <h2 className="font-serif text-3xl md:text-4xl tracking-[0.25em] text-white font-light uppercase">
            THE CALIBER DIFFERENCE
          </h2>
          <div className="h-[1px] w-20 bg-[#c5a880]"></div>
        </div>

        <div className="space-y-8">
          {points.map((pt, idx) => (
            <div key={idx} className="flex gap-4 items-start group">
              <div className="bg-[#c5a880]/10 border border-[#c5a880]/20 rounded-full p-2 text-[#c5a880] mt-0.5 shrink-0 transition-all duration-300 group-hover:bg-[#c5a880] group-hover:text-black">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-sm tracking-[0.15em] text-white font-bold uppercase">
                  {pt.title}
                </h3>
                <p className="text-xs text-gray-400 font-sans leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image column */}
      <div className="lg:col-span-7">
        <div className="relative rounded-sm overflow-hidden border border-white/10 group aspect-4/3 shadow-2xl">
          <img
            src={mansionImage}
            alt="Luxury mansion driveway with supercars"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10"></div>
          
          {/* Subtle branding overlay */}
          <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 font-serif text-[0.6rem] tracking-[0.3em] text-white uppercase rounded-xs">
            CALIBER PRIVATE DRVWAY
          </div>
        </div>
      </div>
    </div>
  );
}
