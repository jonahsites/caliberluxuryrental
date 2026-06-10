import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Mail, Phone, MapPin, Check, ShieldCheck, Heart } from 'lucide-react';
import { Car } from '../types';
import { CARS_DATA } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCar: Car | null;
}

export default function BookingModal({ isOpen, onClose, preselectedCar }: BookingModalProps) {
  const [selectedCarId, setSelectedCarId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [includeChauffeur, setIncludeChauffeur] = useState(false);
  
  // Contact details
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Status
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (preselectedCar) {
      setSelectedCarId(preselectedCar.id);
    } else {
      setSelectedCarId(CARS_DATA[0].id);
    }
    // Set default dates (tomorrow and day after)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);
    
    setStartDate(tomorrow.toISOString().split('T')[0]);
    setEndDate(dayAfter.toISOString().split('T')[0]);
    setIsSubmitted(false);
  }, [preselectedCar, isOpen]);

  if (!isOpen) return null;

  const currentCar = CARS_DATA.find(car => car.id === selectedCarId) || CARS_DATA[0];

  // Calculate prices
  const getDays = () => {
    if (!startDate || !endDate) return 1;
    const startObj = new Date(startDate);
    const endObj = new Date(endDate);
    const diffTime = Math.abs(endObj.getTime() - startObj.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const days = getDays();
  const carTotal = currentCar.price * days;
  const chauffeurFee = includeChauffeur ? 250 * days : 0;
  const taxesFees = Math.round((carTotal + chauffeurFee) * 0.0825); // Austin sales tax 8.25%
  const securityDeposit = Math.round(currentCar.price * 1.5); // Refundable security deposit
  const totalAmount = carTotal + chauffeurFee + taxesFees;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !address) {
      alert('Please fill out all required fields.');
      return;
    }
    const ref = 'CLB-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(ref);

    // Save to local storage for persistent reservation list
    const reservation = {
      ref,
      carName: `${currentCar.brand} ${currentCar.name}`,
      carImage: currentCar.image,
      startDate,
      endDate,
      days,
      totalAmount,
      includeChauffeur,
      fullName,
      email,
      phone,
      address,
      status: 'Confirmed'
    };

    const existing = JSON.parse(localStorage.getItem('caliber_reservations') || '[]');
    localStorage.setItem('caliber_reservations', JSON.stringify([reservation, ...existing]));

    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      
      {/* Modal Card */}
      <div className="relative bg-[#0c0c0c] border border-white/10 rounded-sm w-full max-w-4xl shadow-2xl overflow-hidden my-8 animate-scale-up">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-white p-2 z-10 cursor-pointer transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left side: Form inputs (8 cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/5 space-y-8">
              <div>
                <span className="font-serif text-[0.65rem] tracking-[0.3em] text-[#c5a880] uppercase block mb-1">
                  SECURE RESERVATION
                </span>
                <h3 className="font-serif text-2xl text-white font-bold tracking-wide">
                  RESERVE YOUR VEHICLE
                </h3>
              </div>

              {/* Step 1: Select Fleet */}
              <div className="space-y-4">
                <label className="block text-[0.68rem] tracking-widest text-gray-400 font-sans uppercase">
                  Select Vehicle
                </label>
                <select
                  value={selectedCarId}
                  onChange={(e) => setSelectedCarId(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#c5a880]"
                >
                  {CARS_DATA.map((car) => (
                    <option key={car.id} value={car.id} className="bg-[#121212]">
                      {car.brand} {car.name} — ${car.price}/day
                    </option>
                  ))}
                </select>
              </div>

              {/* Step 2: Trip dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-[0.68rem] tracking-widest text-gray-400 font-sans uppercase">
                    Delivery Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                    <input
                      type="date"
                      value={startDate}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full bg-[#121212] border border-white/10 text-white rounded-sm pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[0.68rem] tracking-widest text-gray-400 font-sans uppercase">
                    Return Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                    <input
                      type="date"
                      value={endDate}
                      required
                      min={startDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full bg-[#121212] border border-white/10 text-white rounded-sm pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 3: Contact Info */}
              <div className="space-y-4">
                <span className="block text-[0.68rem] tracking-widest text-gray-400 font-sans uppercase pb-1 border-b border-white/5">
                  Your Information
                </span>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#121212] border border-white/10 text-white rounded-sm pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#121212] border border-white/10 text-white rounded-sm pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#121212] border border-white/10 text-white rounded-sm pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>

                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 h-4 w-4 text-gray-500" />
                    <input
                      type="text"
                      placeholder="Austin Delivery Address"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#121212] border border-white/10 text-white rounded-sm pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-[#c5a880]"
                    />
                  </div>
                </div>

                <textarea
                  placeholder="Special Requests (e.g. airport hangar arrival details, beverage preferences, child seats)"
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-[#121212] border border-white/10 text-white rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-[#c5a880]"
                ></textarea>
              </div>

              {/* Step 4: Chauffeur Service option */}
              <div 
                onClick={() => setIncludeChauffeur(!includeChauffeur)}
                className="border border-[#c5a880]/20 bg-[#c5a880]/5 rounded-sm p-4 flex items-center justify-between cursor-pointer hover:bg-[#c5a880]/10 transition-colors"
              >
                <div className="space-y-0.5">
                  <span className="font-serif text-xs tracking-wider text-[#c5a880] font-bold block">
                    ADD DEDICATED CHAUFFEUR SERVICE
                  </span>
                  <span className="text-[0.65rem] text-gray-400 font-sans block">
                    +$250 / Day — Professional certified pilot driver (optional)
                  </span>
                </div>
                <div className={`h-5 w-5 border border-[#c5a880] rounded-sm flex items-center justify-center transition-all ${
                  includeChauffeur ? 'bg-[#c5a880] text-black' : 'bg-transparent'
                }`}>
                  {includeChauffeur && <Check className="h-3 w-3 stroke-[3]" />}
                </div>
              </div>

            </div>

            {/* Right side: Billing Summary & Live totals (5 cols) */}
            <div className="lg:col-span-5 bg-[#0a0a0a] p-6 sm:p-10 flex flex-col justify-between space-y-8">
              
              <div className="space-y-6">
                <span className="font-serif text-[0.65rem] tracking-[0.3em] text-gray-500 uppercase block">
                  ORDER BILLING BREAKDOWN
                </span>

                {/* Selected Car Details */}
                <div className="flex gap-4 items-center">
                  <div className="h-16 aspect-video bg-black rounded-sm overflow-hidden border border-white/10">
                    <img 
                      src={currentCar.image} 
                      alt={currentCar.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[0.55rem] tracking-[0.2em] text-gray-500 font-sans uppercase">
                      Selected Fleet
                    </span>
                    <h4 className="font-serif text-sm tracking-wide text-white font-bold uppercase">
                      {currentCar.brand} <span className="text-[#c5a880]">{currentCar.name}</span>
                    </h4>
                  </div>
                </div>

                {/* Receipt Table */}
                <div className="border-t border-white/10 pt-4 space-y-3 font-sans text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Daily Rental Charge</span>
                    <span className="text-white font-semibold">${currentCar.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white font-semibold">{days} Day{days > 1 && 's'}</span>
                  </div>
                  
                  {includeChauffeur && (
                    <div className="flex justify-between text-xs">
                      <span className="text-[#c5a880]">Chauffeur Service</span>
                      <span className="text-[#c5a880] font-semibold">${chauffeurFee}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[0.68rem] font-medium text-gray-500 pt-2 border-t border-white/5">
                    <span>Base Vehicle Cost</span>
                    <span>${carTotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Taxes & Logistics (8.25%)</span>
                    <span className="text-white font-semibold">${taxesFees}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-400">Refundable Sec. Deposit</span>
                    <span className="text-white font-semibold">${securityDeposit}</span>
                  </div>
                </div>

                {/* Final Total */}
                <div className="border-t border-white/15 pt-4 flex justify-between items-baseline">
                  <span className="font-serif text-[0.7rem] tracking-widest text-[#c5a880] uppercase">TOTAL ORDER COST</span>
                  <div className="text-right">
                    <p className="font-serif text-2xl text-white font-bold">
                      ${totalAmount.toLocaleString()}
                    </p>
                    <p className="text-[0.55rem] text-gray-500 mt-0.5">
                      Excluding Refundable Deposit
                    </p>
                  </div>
                </div>
              </div>

              {/* Guidelines / Action button */}
              <div className="space-y-4">
                <div className="flex gap-3 items-start bg-white/[0.02] p-3 border border-white/5 rounded-sm">
                  <ShieldCheck className="h-5 w-5 text-[#c5a880] shrink-0 mt-0.5" />
                  <p className="text-[0.62rem] text-gray-400 leading-relaxed">
                    By completing this reservation you agree to our terms. Our logistics associate will contact you shortly to verify your comprehensive auto-insurance and complete standard identity checks.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#c5a880] hover:bg-[#b09168] text-black font-semibold text-xs py-4 tracking-[0.2em] rounded-sm transition-all shadow-md shadow-[#c5a880]/10 cursor-pointer text-center"
                >
                  COMPLETE RESERVATION
                </button>
              </div>

            </div>

          </form>
        ) : (
          /* Submission Screen */
          <div className="p-8 sm:p-20 flex flex-col items-center justify-center text-center space-y-6 max-w-2xl mx-auto py-24 animate-fade-in">
            <div className="h-16 w-16 bg-[#c5a880]/10 border border-[#c5a880] rounded-full flex items-center justify-center text-[#c5a880]">
              <Heart className="h-6 w-6 stroke-[1.5]" />
            </div>

            <div className="space-y-2">
              <span className="font-serif text-[0.65rem] tracking-[0.3em] text-[#c5a880] uppercase">
                WHITE-GLOVE RESERVATION SUBMITTED
              </span>
              <h3 className="font-serif text-2xl text-white font-bold tracking-wide">
                YOUR CALIBER TRIP IS CONFIRMED
              </h3>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-sm p-4 w-full grid grid-cols-2 gap-4 text-left font-sans text-xs">
              <div>
                <span className="text-gray-500 uppercase text-[0.55rem] tracking-wider">Booking Ref:</span>
                <p className="text-white font-semibold font-mono tracking-wider">{bookingRef}</p>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[0.55rem] tracking-wider">Vehicle:</span>
                <p className="text-white font-semibold truncate">{currentCar.brand} {currentCar.name}</p>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[0.55rem] tracking-wider">Delivery Date:</span>
                <p className="text-white font-semibold">{startDate}</p>
              </div>
              <div>
                <span className="text-gray-500 uppercase text-[0.55rem] tracking-wider">Concierge Location:</span>
                <p className="text-white font-semibold truncate">{address}</p>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              An elite logistics butler has been assigned to your booking. We will reach out to you at <span className="text-white">{phone}</span> or <span className="text-white">{email}</span> within 15 minutes to coordinate custom delivery constraints. Welcome to the Caliber lifestyle.
            </p>

            <button
              onClick={onClose}
              className="px-8 py-3 bg-[#c5a880] hover:bg-[#b09168] text-black font-semibold text-xs tracking-[0.15em] rounded-sm transition-all cursor-pointer"
            >
              CLOSE WINDOW
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
