import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, Calendar } from "lucide-react";
import ScheduleVisitModal from "../Common/ScheduleVisitModal";

// Import your logos
import leftLogo from "../../assets/echologo1.png";
import rightLogo from "../../assets/echologo2.webp";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 30);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Resorts", href: "/resort" },
        { name: "Villas", href: "/villa" },
        { name: "MASTER PLAN ", href: "/masterplan" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
                <nav
                    className={`w-full transition-all duration-300 ${isScrolled
                        ? "bg-[#0A1A12]/95 backdrop-blur-md shadow-2xl py-1 border-b border-[#C6A15B]/20"
                        : "bg-[#0A1A12]/80 backdrop-blur-xs py-1"
                        }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between min-h-[70px] md:min-h-[85px]">

                            {/* Left Main Brand Logo */}
                            <Link to="/" className="flex items-center shrink-0 py-1">
                                <img
                                    src={leftLogo}
                                    alt="Echo Logo"
                                    className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-105"
                                />
                            </Link>

                            {/* Desktop Navigation Links */}
                            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                                {navLinks.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className="text-[#E8E6E3] hover:text-[#C6A15B] uppercase text-xs md:text-sm font-semibold tracking-widest transition-colors duration-200"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Right Side: Partner Logo, WhatsApp Chat Button & Schedule Visit Button */}
                            <div className="hidden lg:flex items-center space-x-4 shrink-0">


                                {/* WhatsApp Chat Button */}
                                <a
                                    href="https://wa.me/919217579077"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0A1A12] transition duration-300"
                                    title="Chat on WhatsApp"
                                >
                                    <MessageCircle size={18} />
                                </a>

                                {/* Schedule Site Visit Button */}
                                <button
                                    onClick={() => setIsVisitModalOpen(true)}
                                    className="bg-[#C6A15B] hover:bg-[#b38e49] text-[#0A1A12] font-bold text-xs uppercase tracking-wider px-4 py-2 rounded-full shadow-md transition duration-300 flex items-center space-x-1.5 cursor-pointer"
                                >
                                    <Calendar size={14} />
                                    <span>Site Visit</span>
                                </button>
                              {/* Partner/Right Logo */}
                                <img
                                    src={rightLogo}
                                    alt="Partner Logo"
                                    className="h-14 md:h-16 w-auto object-contain transition-all duration-300"
                                />
                            </div>

                            {/* Mobile Menu Toggle */}
                            <button
                                className="lg:hidden text-[#C6A15B] p-2 rounded-lg focus:outline-none"
                                onClick={() => setOpen(!open)}
                                aria-label="Toggle Navigation"
                            >
                                {open ? <X size={30} /> : <Menu size={30} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Dropdown Drawer */}
                    {open && (
                        <div className="lg:hidden bg-[#0A1A12] border-t border-[#C6A15B]/30 px-6 py-6 space-y-4 shadow-2xl">
                            {navLinks.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    onClick={() => setOpen(false)}
                                    className="block text-[#E8E6E3] hover:text-[#C6A15B] uppercase text-sm font-semibold tracking-wider transition-colors"
                                >
                                    {item.name}
                                </Link>
                            ))}

                            <button
                                onClick={() => {
                                    setOpen(false);
                                    setIsVisitModalOpen(true);
                                }}
                                className="w-full bg-[#C6A15B] text-[#0A1A12] font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center space-x-2 shadow"
                            >
                                <Calendar size={16} />
                                <span>Schedule Site Visit</span>
                            </button>

                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                <img
                                    src={rightLogo}
                                    alt="Partner Logo"
                                    className="h-12 w-auto object-contain"
                                />
                                <a
                                    href="https://wa.me/919217579077"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0A1A12] transition duration-300"
                                    title="Chat on WhatsApp"
                                >
                                    <MessageCircle size={16} />
                                </a>
                            </div>
                        </div>
                    )}
                </nav>
            </header>

            {/* Schedule Site Visit Popup Modal */}
            <ScheduleVisitModal
                isOpen={isVisitModalOpen}
                onClose={() => setIsVisitModalOpen(false)}
            />
        </>
    );
}