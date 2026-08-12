import React from 'react';
import { Link } from 'react-router-dom';
import {
    ChevronRight,
    Phone,
    Mail,
    MapPin,
    Clock,
    Download,
    ArrowUp
} from 'lucide-react';
import logo from "../assets/infraLogo.png";


export default function EchoFooter() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const quickLinks = [
        { name: 'Home', path: '/' },
        { name: 'Resort ', path: '/resort' },
        { name: 'Villa ', path: '/villa' },
        { name: 'Master Plan', path: '/masterplan' },
        { name: 'Destination Weddings', path: '/wedding' },
        { name: 'Resort Listings', path: '/ResortListingsings' },
        { name: 'Contact Us', path: '/contact' },
    ];



    return (
        <footer className="bg-[#051C12] text-stone-300 font-sans pt-12 pb-6 px-6 lg:px-16 border-t border-emerald-950">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Top Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 text-sm">

                    {/* Column 1: About Velzano */}
                    <div className="lg:col-span-3 space-y-6 lg:border-r border-emerald-900/40 lg:pr-6">
                        <h3 className="text-[#C5A253] text-xs font-bold tracking-widest uppercase">
                            ABOUT VELZANO
                        </h3>
                        <p className="text-stone-300 text-xs leading-relaxed">
                            Echo - The Jungle Resort & Villa is a luxury destination where nature meets elegance. Discover premium resorts, villas, and investment opportunities surrounded by lush greenery.
                        </p>
                        {/* Logo */}
                        <div className="pt-2">
                            <div className="flex items-center space-x-2">
                                <span className="text-[#C5A253] text-xl"><img className='h-22 w-23' src={logo} alt="" /></span>
                            </div>
                            <p className="text-[9px] text-[#C5A253] tracking-widest uppercase mt-0.5">

                            </p>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="lg:col-span-2 space-y-4 lg:border-r border-emerald-900/40 lg:pr-4">
                        <h3 className="text-[#C5A253] text-xs font-bold tracking-widest uppercase">
                            QUICK LINKS
                        </h3>
                        <ul className="space-y-2.5 text-xs">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={link.path}
                                        onClick={scrollToTop}
                                        className="flex items-center justify-between text-stone-300 hover:text-[#C5A253] transition-colors pr-4"
                                    >
                                        <span>{link.name}</span>
                                        <ChevronRight className="w-3 h-3 text-stone-400" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>



                    {/* Column 4: Contact Details */}
                    <div className="lg:col-span-3 space-y-4 lg:border-r border-emerald-900/40 lg:pr-4">
                        <h3 className="text-[#C5A253] text-xs font-bold tracking-widest uppercase">
                            CONTACT DETAILS
                        </h3>
                        <div className="space-y-4 text-xs text-stone-300">
                            <div className="flex items-start space-x-3">
                                <Phone className="w-4 h-4 text-[#C5A253] flex-shrink-0 mt-0.5" />
                                <span>+91 9217579077</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Mail className="w-4 h-4 text-[#C5A253] flex-shrink-0 mt-0.5" />
                                <span className="break-all">info@echothejungle.com</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-4 h-4 text-[#C5A253] flex-shrink-0 mt-0.5" />
                                <span className="leading-relaxed">
                                    Gurudwara Road, Village Narainwala, Dhampur District Bijnor.
                                </span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Clock className="w-4 h-4 text-[#C5A253] flex-shrink-0 mt-0.5" />
                                <span>24/7 Availability on land</span>
                            </div>
                        </div>
                    </div>

                    {/* Column 5: Social Media & Download Brochure */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Social Media Icons */}
                        <div className="space-y-3">
                            <h3 className="text-[#C5A253] text-xs font-bold tracking-widest uppercase">
                                SOCIAL MEDIA
                            </h3>
                            <div className="flex items-center space-x-2">
                                {/* Instagram */}
                                <a
                                    href="https://www.instagram.com/echothejungleresort?igsh=MTk1azljMGppdXNzOA=="
                                    className="w-8 h-8 rounded-full border border-[#C5A253]/60 flex items-center justify-center text-[#C5A253] hover:bg-[#C5A253] hover:text-[#051C12] transition-colors"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>

                                {/* Facebook */}


                            </div>
                        </div>

                        {/* Download Brochure Card */}
                        <div className="space-y-2">
                            <h3 className="text-[#C5A253] text-xs font-bold tracking-widest uppercase">
                                DOWNLOAD BROCHURE
                            </h3>
                            <div
                                className="relative rounded-lg overflow-hidden border border-[#C5A253]/30 bg-cover bg-center p-4 min-h-[140px] flex flex-col justify-between"
                                style={{
                                    backgroundImage: `linear-gradient(to bottom, rgba(5, 28, 18, 0.4), rgba(5, 28, 18, 0.85)), url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80')`
                                }}
                            >
                                <div>
                                    <div className="text-white font-serif text-sm font-semibold tracking-wider">ECHO</div>
                                    <p className="text-[8px] text-[#C5A253] uppercase tracking-widest">THE JUNGLE RESORT & VILLA</p>
                                    <p className="text-[11px] text-stone-200 mt-2 font-serif italic">
                                        A Destination<br />Beyond Ordinary
                                    </p>
                                </div>

                                <a
                                    href="#download"
                                    className="mt-3 bg-[#C5A253] hover:bg-[#b38f42] text-[#051C12] font-bold text-[10px] uppercase tracking-wider py-1.5 px-3 rounded flex items-center justify-between transition-colors"
                                >
                                    <span>DOWNLOAD NOW</span>
                                    <Download className="w-3.5 h-3.5" />
                                </a>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Divider Line */}
                <div className="h-[1px] w-full bg-emerald-900/60"></div>

                {/* Bottom Bar Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-[11px] text-stone-400">



                    {/* Legal Links Center */}
                    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-stone-300">
                        <a href="#privacy" className="hover:text-[#C5A253] transition-colors">Privacy Policy</a>
                        <span className="text-emerald-800">|</span>
                        <a href="#terms" className="hover:text-[#C5A253] transition-colors">Terms & Conditions</a>

                        <span className="text-emerald-800">|</span>
                        <a href="#sitemap" className="hover:text-[#C5A253] transition-colors">Sitemap</a>
                    </div>

                    {/* Copyright & Scroll Top Right */}
                    <div className="flex items-center space-x-4">
                        <div className="text-right text-[10px] text-stone-400">
                            <p>© 2026 Echo – The Jungle Resort & Villa.</p>
                            <p>All Rights Reserved.</p>
                        </div>
                        <button
                            onClick={scrollToTop}
                            className="w-8 h-8 rounded-lg bg-[#C5A253] text-[#051C12] flex items-center justify-center hover:bg-[#b38f42] transition-colors cursor-pointer"
                            aria-label="Scroll to top"
                        >
                            <ArrowUp className="w-4 h-4 stroke-[3]" />
                        </button>
                    </div>

                </div>

            </div>
        </footer>
    );
}