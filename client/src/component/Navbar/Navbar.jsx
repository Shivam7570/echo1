import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

// Import your logos
import leftLogo from "../../assets/echologo1.png";
import rightLogo from "../../assets/echologo2.png";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

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
        <header className="fixed  top-0 left-0 w-full z-50 transition-all duration-300">
            <nav
                className={`w-full transition-all duration-300 ${isScrolled
                    ? "bg-[#0A1A12]/95 backdrop-blur-md shadow-2xl py-1 border-b border-[#C6A15B]/20"
                    : "bg-[#0A1A12] py- md:py- border-b border-white/10"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between min-h-[70px] md:min-h-[85px]">

                        {/* Left Main Brand Logo */}
                        <a href="/" className="flex items-center shrink-0 py-1">
                            <img
                                src={leftLogo}
                                alt="Echo Logo"
                                className="h-16 md:h-20 w-auto object-contain transition-all duration-300 hover:scale-105"
                            />
                        </a>

                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
                            {navLinks.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-[#E8E6E3] hover:text-[#C6A15B] uppercase text-xs md:text-sm font-semibold tracking-widest transition-colors duration-200"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>

                        {/* Right Side: Partner Logo & Circular Action Buttons */}
                        <div className="hidden lg:flex items-center space-x-5 shrink-0">
                            {/* Partner/Right Logo */}
                            <img
                                src={rightLogo}
                                alt="Partner Logo"
                                className="h-14 md:h-16 w-auto object-contain transition-all duration-300"
                            />

                            {/* Call Circle Button */}
                            <a
                                href="tel:+919999999999"
                                className="w-10 h-10 rounded-full border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0A1A12] transition duration-300"
                                title="Call Us"
                            >
                                <Phone size={18} />
                            </a>

                            {/* WhatsApp Circle Button */}
                            <a
                                href="https://wa.me/1234567890"
                                target="_blank"
                                rel="noreferrer"
                                className="w-10 h-10 rounded-full border border-[#C6A15B] flex items-center justify-center text-[#C6A15B] hover:bg-[#C6A15B] hover:text-[#0A1A12] transition duration-300"
                                title="WhatsApp"
                            >
                                <MessageCircle size={18} />
                            </a>
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
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="block text-[#E8E6E3] hover:text-[#C6A15B] uppercase text-sm font-semibold tracking-wider transition-colors"
                            >
                                {item.name}
                            </a>
                        ))}

                        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                            <img
                                src={rightLogo}
                                alt="Partner Logo"
                                className="h-12 w-auto object-contain"
                            />
                            <div className="flex space-x-3">
                                <a
                                    href="tel:+919999999999"
                                    className="w-9 h-9 rounded-full border border-[#C6A15B] flex items-center justify-center text-[#C6A15B]"
                                >
                                    <Phone size={16} />
                                </a>
                                <a
                                    href="https://wa.me/1234567890"
                                    className="w-9 h-9 rounded-full border border-[#C6A15B] flex items-center justify-center text-[#C6A15B]"
                                >
                                    <MessageCircle size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}