import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitResortEnquiry } from '../../lib/api';
import welcome from "../../assets/welcomeImg.png";
import {
    Compass,
    Home,
    Maximize2,
    Waves,
    Trees,
    Building2,
    UtensilsCrossed,
    Sparkles,
    Baby,
    Users,
    Dumbbell,
    ShieldCheck,
    Car,
    TrendingUp,
    Check,
    User,
    Mail,
    Phone,
    MapPin,
    ChevronDown,
    Award,
    DollarSign,
    ShieldAlert,
    ArrowRight,
    Leaf,
    Trophy,

    X
} from 'lucide-react';


export default function RSection3() {
    const navigate = useNavigate();
    // State for image lightbox/modal
    const [selectedImage, setSelectedImage] = useState(null);

    const handleResortListingsings = () => {
        navigate('/ResortListingsings');
        window.scrollTo(0, 0);
    };

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        resortType: '',
        budgetRange: '',
        purpose: '',
        message: ''
    });

    const [status, setStatus] = useState({ loading: false, error: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: '' });
        try {
            await submitResortEnquiry({
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                resortName: formData.resortType,
                budgetRange: formData.budgetRange,
                purpose: formData.purpose,
                message: formData.message,
            });
            setStatus({ loading: false, error: '' });
            alert('Resort Enquiry Submitted!');
            setFormData({
                fullName: '', email: '', phone: '', city: '', resortType: '', budgetRange: '', purpose: '', message: ''
            });
        } catch (err) {
            setStatus({ loading: false, error: err.message || 'Failed to send request.' });
            alert('Error: ' + (err.message || 'Failed to send.'));
        }
    };

    const resortTypes = [
        {
            name: 'Deer Meadow Suites',
            image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
        },
        {
            name: 'Gazelle Retreat',
            image: 'https://images.pexels.com/photos/28586227/pexels-photo-28586227.jpeg',
        },
        {
            name: 'Leopard Crest Suites',
            image: 'https://images.pexels.com/photos/35069534/pexels-photo-35069534.jpeg',
        },
        {
            name: 'Tusker Havens',
            image: 'https://images.pexels.com/photos/34277699/pexels-photo-34277699.jpeg',
        },
        {
            name: 'Tiger Apex Pavilions',
            image: 'https://images.pexels.com/photos/8082328/pexels-photo-8082328.jpeg',
        },
    ];

    const features = [
        {
            icon: <Compass className="w-4 h-4 text-[#1C3026]" />,
            label: 'Resort Size Range',
            values: ['520 sq. ft.', '610 sq. ft.', '750 sq. ft.', '950 sq. ft.', '1350 sq. ft.'],
        },
        {
            icon: <Home className="w-4 h-4 text-[#1C3026]" />,
            label: 'No of Unit',
            values: ['3 Luxury Villas', '5 Luxury Cottages', '8 Luxury Villas', '10 Luxury Cabins', '12 Luxury Villas'],
        },


        {
            icon: <Trees className="w-4 h-4 text-[#1C3026]" />,
            label: 'Garden / Green Area',
            values: ['check', 'check', 'check', 'check', 'check'],
        },
        {
            icon: <Building2 className="w-4 h-4 text-[#1C3026]" />,
            label: 'Clubhouse',
            values: ['check', 'check', 'check', 'check', 'check'],
        },
        {
            icon: <UtensilsCrossed className="w-4 h-4 text-[#1C3026]" />,
            label: 'Restaurant',
            values: ['check', 'check', 'check', 'check', 'check'],
        },
        {
            icon: <Sparkles className="w-4 h-4 text-[#1C3026]" />,
            label: 'Spa & Wellness',
            values: ['check', 'check', 'check', 'check', 'check'],
        },
        {
            icon: <Baby className="w-4 h-4 text-[#1C3026]" />,
            label: 'Kids Play Area',
            values: ['check', 'check', 'check', 'check', 'check'],
        },
        {
            icon: <Car className="w-4 h-4 text-[#1C3026]" />,
            label: 'Parking',
            values: ['check', 'check', 'check', 'check', 'check'],
        },
        {
            icon: <Waves className="w-4 h-4 text-[#1C3026]" />,
            label: 'Plunge Pool/ Pool',
            values: ['❌', '❌', 'Pool', 'Jacuzzi', 'Pool'],
        },

       
        {
            icon: <ShieldCheck className="w-4 h-4 text-[#1C3026]" />,
            label: 'Security',
            values: ['24/7 Security', '24/7 Security', '24/7 Security', '24/7 Security', '24/7 Security'],
        },

        {
            icon: <TrendingUp className="w-4 h-4 text-[#1C3026]" />,
            label: 'ROI Potential',
            values: ['Very High', 'Very High', 'Very High', 'Very High', 'Very High'],
        },
    ];

    const highlights = [
        {
            icon: <User className="w-5 h-5 text-[#1C3026]" />,
            title: 'Expert Guidance',
            desc: 'Personalized assistance for your investment',
        },
        {
            icon: <Award className="w-5 h-5 text-[#1C3026]" />,
            title: 'Best Price Guarantee',
            desc: 'Assured best value for your investment',
        },
        {
            icon: <TrendingUp className="w-5 h-5 text-[#1C3026]" />,
            title: 'High Returns',
            desc: 'Attractive ROI with rental income',
        },
        {
            icon: <DollarSign className="w-5 h-5 text-[#1C3026]" />,
            title: 'Secure Investment',
            desc: '100% safe & secure property investment',
        },
    ];

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans p-4 md:p-8 space-y-6 relative">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Table Container */}
                <div className="bg-[#FAF7F2] rounded-2xl border border-stone-300 p-3 md:p-4 shadow-sm overflow-hidden">

                    {/* Section Header */}
                    <div className="text-center pb-4 pt-2">
                        <h1 className="text-2xl md:text-4xl font-serif text-[#1C3026] font-bold tracking-wider">
                            COMPARISON TABLE
                        </h1>
                        <div className="flex items-center justify-center space-x-2 text-amber-700/60 my-1">
                            <span className="h-[1px] w-8 bg-amber-700/30" />
                            <span className="text-[10px]">❖</span>
                            <span className="h-[1px] w-8 bg-amber-700/30" />
                        </div>
                        <p className="text-xs text-slate-600 font-medium">
                            Designing Points & All Features – All Resort Types
                        </p>
                    </div>

                    {/* Comparison Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[800px] text-xs">
                            <thead>
                                <tr>
                                    <th className="bg-[#1C3026] text-amber-200 font-serif p-3 w-1/6 text-center border-r border-stone-300 rounded-tl-xl uppercase text-[11px] tracking-wider leading-snug">
                                        Designing Points /<br />Features
                                    </th>
                                    {resortTypes.map((resort, idx) => (
                                        <th
                                            key={idx}
                                            className={`bg-[#1C3026] text-white p-2 text-center border-r border-stone-300 w-1/6 ${idx === resortTypes.length - 1 ? 'rounded-tr-xl border-r-0' : ''
                                                }`}
                                        >
                                            <div className="text-[10px] text-amber-300 tracking-wider font-semibold uppercase mb-1.5">
                                                {resort.name}
                                            </div>
                                            <div
                                                className="h-16 w-full rounded overflow-hidden border border-amber-500/20 cursor-pointer hover:opacity-90 transition-opacity"
                                                onClick={() => setSelectedImage(resort.image)}
                                                title="Click to view full image"
                                            >
                                                <img
                                                    src={resort.image}
                                                    alt={resort.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {features.map((feature, rowIdx) => {
                                    const isEven = rowIdx % 2 === 0;
                                    return (
                                        <tr
                                            key={rowIdx}
                                            className={isEven ? 'bg-[#F2ECE1]/60' : 'bg-[#FAF7F2]'}
                                        >
                                            {/* Left Feature Name Header */}
                                            <td className="p-2.5 font-medium text-slate-800 border-b border-r border-stone-300">
                                                <div className="flex items-center space-x-2">
                                                    {feature.icon}
                                                    <span className="text-[11px]">{feature.label}</span>
                                                </div>
                                            </td>

                                            {/* Feature Columns */}
                                            {feature.values.map((val, colIdx) => (
                                                <td
                                                    key={colIdx}
                                                    className={`p-2.5 text-center text-slate-700 font-medium border-b border-stone-300 ${colIdx < feature.values.length - 1 ? 'border-r' : ''
                                                        }`}
                                                >
                                                    {val === 'check' ? (
                                                        <Check className="w-4 h-4 text-emerald-800 mx-auto stroke-[3]" />
                                                    ) : (
                                                        <span className={val === '-' ? 'text-slate-400 font-normal' : 'text-[11px]'}>
                                                            {val}
                                                        </span>
                                                    )}
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Enquiry Section Box */}
            <div className="bg-[#FAF7F2] rounded-2xl border border-stone-300 p-4 md:p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            {/* Left Header & Image Banner */}
            <div className="lg:col-span-4 space-y-4 flex flex-col items-center text-center">
                <div>
                    <h2 className="text-2xl font-serif text-[#1C3026] font-bold tracking-wider uppercase">
                        RESORT ENQUIRY
                    </h2>
                    <p className="text-xs text-slate-600 font-medium mt-1">
                        We'll Get In Touch With You
                    </p>
                </div>

                <div
                    className="w-full max-w-sm h-100 rounded-xl overflow-hidden border border-stone-300 shadow-xs cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => setSelectedImage("https://www.echothejungle.com/wp-content/uploads/2026/08/ChatGPT-Image-Aug-3-2026-11_42_04-PM.png")}
                    title="Click to view full image"
                >
                    <img
                        src={welcome}
                        alt="Resort Deck View"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Center Form */}
            <div className="lg:col-span-5 space-y-3 flex flex-col items-center">
                <form onSubmit={handleSubmit} className="space-y-2.5 w-full max-w-md mx-auto">

                    {/* Inputs Grid */}
                    <div className="grid grid-cols-1 gap-2.5 text-center">
                        <div className="relative">
                            <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 text-center placeholder:text-center focus:outline-none focus:border-[#1C3026]"
                            />
                        </div>

                        <div className="relative">
                            <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 text-center placeholder:text-center focus:outline-none focus:border-[#1C3026]"
                            />
                        </div>

                        <div className="relative">
                            <Phone className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 text-center placeholder:text-center focus:outline-none focus:border-[#1C3026]"
                            />
                        </div>

                        <div className="relative">
                            <Home className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                            <select name="resortType" value={formData.resortType} onChange={handleChange} className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-600 text-center appearance-none focus:outline-none focus:border-[#1C3026]">
                                <option value="">Interested Resort Type</option>
                                <option value="Deer Meadow Suites">Deer Meadow Suites</option>
                                <option value="Gazelle Retreat">Gazelle Retreat</option>
                                <option value="Leopard Crest Suites">Leopard Crest Suites</option>
                                <option value="Tusker Havens">Tusker Havens</option>
                                <option value="Tiger Apex Pavilions">Tiger Apex Pavilions</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-slate-500 pointer-events-none" />
                        </div>

                        <div className="relative">
                            <Building2 className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                            <select name="purpose" value={formData.purpose} onChange={handleChange} className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-600 text-center appearance-none focus:outline-none focus:border-[#1C3026]">
                                <option value="">Purpose of Investment</option>
                                <option value="rental">Rental Returns</option>
                                <option value="personal">Personal Holiday Home</option>
                                <option value="both">Both</option>
                            </select>
                            <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-slate-500 pointer-events-none" />
                        </div>

                        <div>
                            <textarea
                                rows={2}
                                placeholder="Your Message / Requirements"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg p-2.5 text-xs text-slate-800 text-center placeholder:text-center focus:outline-none focus:border-[#1C3026] resize-none"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 text-center">
                        <button
                            type="submit"
                            className="bg-[#1C3026] hover:bg-[#14231b] text-white font-medium text-xs py-2.5 px-8 rounded-full inline-flex items-center space-x-2 transition-colors shadow-sm cursor-pointer"
                        >
                            <span>SUBMIT ENQUIRY</span>
                            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                        </button>
                    </div>
                </form>
            </div>

            {/* Right Feature Cards */}
            <div className="lg:col-span-3 bg-[#F3EEE5]/80 rounded-xl p-4 border border-stone-300/70 space-y-4 flex flex-col items-center text-center">
                {highlights.map((item, idx) => (
                    <div key={idx} className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-3 text-center sm:text-left">
                        <div className="p-2 bg-[#FAF7F2] rounded-lg border border-stone-300/80 shadow-2xs flex-shrink-0">
                            {item.icon}
                        </div>
                        <div>
                            <h4 className="text-xs font-bold text-[#1C3026] leading-snug">
                                {item.title}
                            </h4>
                            <p className="text-[10px] text-slate-600 leading-tight">
                                {item.desc}
                            </p>
                        </div>
                    </div>
                ))}
                <button
                    onClick={handleResortListingsings}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded text-sm flex items-center justify-center gap-2 cursor-pointer w-full"
                >
                    Our Resorts <span>→</span>
                </button>
            </div>

        </div>
    </div>

                {/* Footer Banner Bar */}
                <div className="bg-[#1C3026] rounded-xl p-3 px-8 flex flex-col md:flex-row items-center justify-around text-white text-xs gap-3">
                    <div className="flex items-center space-x-2">
                        <Leaf className="w-4 h-4 text-amber-400" />
                        <span className="font-medium text-amber-100">Premium Resorts</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        <span className="font-medium text-amber-100">High Returns</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span className="font-medium text-amber-100">Lasting Legacy</span>
                    </div>
                </div>

            </div>

            {/* Fullscreen Image Lightbox Modal */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-12 right-0 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full transition-colors flex items-center justify-center cursor-pointer"
                            title="Close preview"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <img
                            src={selectedImage}
                            alt="Fullscreen Preview"
                            className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl border border-white/10"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}