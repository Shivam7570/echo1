import React from 'react';
import { Phone, Mail, MapPin, Plus, Minus } from 'lucide-react';

export default function CorporateOfficeSection() {
    return (
        <div className="w-full bg-[#081B11] p-6 md:p-12 font-sans flex items-center justify-center">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* Left Side: Contact Details */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8 pr-0 lg:pr-4">

                    {/* Header */}
                    <div className="space-y-3">
                        <h2 className="text-amber-400 font-serif text-lg md:text-xl font-bold tracking-widest uppercase">
                            CORPORATE OFFICE
                        </h2>
                        {/* Divider with diamond symbol */}
                        <div className="flex items-center space-x-2">
                            <span className="h-[1px] w-6 bg-amber-500/50"></span>
                            <span className="text-[10px] text-amber-400">❖</span>
                            <span className="h-[1px] w-48 bg-amber-500/30"></span>
                        </div>
                    </div>

                    {/* Contact Details List */}
                    <div className="space-y-6">

                        {/* Phone */}
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 rounded-full bg-[#102D1E] border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                                <Phone className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5 pt-0.5">
                                <p className="text-xs font-semibold text-stone-300">Phone</p>
                                <p className="text-sm font-bold text-white tracking-wide">+91 98765 43210</p>
                                <p className="text-xs text-stone-400">Mon - Sat (10:00 AM - 7:00 PM)</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 rounded-full bg-[#102D1E] border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                                <Mail className="w-5 h-5" />
                            </div>
                            <div className="space-y-0.5 pt-0.5">
                                <p className="text-xs font-semibold text-stone-300">Email</p>
                                <p className="text-sm font-bold text-white tracking-wide">info@echothejungle.com</p>
                                <p className="text-xs text-stone-400">We'll respond as soon as possible</p>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 rounded-full bg-[#102D1E] border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div className="space-y-1 pt-0.5">
                                <p className="text-xs font-semibold text-stone-300">Address</p>
                                <p className="text-sm font-bold text-white leading-snug">
                                    Echo – The Jungle Resort & Villa
                                </p>
                                <p className="text-xs text-stone-400 leading-relaxed">
                                    Village Dhela, Ramnagar, Nainital,<br />
                                    Uttarakhand, India – 244715
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Script Tagline & Leaves Icon */}
                    <div className="flex items-end justify-between pt-4">
                        <p className="font-serif italic text-amber-400/90 text-lg md:text-xl font-normal">
                            Experience Nature. Experience Echo.
                        </p>
                        {/* Stylized Leaf Graphic */}
                        <div className="text-amber-400/80 pr-2">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M12 21a9 9 0 009-9c0-4.97-4.03-9-9-9a9 9 0 00-9 9c0 4.97 4.03 9 9 9z" strokeDasharray="2 2" />
                                <path d="M6 12c4-8 12-6 12-6s2 8-6 12-6-6-6-6z" fill="currentColor" fillOpacity="0.2" />
                                <path d="M12 18V6" />
                            </svg>
                        </div>
                    </div>

                </div>

                {/* Right Side: Map Container */}
                <div className="lg:col-span-7 relative bg-[#E5E3DF] rounded-3xl overflow-hidden shadow-2xl min-h-[350px] md:min-h-[420px] border border-stone-800 flex flex-col justify-between p-4">

                    {/* Custom Stylized Map Graphics */}
                    <div className="absolute inset-0 z-0 bg-[#E8ECE9]">
                        {/* River */}
                        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                            <path d="M-10 20 Q 150 120 280 200 T 500 500" fill="none" stroke="#7EB3EE" strokeWidth="35" opacity="0.8" />
                            {/* Roads */}
                            <path d="M 150 450 Q 300 350 450 180 T 500 -10" fill="none" stroke="#F5C35E" strokeWidth="8" />
                            <path d="M 0 320 Q 250 380 480 320" fill="none" stroke="#F5C35E" strokeWidth="6" />
                        </svg>

                        {/* Map Pin Marker */}
                        <div className="absolute top-[42%] right-[32%] -translate-x-1/2 -translate-y-1/2 flex items-center space-x-2 z-10 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-xl shadow-md border border-stone-200">
                            <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center text-white shadow-md flex-shrink-0">
                                <MapPin className="w-4 h-4 fill-white text-red-600" />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-stone-900 leading-none">Echo – The Jungle</p>
                                <p className="text-[10px] text-stone-600 leading-none mt-0.5">Resort & Villa</p>
                            </div>
                        </div>
                    </div>

                    {/* Google Watermark Bottom Left */}
                    <div className="relative z-10 self-start mt-auto">
                        <span className="text-sm font-bold text-stone-500 tracking-tighter opacity-80">
                            <span className="text-blue-500">G</span>
                            <span className="text-red-500">o</span>
                            <span className="text-yellow-500">o</span>
                            <span className="text-blue-500">g</span>
                            <span className="text-green-500">l</span>
                            <span className="text-red-500">e</span>
                        </span>
                    </div>

                    {/* Map Controls Right */}
                    <div className="relative z-10 self-end space-y-1 bg-white rounded-lg shadow-md border border-stone-300 overflow-hidden text-stone-700">
                        <button className="p-2 hover:bg-stone-100 flex items-center justify-center block border-b border-stone-200">
                            <Plus className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-stone-100 flex items-center justify-center block">
                            <Minus className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Footer Controls Overlay */}
                    <div className="absolute bottom-1 right-24 z-10 text-[9px] text-stone-600 flex space-x-2 bg-white/70 px-2 py-0.5 rounded">
                        <span>Keyboard shortcuts</span>
                        <span>Map data ©2026</span>
                        <span>Terms</span>
                        <span>Report a map error</span>
                    </div>

                </div>

            </div>
        </div>
    );
}