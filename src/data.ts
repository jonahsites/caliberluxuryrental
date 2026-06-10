import { Car, Review, FAQItem } from './types';

export const CARS_DATA: Car[] = [
  {
    id: 'lambo-huracan',
    name: 'HURACAN EVO',
    brand: 'LAMBORGHINI',
    image: '/src/assets/images/lambo_huracan_1781106389308.png',
    seats: 2,
    transmission: 'Automatic',
    price: 1199,
    category: 'sports',
    engine: '5.2L V10',
    acceleration: '2.9s (0-60)',
    hp: 640,
    topSpeed: '202 mph',
    description: 'The Lamborghini Huracán Evo is the evolution of the most successful V10-powered Lamborghini in history. It presents custom design enhancements, superior computational analytics, and raw mechanical ferocity.'
  },
  {
    id: 'rolls-royce-cullinan',
    name: 'CULLINAN',
    brand: 'ROLLS ROYCE',
    image: '/src/assets/images/rolls_cullinan_1781106400892.png',
    seats: 4,
    transmission: 'Automatic',
    price: 1399,
    category: 'luxury',
    engine: '6.75L V12 Twin-Turbo',
    acceleration: '4.8s (0-60)',
    hp: 563,
    topSpeed: '155 mph',
    description: 'The ultimate luxury SUV. Named after the largest diamond ever discovered, the Rolls-Royce Cullinan represents unparalleled comfort, legendary "magic carpet ride" suspension, and majestic prestige.'
  },
  {
    id: 'range-rover-sport',
    name: 'SPORT',
    brand: 'RANGE ROVER',
    image: '/src/assets/images/range_sport_1781106409645.png',
    seats: 5,
    transmission: 'Automatic',
    price: 699,
    category: 'suv',
    engine: '3.0L Inline-6 Supercharged',
    acceleration: '5.6s (0-60)',
    hp: 395,
    topSpeed: '140 mph',
    description: 'An exceptional luxury SUV combining dynamic luxury with legendary capability. Perfect for weekend getaways to the Austin Hill Country or style cruises through city streets.'
  },
  {
    id: 'ferrari-488',
    name: '488 GTB',
    brand: 'FERRARI',
    image: '/src/assets/images/ferrari_488_1781106419682.png',
    seats: 2,
    transmission: 'Automatic',
    price: 1499,
    category: 'sports',
    engine: '3.9L Twin-Turbo V8',
    acceleration: '3.0s (0-60)',
    hp: 661,
    topSpeed: '205 mph',
    description: 'The Ferrari 488 GTB offers track-level performance that can be enjoyed to the full even by non-professional drivers on everyday routes. Powered by a legendary mid-rear turbo V8.'
  }
];

export const REVIEWS_DATA: Review[] = [
  {
    id: '1',
    author: 'Michael T.',
    rating: 5,
    text: 'Incredible experience from start to finish. The car was spotless and delivery was seamless.',
    date: '2026-05-18',
    verified: true
  },
  {
    id: '2',
    author: 'Jessica R.',
    rating: 5,
    text: 'Best rental experience I\'ve ever had. Caliber is the only way to drive in Austin.',
    date: '2026-05-24',
    verified: true
  },
  {
    id: '3',
    author: 'David L.',
    rating: 5,
    text: 'Professional, on time, and the vehicles are unreal. Highly recommend.',
    date: '2026-06-02',
    verified: true
  },
  {
    id: '4',
    author: 'Sarah M.',
    rating: 5,
    text: 'Rented the Rolls-Royce Cullinan for our wedding. The service was impeccable, white-glove arrival right at the estate. Incredible memories.',
    date: '2026-06-05',
    verified: true
  },
  {
    id: '5',
    author: 'Marcus P.',
    rating: 5,
    text: 'The Huracan Evo was brand new and in pristine condition. Caliber delivered it straight to my private aviation hangar at Austin-Bergstrom. Highly custom service.',
    date: '2026-06-08',
    verified: true
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    question: 'What are the rental requirements?',
    answer: 'Drivers must be 25 years or older, have a valid driver\'s license, and carry comprehensive auto insurance that transfers coverage to an exotic rental vehicle. A security deposit is required for all reservations.'
  },
  {
    question: 'How does concierge delivery work?',
    answer: 'We deliver your selected vehicle directly to your requested location in Austin, whether it is a hotel, private airport hangar, office, or residence. We provide a full walkthrough of the vehicle\'s features.'
  },
  {
    question: 'Do you offer daily or hourly rentals?',
    answer: 'We require a 24-hour minimum rental period. Multi-day, weekly, and monthly packages are available at discounted rates. Please contact us directly for extended rentals.'
  },
  {
    question: 'Is insurance provided with the rental?',
    answer: 'You are required to provide comprehensive insurance covering the vehicle. We also offer supplemental insurance plans for additional coverage. Our team will verify your policy details prior to delivery.'
  }
];
