import React, { useState } from 'react';
import { submitVillaEnquiry } from '../../lib/api';
import {
    Compass,
    Home,
    Maximize2,
    Waves,
    Trees,
    Building2,
    Sparkles,
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
    ArrowRight,
    Leaf,
    Trophy,
    Bed,
    Bath,
    Sun,
    Layers
} from 'lucide-react';

export default function VillaComparisonSection() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        city: '',
        villaType: '',
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
            await submitVillaEnquiry({
                name: formData.fullName,
                email: formData.email,
                phone: formData.phone,
                city: formData.city,
                villaName: formData.villaType,
                budgetRange: formData.budgetRange,
                purpose: formData.purpose,
                message: formData.message,
            });
            setStatus({ loading: false, error: '' });
            alert('Villa Enquiry Submitted!');
            setFormData({
                fullName: '', email: '', phone: '', city: '', villaType: '', budgetRange: '', purpose: '', message: ''
            });
        } catch (err) {
            setStatus({ loading: false, error: err.message || 'Failed to send request.' });
            alert('Error: ' + (err.message || 'Failed to send.'));
        }
    };

    const villaTypes = [
        {
            name: 'Lily Haven Villas',
            subtitle: '',
            image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=600',
        },
        {
            name: 'Azalea Restreat Villas',
            subtitle: '',
            image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=600',
        },
        {
            name: 'Lotus Signature Villas',
            subtitle: '',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
        },
        {
            name: 'Orchid Grand Villas',
            subtitle: '',
            image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=600',
        },
    ];

    const features = [
        {
            icon: <Compass className="w-4 h-4 text-[#1C3026]" />,
            label: 'Size Range',
            values: ['2,500 sq. ft.', '3,200 sq. ft.', '4,000 sq. ft.', '5,500 sq. ft.'],
        },
        {
            icon: <Maximize2 className="w-4 h-4 text-[#1C3026]" />,
            label: 'Built-up Area',
            values: ['1,800 sq. ft.', '2,400 sq. ft.', '3,100 sq. ft.', '4,200 sq. ft.'],
        },
        {
            icon: <Bed className="w-4 h-4 text-[#1C3026]" />,
            label: 'Bedrooms (BHK)',
            values: ['2 BHK', '3 BHK', '3 BHK + Study', '4 BHK + Maid'],
        },
        
        {
            icon: <Layers className="w-4 h-4 text-[#1C3026]" />,
            label: 'Floors / Structure',
            values: ['G + 1', 'G + 1', 'G + 1', 'G + 1'],
        },
        
       
        {
            icon: <Sun className="w-4 h-4 text-[#1C3026]" />,
            label: 'Private Terrace / Deck',
            values: ['-', 'check', 'check', 'check'],
        },
         
        {
            icon: <Building2 className="w-4 h-4 text-[#1C3026]" />,
            label: 'Clubhouse Access',
            values: ['check', 'check', 'check', 'check'],
        },
         
        {
            icon: <ShieldCheck className="w-4 h-4 text-[#1C3026]" />,
            label: 'Gated Security',
            values: ['24/7 Security', '24/7 Security', '24/7 Security', '24/7 Security'],
        },
        {
            icon: <TrendingUp className="w-4 h-4 text-[#1C3026]" />,
            label: 'ROI & Appreciation',
            values: ['Very High', 'Very High', 'Very High', 'Very High'],
        },
    ];

    const highlights = [
        {
            icon: <User className="w-5 h-5 text-[#1C3026]" />,
            title: 'Expert Consultation',
            desc: 'Tailored advice to match your lifestyle',
        },
        {
            icon: <Award className="w-5 h-5 text-[#1C3026]" />,
            title: 'Best Price Assurance',
            desc: 'Guaranteed best valuation for your investment',
        },
        {
            icon: <TrendingUp className="w-5 h-5 text-[#1C3026]" />,
            title: 'High Rental Yields',
            desc: 'Lucrative returns for vacation rentals',
        },
        {
            icon: <DollarSign className="w-5 h-5 text-[#1C3026]" />,
            title: 'Secure Title',
            desc: '100% verified legal & clear title property',
        },
    ];

    return (
        <div className="min-h-screen bg-[#FAF7F2] text-slate-800 font-sans p-4 md:p-8 space-y-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Table Container */}
                <div className="bg-[#FAF7F2] rounded-2xl border border-stone-300 p-3 md:p-4 shadow-sm overflow-hidden">

                    {/* Section Header */}
                    <div className="text-center pb-4 pt-2">
                        <h1 className="text-2xl md:text-4xl font-serif text-[#1C3026] font-bold tracking-wider">
                            VILLA COMPARISON
                        </h1>
                        <div className="flex items-center justify-center space-x-2 text-amber-700/60 my-1">
                            <span className="h-[1px] w-8 bg-amber-700/30" />
                            <span className="text-[10px]">❖</span>
                            <span className="h-[1px] w-8 bg-amber-700/30" />
                        </div>
                        <p className="text-xs text-slate-600 font-medium">
                            Architectural Specifications & Features Across All Villa Categories
                        </p>
                    </div>

                    {/* Comparison Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[700px] text-xs">
                            <thead>
                                <tr>
                                    <th className="bg-[#1C3026] text-amber-200 font-serif p-3 w-1/5 text-center border-r border-stone-300 rounded-tl-xl uppercase text-[11px] tracking-wider leading-snug">
                                        Specifications /<br />Features
                                    </th>
                                    {villaTypes.map((villa, idx) => (
                                        <th
                                            key={idx}
                                            className={`bg-[#1C3026] text-white p-2 text-center border-r border-stone-300 w-1/5 ${idx === villaTypes.length - 1 ? 'rounded-tr-xl border-r-0' : ''
                                                }`}
                                        >
                                            <div className="text-[10px] text-amber-300 tracking-wider font-semibold uppercase">
                                                {villa.name}
                                            </div>
                                            <div className="text-[9px] text-stone-300 tracking-normal font-normal mb-1.5">
                                                {villa.subtitle}
                                            </div>
                                            <div className="h-16 w-full rounded overflow-hidden border border-amber-500/20">
                                                <img
                                                    src={villa.image}
                                                    alt={villa.name}
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
                                            <td className="p-2.5 font-medium text-slate-800 border-b border-r border-stone-300">
                                                <div className="flex items-center space-x-2">
                                                    {feature.icon}
                                                    <span className="text-[11px]">{feature.label}</span>
                                                </div>
                                            </td>

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
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                        <div className="lg:col-span-4 space-y-4 text-center">
                            <div>
                                <h2 className="text-2xl font-serif text-[#1C3026] font-bold tracking-wider uppercase">
                                    VILLA ENQUIRY
                                </h2>
                                <p className="text-xs text-slate-600 font-medium mt-1">
                                    Connect With Our Luxury Real Estate Experts
                                </p>
                            </div>

                            <div className="h-100 rounded-xl overflow-hidden border border-stone-300 shadow-xs">
                                <img
                                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600"
                                    alt="Luxury Villa Exterior"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <div className="lg:col-span-5 space-y-3">
                            <form onSubmit={handleSubmit} className="space-y-2.5">
                                <div className="grid grid-cols-1 gap-2.5">
                                    <div className="relative">
                                        <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                                        <input
                                            type="text"
                                            placeholder="Full Name"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1C3026]"
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
                                            className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1C3026]"
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
                                            className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#1C3026]"
                                        />
                                    </div>

                               

                                    <div className="relative">
                                        <Home className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                                        <select name="villaType" value={formData.villaType} onChange={handleChange} className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-600 appearance-none focus:outline-none focus:border-[#1C3026]">
                                            <option value="">Interested Villa Type</option>
                                            <option value="type1">Villa Type 1 (Garden Villa)</option>
                                            <option value="type2">Villa Type 2 (Duplex Villa)</option>
                                            <option value="type3">Villa Type 3 (Pool Villa)</option>
                                            <option value="type4">Villa Type 4 (Luxury Estate)</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-slate-500 pointer-events-none" />
                                    </div>

                                 

                                    <div className="relative">
                                        <Building2 className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
                                        <select name="purpose" value={formData.purpose} onChange={handleChange} className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg pl-9 pr-8 py-2 text-xs text-slate-600 appearance-none focus:outline-none focus:border-[#1C3026]">
                                            <option value="">Purpose of Purchase</option>
                                            <option value="personal">Primary Residence</option>
                                            <option value="vacation">Vacation / Holiday Home</option>
                                            <option value="investment">Rental Investment</option>
                                        </select>
                                        <ChevronDown className="w-4 h-4 absolute right-3 top-2.5 text-slate-500 pointer-events-none" />
                                    </div>

                                    <div>
                                        <textarea
                                            rows={2}
                                            placeholder="Your Message / Specific Customization Needs"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full bg-[#F3EEE5] border border-stone-300 rounded-lg p-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#1C3026] resize-none"
                                        />
                                    </div>
                                </div>

                                <div className="pt-2 text-center">
                                    <button
                                        type="submit"
                                        className="bg-[#1C3026] hover:bg-[#14231b] text-white font-medium text-xs py-2.5 px-8 rounded-full inline-flex items-center space-x-2 transition-colors shadow-sm"
                                    >
                                        <span>BOOK A SITE VISIT</span>
                                        <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="lg:col-span-3 bg-[#F3EEE5]/80 rounded-xl p-4 border border-stone-300/70 space-y-4">
                            {highlights.map((item, idx) => (
                                <div key={idx} className="flex items-start space-x-3">
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
                        </div>

                    </div>
                </div>

                <div className="bg-[#1C3026] rounded-xl p-3 px-8 flex flex-col md:flex-row items-center justify-around text-white text-xs gap-3">
                    <div className="flex items-center space-x-2">
                        <Leaf className="w-4 h-4 text-amber-400" />
                        <span className="font-medium text-amber-100">Luxury Living</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-amber-400" />
                        <span className="font-medium text-amber-100">Prime Capital Growth</span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span className="font-medium text-amber-100">Bespoke Architecture</span>
                    </div>
                </div>

            </div>
        </div>
    );
}