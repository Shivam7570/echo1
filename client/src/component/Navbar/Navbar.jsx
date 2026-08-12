import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Calendar } from "lucide-react";
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

    // Official WhatsApp SVG Icon Component
    const WhatsAppLogo = ({ size = 18 }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="currentColor"
        >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
    );

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

                            {/* Right Side: Official WhatsApp Logo Button, Schedule Visit Button & Partner Logo */}
                            <div className="hidden lg:flex items-center space-x-4 shrink-0">

                                {/* WhatsApp Official Logo Button */}
                                <a
                                    href="https://wa.me/919217579077"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-10 h-10 rounded-full border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0A1A12] transition duration-300"
                                    title="Chat on WhatsApp"
                                >
                                    <WhatsAppLogo size={18} />
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

                                {/* Mobile Official WhatsApp Logo Button */}
                                <a
                                    href="https://wa.me/919217579077"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="w-9 h-9 rounded-full border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0A1A12] transition duration-300"
                                    title="Chat on WhatsApp"
                                >
                                    <WhatsAppLogo size={16} />
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