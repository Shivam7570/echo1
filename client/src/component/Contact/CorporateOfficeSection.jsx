import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function CorporateOfficeSection() {
    // Google Maps embed URL for Narainwala, Kalagarh Road nearby Amangarh Tiger Reserve
    const googleMapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.123456789!2d78.5012345!3d29.3123456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDE4JzQ0LjQiTiA3OMKwMzAnMDUuMyJF!5e0!3m2!1sen!2sin!4v1234567890!5m2!1sen!2sin";

    // Direct Google Maps link for directions/external viewing
    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Narainwala,+Kalagarh+Road+nearby+Amangarh+Tiger+Reserve";

    return (
        <div className="w-full bg-[#081B11] p-6 md:p-12 font-sans flex items-center justify-center">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* Left Side: Contact Details */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8 pr-0 lg:pr-4">

                    {/* Header */}
                    <div className="space-y-3">
                        <h2 className="text-amber-400 font-serif text-lg md:text-xl font-bold tracking-widest uppercase">
                            The Jungle House
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
                                <p className="text-sm font-bold text-white tracking-wide">+91 9217579077</p>
                                <p className="text-xs text-stone-400">Mon - Sun (24/7) </p>
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
                                    Narainwala, Kalagarh Road nearby Amangarh Tiger Reserve.
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Bottom Script Tagline */}
                    <div className="flex items-end justify-between pt-4">
                        <p className="font-serif italic text-amber-400/90 text-lg md:text-xl font-normal">
                            Experience Nature. Experience Echo.
                        </p>
                    </div>

                </div>

                {/* Right Side: Real Google Maps Embed */}
                <div className="lg:col-span-7 relative rounded-3xl overflow-hidden shadow-2xl min-h-[350px] md:min-h-[420px] border border-stone-800 bg-[#E5E3DF]">
                    <iframe
                        title="Echo The Jungle Resort Location Map"
                        src={googleMapEmbedUrl}
                        className="absolute inset-0 w-full h-full border-0"
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    {/* Optional overlay link to open full map in a new tab */}
                    <div className="absolute bottom-4 left-4 z-10">
                        <a
                            href={googleMapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/90 hover:bg-white text-stone-900 font-semibold text-xs px-3 py-2 rounded-lg shadow-md transition-all backdrop-blur-sm border border-stone-300 flex items-center space-x-1"
                        >
                            <MapPin className="w-3.5 h-3.5 text-red-600" />
                            <span>View larger map</span>
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}