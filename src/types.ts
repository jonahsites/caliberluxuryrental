export interface Car {
  id: string;
  name: string;
  brand: string;
  image: string;
  seats: number;
  transmission: string;
  price: number;
  engine: string;
  acceleration: string;
  hp: number;
  topSpeed: string;
  description: string;
  category: 'sports' | 'suv' | 'luxury';
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BookingDetails {
  carId: string;
  startDate: string;
  endDate: string;
  name: string;
  email: string;
  phone: string;
  deliveryAddress: string;
  specialRequests?: string;
  withChauffeur: boolean;
  totalCost: number;
}
