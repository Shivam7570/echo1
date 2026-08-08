import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Bed,
  Mountain,
  Trees,
  Sparkles,
  Heart,
  MessageSquare
} from "lucide-react";

const roomsData = [
  {
    id: 1,
    title: 'Deluxe',
    type: 'Luxury Room',
    price: '7,000',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=800',
    specs: [
      { icon: <Maximize2 className="w-3.5 h-3.5" />, text: '600 sq. ft.' },
      { icon: <Bed className="w-3.5 h-3.5" />, text: '1 King Bed' },
      { icon: <Mountain className="w-3.5 h-3.5" />, text: 'Mountain view' }
    ]
  },
  {
    id: 2,
    title: 'Premium',
    type: 'Luxury Room',
    price: '7,500',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800',
    specs: [
      { icon: <Maximize2 className="w-3.5 h-3.5" />, text: '750 sq. ft.' },
      { icon: <Bed className="w-3.5 h-3.5" />, text: '1 King Bed' },
      { icon: <Trees className="w-3.5 h-3.5" />, text: 'Mountain & Jim Corbett Forest View' }
    ]
  },
  {
    id: 3,
    title: 'Premium Luxury Room',
    type: 'With Jacuzzi',
    price: '8,000',
    image: 'https://plus.unsplash.com/premium_photo-1661923086373-73176f7c004a?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    specs: [
      { icon: <Trees className="w-3.5 h-3.5" />, text: 'Garden & Mountain View' },
      { icon: <Bed className="w-3.5 h-3.5" />, text: '1 King Size Bed & 1 Single Bed' },
      { icon: <Sparkles className="w-3.5 h-3.5" />, text: 'Jacuzzi' }
    ]
  },
  {
    id: 4,
    title: '2 Bedroom Villa',
    type: 'With Private Pool',
    price: '12,000',
    badge: 'MOST LOVED',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800',
    specs: [
      { icon: <Maximize2 className="w-3.5 h-3.5" />, text: '850 sq. ft.' },
      { icon: <Mountain className="w-3.5 h-3.5" />, text: 'Mountain/Hill View' }
    ]
  }
];

export default function SectionRoom() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCardsCount = 3;
  const navigate = useNavigate();

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % roomsData.length);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + roomsData.length) % roomsData.length);
  };

  const visibleRooms = Array.from({ length: visibleCardsCount }, (_, i) => {
    return roomsData[(startIndex + i) % roomsData.length];
  });

  return (
    <div className="bg-[#0B1512] text-white min-h-screen font-sans py-16 px-6 lg:px-20 relative overflow-hidden">

      {/* Top Header Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold tracking-widest text-[#C5A059] uppercase">OUR ROOMS</span>
            <div className="h-[1px] w-12 bg-[#C5A059]/40"></div>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal leading-tight text-stone-100 max-w-lg">
            Luxury Rooms & Private Pool Cottages
          </h2>
          <div className="pt-2">
            <Link
              to="/ResortListingsings"
              className="inline-flex items-center gap-2 border border-[#C5A059]/60 text-[#C5A059] hover:bg-[#C5A059] hover:text-[#0B1512] text-[11px] font-semibold tracking-widest px-5 py-2.5 rounded-sm transition duration-300 uppercase cursor-pointer"
            >
              VIEW ALL ROOMS ➔
            </Link>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-stone-700/80 hover:border-[#C5A059] hover:text-[#C5A059] flex items-center justify-center transition duration-300 cursor-pointer active:scale-95"
            aria-label="Previous room"
          >
            <ChevronLeft className="w-5 h-5 text-stone-300" />
          </button>
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-stone-700/80 hover:border-[#C5A059] hover:text-[#C5A059] flex items-center justify-center transition duration-300 cursor-pointer active:scale-95"
            aria-label="Next room"
          >
            <ChevronRight className="w-5 h-5 text-stone-300" />
          </button>
        </div>
      </div>

      {/* Cards Row */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-500">
        {visibleRooms.map((room, index) => (
          <div
            key={`${room.id}-${index}`}
            onClick={() => navigate('/resort-listings')}
            className="relative rounded-xl overflow-hidden h-[350px] group border border-stone-800/80 hover:border-[#C5A059]/50 transition duration-500 shadow-2xl flex flex-col justify-end cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={room.image}
              alt={room.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1512] via-[#0B1512]/40 to-transparent"></div>

            {/* Badge for featured items */}
            {room.badge && (
              <div className="absolute top-4 left-4 bg-white/95 text-red-600 text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 uppercase shadow-md">
                <Heart className="w-3 h-3 fill-red-600" />
                {room.badge}
              </div>
            )}

            {/* Content Details */}
            <div className="relative z-10 p-6 space-y-3">
              <div>
                <h3 className="font-serif text-2xl text-stone-100 font-semibold leading-snug">
                  {room.title}
                </h3>
                <p className="text-xs text-stone-300 font-light mt-0.5">{room.type}</p>
              </div>

              {/* Price */}
              <div className="text-stone-100 font-serif">
                <span className="text-xl font-bold text-[#D4A359]">₹{room.price}</span>
                <span className="text-xs font-sans text-stone-400"> / Night</span>
              </div>

              {/* Specifications */}
              <div className="border-t border-stone-700/50 pt-3 space-y-2">
                {room.specs.map((spec, specIdx) => (
                  <div key={specIdx} className="flex items-center gap-2 text-xs text-stone-300">
                    <span className="text-[#C5A059]">{spec.icon}</span>
                    <span className="truncate">{spec.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-white text-stone-900 text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl border border-stone-200">
          <span>👋 Welcome to Devaha Jungle Resort! How may we assist you today?</span>
        </div>
        <div className="relative">
          <button className="bg-amber-500 hover:bg-amber-600 text-stone-950 p-3.5 rounded-full shadow-2xl transition duration-300 flex items-center justify-center cursor-pointer">
            <MessageSquare className="w-5 h-5 fill-stone-950" />
          </button>
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            1
          </span>
        </div>
      </div>

    </div>
  );
}