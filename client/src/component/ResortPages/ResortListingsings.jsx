import React, { useState } from 'react';
import {
  Maximize,
  Bed,
  Users,
  ChevronRight,
  ArrowLeft,
  Tv,
  Wifi,
  Wind,
  Coffee,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calendar,
  Sparkles,
  GlassWater,
  Droplets,
  Bath,
  Eye,
  Layers,
  Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RoomDetailsPage() {
  const navigate = useNavigate();

  // Selected Meal Plan State
  const [selectedPlan, setSelectedPlan] = useState('room_only');

  const roomData = {
    category: "PREMIUM LUXURY",
    title: "Premium Luxury Room With Jacuzzi",
    description: "An exquisite sanctuary designed for absolute indulgence, featuring a private in-room jacuzzi, a separate living area, and serene garden-facing windows—redefined relaxation in equal measure.",
    sqft: "850 sq. ft",
    beds: "1 King Size Bed & 1 Single Bed",
    occupancy: "Double",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1600",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800",
    ]
  };

  // Other Rooms List (from screenshot)
  const similarRooms = [
    {
      id: 1,
      title: "Deluxe Luxury Room",
      sqft: "600 sq. ft.",
      bed: "1 King Bed",
      occupancy: "Double",
      price: "₹7,000",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Premium Luxury Room",
      sqft: "750 sq. ft.",
      bed: "1 King Bed",
      occupancy: "Double",
      price: "₹7,500",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "2 Bedroom With Private Pool",
      sqft: "1300 sq. ft",
      bed: "Super King Bed",
      occupancy: "2+2",
      price: "₹12,000",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
    }
  ];

  const [activeImage, setActiveImage] = useState(roomData.gallery[0]);

  // Amenities Data
  const amenities = [
    { icon: <Bath className="w-5 h-5 text-[#8c6b38]" />, label: "Jacuzzi Bath tubs" },
    { icon: <Wind className="w-5 h-5 text-[#8c6b38]" />, label: "Air Conditioning" },
    { icon: <Tv className="w-5 h-5 text-[#8c6b38]" />, label: "Smart TV" },
    { icon: <Wifi className="w-5 h-5 text-[#8c6b38]" />, label: "Wi-Fi" },
    { icon: <Droplets className="w-5 h-5 text-[#8c6b38]" />, label: "24 Hours Hot & Cold Water" },
    { icon: <Coffee className="w-5 h-5 text-[#8c6b38]" />, label: "Tea / Coffee Maker" },
    { icon: <GlassWater className="w-5 h-5 text-[#8c6b38]" />, label: "Mini Bar" },
    { icon: <Sparkles className="w-5 h-5 text-[#8c6b38]" />, label: "Slippers & Essential Bathroom Amenities" },
    { icon: <Wind className="w-5 h-5 text-[#8c6b38]" />, label: "Hair Dryer" },
    { icon: <GlassWater className="w-5 h-5 text-[#8c6b38]" />, label: "Mineral Water – ( 02 Bottles )" },
    { icon: <Layers className="w-5 h-5 text-[#8c6b38]" />, label: "Closet / Chair / Work Desk / Telephone" },
    { icon: <Eye className="w-5 h-5 text-[#8c6b38]" />, label: "Shaving Mirror" },
  ];

  // Meal Package Pricing Options
  const mealPlans = [
    { id: 'room_only', title: 'Room Only', price: '₹8,000' },
    { id: 'breakfast', title: 'Room With Breakfast', price: '₹9,000' },
    { id: 'half_board', title: 'Room With Breakfast + Lunch or Dinner', price: '₹10,000' },
    { id: 'full_board', title: 'Room With Breakfast + Lunch + Dinner', price: '₹11,000' },
  ];

  return (
    <div className="bg-[#FAF7F2] font-sans text-stone-800 min-h-screen">

      {/* ================= HERO SECTION ================= */}
      <div className="relative min-h-screen bg-[#0d1b12] text-white overflow-hidden flex flex-col justify-between">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out"
          style={{ backgroundImage: `url('${activeImage}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a150e] via-[#0a150e]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a150e] via-transparent to-[#0a150e]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-10 w-full flex-1 flex flex-col justify-between">

          {/* Breadcrumbs / Back Navigation */}
          <div>


          </div>

          {/* Title & Description Header */}
          <div className="max-w-2xl py-12 space-y-6">
            <span className="text-xs font-semibold tracking-[0.25em] text-amber-400 uppercase">
              {roomData.category}
            </span>

            <h1 className="text-4xl md:text-6xl font-serif text-amber-100 font-medium leading-tight">
              {roomData.title}
            </h1>

            <p className="text-sm md:text-base text-gray-300/80 font-light leading-relaxed">
              {roomData.description}
            </p>

            {/* Room Features Badges */}
            <div className="flex flex-wrap items-center gap-8 pt-4 text-xs md:text-sm text-amber-100/80 font-light">
              <div className="flex items-center gap-2.5">
                <Maximize className="w-4 h-4 text-amber-400" />
                <span>{roomData.sqft}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Bed className="w-4 h-4 text-amber-400" />
                <span>{roomData.beds}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-amber-400" />
                <span>{roomData.occupancy}</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery Row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-6 pb-4">
            {roomData.gallery.slice(0, 4).map((img, index) => (
              <div
                key={index}
                onClick={() => setActiveImage(img)}
                className={`relative h-28 rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-300 ${activeImage === img ? 'border-amber-400 scale-105 shadow-2xl' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
              >
                <img
                  src={img}
                  alt={`Room preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}

            <div className="relative h-28 rounded-xl overflow-hidden cursor-pointer border border-amber-400/20 bg-[#122418]/90 hover:bg-[#183020] flex flex-col items-center justify-center text-center p-2 transition">
              <div className="w-8 h-8 rounded-full border border-amber-400/40 flex items-center justify-center text-amber-300 mb-1 text-xs">
                +4
              </div>
              <span className="text-[11px] tracking-wider text-amber-200/80 uppercase font-medium">
                View All Photos
              </span>
            </div>
          </div>

        </div>
      </div>


      {/* ================= DETAILS & BOOKING SECTION ================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          {/* LEFT CONTENT COLUMN */}
          <div className="lg:col-span-7 space-y-12">

            {/* Room Overview */}
            <div>
              <h2 className="text-xs font-bold text-[#8c6b38] tracking-[0.2em] uppercase mb-4">
                ROOM OVERVIEW
              </h2>
              <p className="text-xs md:text-sm text-stone-600 leading-relaxed font-light">
                The Luxury Room With Jacuzzi offers an elevated premium experience blending expansive comfort with upscale features. Indulge in private relaxation with your personal jacuzzi, enjoy tranquil garden views, and unwind in a fully equipped living space designed for long-stay luxury or effortless weekend getaways.
              </p>
            </div>

            {/* Amenities & Facilities */}
            <div>
              <h2 className="text-xs font-bold text-[#8c6b38] tracking-[0.2em] uppercase mb-6">
                AMENITIES & FACILITIES
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-x-4 gap-y-6">
                {amenities.map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center p-3 border border-stone-200/80 rounded-xl bg-white/60 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-[#FAF3E6] flex items-center justify-center mb-2">
                      {item.icon}
                    </div>
                    <span className="text-[11px] text-stone-700 font-medium leading-tight">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Details Grid */}
            <div className="pt-2">
              <h2 className="text-xs font-bold text-[#8c6b38] tracking-[0.2em] uppercase mb-4">
                ROOM DETAILS
              </h2>
              <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-xs text-stone-700 border-t border-stone-200/80 pt-4">
                <div><span className="font-semibold text-stone-900">Room Size:</span> 850 sq. ft</div>
                <div><span className="font-semibold text-stone-900">View:</span> Garden & Mountain View</div>
                <div><span className="font-semibold text-stone-900">Occupancy:</span> Double</div>
                <div><span className="font-semibold text-stone-900">Floor:</span> Ground & 1st Floor</div>
                <div><span className="font-semibold text-stone-900">Bed Type:</span> 1 King Size Bed & 1 Single Bed</div>
                <div><span className="font-semibold text-stone-900">Interconnecting Room:</span> On Request</div>
              </div>
            </div>

            {/* Room Rules */}
            <div className="pt-2">
              <h2 className="text-xs font-bold text-[#8c6b38] tracking-[0.2em] uppercase mb-4">
                ROOM RULES
              </h2>
              <ul className="space-y-3 text-xs text-stone-600">
                <li className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-[#8c6b38] shrink-0" />
                  <span>Check-in Time: 01:00 PM | Check-out Time: 10:00 AM</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8c6b38] shrink-0" />
                  <span>Early check-in and late check-out subject to availability.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#8c6b38] shrink-0" />
                  <span>Smoking is not allowed inside the room.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#8c6b38] shrink-0" />
                  <span>Outside food & beverages are not permitted.</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#8c6b38] shrink-0" />
                  <span>Valid ID proof is mandatory for all guests at the time of check-in.</span>
                </li>
              </ul>
            </div>

            {/* Need Something Special Callout Card */}
            <div className="bg-[#FAF3E6] border border-[#e6d7bc] rounded-2xl p-6 text-center space-y-3 shadow-sm mt-8">
              <div className="flex items-center justify-center gap-2 text-[#8c6b38] font-bold text-xs tracking-widest uppercase">
                <Sparkles className="w-4 h-4" />
                <span>NEED SOMETHING SPECIAL?</span>
              </div>
              <p className="text-xs text-stone-600 max-w-md mx-auto leading-relaxed">
                Celebrate anniversaries, birthdays, or special moments with us. Let us know your preferences and we'll take care of the rest.
              </p>
              <button className="border border-[#8c6b38] text-[#8c6b38] hover:bg-[#8c6b38] hover:text-white px-6 py-2.5 rounded-lg text-xs font-semibold tracking-wider uppercase transition cursor-pointer">
                MAKE A SPECIAL REQUEST
              </button>
            </div>

          </div>


          {/* RIGHT SIDEBAR - BOOKING FORM */}
          <div className="lg:col-span-5 sticky top-8">
            <div className="bg-white rounded-2xl shadow-xl border border-stone-200/80 overflow-hidden">

              {/* Header Box */}
              <div className="bg-[#0f1f15] text-white p-6 space-y-4">
                <h3 className="text-center font-serif text-xs tracking-[0.2em] uppercase text-amber-300 font-semibold">
                  SELECT DATES & BOOK YOUR STAY
                </h3>

                {/* Date Inputs */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-stone-300 uppercase font-medium mb-1">Check-In</label>
                    <div className="flex items-center bg-[#172e20] border border-emerald-900/60 rounded-md px-3 py-2 text-xs text-white">
                      <Calendar className="w-3.5 h-3.5 text-amber-400 mr-2" />
                      <span>08/08/2026</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-stone-300 uppercase font-medium mb-1">Check-Out</label>
                    <div className="flex items-center bg-[#172e20] border border-emerald-900/60 rounded-md px-3 py-2 text-xs text-white">
                      <Calendar className="w-3.5 h-3.5 text-amber-400 mr-2" />
                      <span>09/08/2026</span>
                    </div>
                  </div>
                </div>

                {/* Guests Box */}
                <div>
                  <label className="block text-[10px] text-stone-300 uppercase font-medium mb-1">Guests & Rooms</label>
                  <div className="bg-[#172e20] border border-emerald-900/60 rounded-md px-3 py-2 text-xs text-white">
                    2 Adults, 2 Children, 1 Room
                  </div>
                </div>
              </div>

              {/* Meal Package Options Selector */}
              <div className="p-6 space-y-3 bg-[#FAF7F2]/30">
                {mealPlans.map((plan) => (
                  <label
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border cursor-pointer transition ${selectedPlan === plan.id
                      ? 'border-amber-600 bg-[#FAF3E6]'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedPlan === plan.id ? 'border-[#8c6b38] bg-[#8c6b38]' : 'border-stone-300'
                        }`}>
                        {selectedPlan === plan.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                      <span className="text-xs font-semibold text-stone-800">{plan.title}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-stone-900">{plan.price}</span>
                      <span className="block text-[9px] text-stone-400">+ Taxes</span>
                    </div>
                  </label>
                ))}

                <p className="text-[10px] text-stone-500 pt-1 text-center font-light leading-snug">
                  The displayed price is the base rate for double occupancy (2 adults). Additional guests will incur extra charges.
                </p>

                {/* Plan Benefits Box */}
                <div className="bg-[#FAF3E6]/60 rounded-xl p-3 border border-[#e6d7bc]/60 space-y-1.5">
                  <span className="text-[10px] font-bold text-[#8c6b38] uppercase tracking-wider block">
                    BENEFITS WITH THIS PLAN
                  </span>
                  <div className="flex items-center gap-2 text-[11px] text-stone-700">
                    <Check className="w-3.5 h-3.5 text-[#8c6b38]" />
                    <span>Complimentary Wi-Fi</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-stone-700">
                    <Check className="w-3.5 h-3.5 text-[#8c6b38]" />
                    <span>Complimentary access to resort experiences</span>
                  </div>
                </div>

                {/* Submit Action Button */}
                <button className="w-full bg-[#c29b4b] hover:bg-[#b08b3e] text-white py-3.5 rounded-xl text-xs font-bold tracking-widest uppercase transition cursor-pointer shadow-md mt-2">
                  BOOK NOW
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                  <span>Best Rate Guaranteed</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>


      {/* ================= SIMILAR ROOMS CAROUSEL / GRID ================= */}
      <div className="border-t border-stone-200/80 bg-[#FAF7F2] py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarRooms.map((room) => (
              <div
                key={room.id}
                className="bg-[#FAF7F2] rounded-2xl overflow-hidden border border-stone-200/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer"
              >
                {/* Room Image */}
                <div className="h-60 overflow-hidden relative">
                  <img
                    src={room.image}
                    alt={room.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Room Details Card */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-serif text-stone-900 font-semibold mb-2">
                      {room.title}
                    </h3>

                    <div className="flex items-center gap-4 text-xs text-stone-500 font-light">
                      <span>{room.sqft}</span>
                      <span>{room.bed}</span>
                      <span>{room.occupancy}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-xs text-stone-600">
                      <span className="font-bold text-stone-900">From </span>
                      <span className="text-sm font-bold text-stone-900">{room.price}</span>
                      <span className="text-stone-500 text-[11px]"> + Taxes</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}