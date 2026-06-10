import { Car, KeyRound, Star, Clock, ShieldCheck } from 'lucide-react';

export default function StatStrip() {
  const stats = [
    {
      icon: Car,
      value: '25+',
      title1: 'EXOTIC & LUXURY',
      title2: 'VEHICLES',
    },
    {
      icon: KeyRound,
      value: '1,000+',
      title1: 'SUCCESSFUL',
      title2: 'RENTALS',
    },
    {
      icon: Star,
      value: '5 STAR',
      title1: 'RATED BY OUR',
      title2: 'CLIENTS',
    },
    {
      icon: Clock,
      value: '24/7',
      title1: 'CONCIERGE',
      title2: 'SUPPORT',
    },
    {
      icon: ShieldCheck,
      value: 'OWNED FLEET',
      title1: 'NO BROKERS.',
      title2: 'NO MIDDLEMEN.',
    }
  ];

  return (
    <div className="bg-[#0c0c0c] border border-white/10 rounded-sm divide-y lg:divide-y-0 lg:divide-x divide-white/10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 py-6 shadow-2xl">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div key={idx} className="flex flex-col items-center justify-center p-6 text-center group transition-all duration-300 hover:bg-white/[0.01]">
            <div className="mb-4 text-[#c5a880] transition-transform duration-300 group-hover:scale-110">
              <Icon className="h-6 w-6 stroke-[1.5]" />
            </div>
            <p className="font-serif text-2xl lg:text-3xl tracking-wider text-white font-bold mb-1">
              {stat.value}
            </p>
            <span className="text-[0.65rem] tracking-[0.25em] text-gray-400 font-sans leading-relaxed">
              {stat.title1}
              <br />
              {stat.title2}
            </span>
          </div>
        );
      })}
    </div>
  );
}
