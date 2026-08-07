import React, { useState } from 'react';
import {
    User,
    Phone,
    Mail,
    Pencil,
    Send,
    CheckCircle2,
    MessageCircle,
    X
} from 'lucide-react';
import { submitEnquiry } from '../../lib/api';

export default function SendEnquirySection() {
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [showWidgetBadge, setShowWidgetBadge] = useState(true);

    // Main enquiry form state
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState({ loading: false, success: '', error: '' });

    // Floating chat widget form state
    const [chatForm, setChatForm] = useState({ name: '', contact: '', message: '' });
    const [chatStatus, setChatStatus] = useState({ loading: false, error: '' });

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleEnquirySubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ loading: true, success: '', error: '' });
        try {
            await submitEnquiry({ ...form, source: 'contact-page' });
            setFormStatus({ loading: false, success: 'Thank you! We will get back to you within 24 hours.', error: '' });
            setForm({ name: '', phone: '', email: '', message: '' });
        } catch (err) {
            setFormStatus({ loading: false, success: '', error: err.message || 'Failed to send enquiry. Please try again.' });
        }
    };

    const handleChatChange = (e) => {
        setChatForm({ ...chatForm, [e.target.name]: e.target.value });
    };

    const handleChatSubmit = async (e) => {
        e.preventDefault();
        setChatStatus({ loading: true, error: '' });
        try {
            const isEmail = chatForm.contact.includes('@');
            await submitEnquiry({
                name: chatForm.name,
                email: isEmail ? chatForm.contact : undefined,
                phone: !isEmail ? chatForm.contact : undefined,
                message: chatForm.message,
                source: 'chat-widget',
            });
            setChatStatus({ loading: false, error: '' });
            setChatForm({ name: '', contact: '', message: '' });
            alert('Message Sent! Our team will reach out to you shortly.');
            setIsHelpOpen(false);
        } catch (err) {
            setChatStatus({ loading: false, error: err.message || 'Failed to send. Please try again.' });
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#FAF7F2] font-sans text-stone-800 flex flex-col justify-between relative">

            {/* Main Container */}
            <div className="relative w-full flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">

                {/* Left Side: Compact Cream Card with Form */}
                <div className="lg:col-span-5 bg-[#FAF7F2] p-4 md:p-6 lg:p-8 flex flex-col justify-center items-center lg:items-end">
                    {/* Reduced Width: max-w-sm & Reduced Padding/Spacing */}
                    <div className="w-full max-w-sm bg-[#FAF7F2] p-4 md:p-5 rounded-2xl space-y-4">

                        {/* Header */}
                        <div className="space-y-1">
                            <div className="flex items-center space-x-1.5 text-[#C29B38] text-[9px] md:text-[10px] font-bold uppercase tracking-widest">
                                <span>WE'D LOVE TO HEAR FROM YOU</span>
                                <span className="h-[1px] w-6 bg-[#C29B38]"></span>
                                <span>❖</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-serif text-stone-900 font-normal">
                                Send Us An Enquiry
                            </h2>
                        </div>

                        {/* Form - Compact Inputs */}
                        <form className="space-y-2.5" onSubmit={handleEnquirySubmit}>
                            <div className="relative">
                                <input
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleFormChange}
                                    required
                                    placeholder="Full Name"
                                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 pr-9 text-xs focus:outline-none focus:border-[#C29B38] transition-colors placeholder:text-stone-400"
                                />
                                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                            </div>

                            <div className="relative">
                                <input
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleFormChange}
                                    required
                                    placeholder="Mobile Number"
                                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 pr-9 text-xs focus:outline-none focus:border-[#C29B38] transition-colors placeholder:text-stone-400"
                                />
                                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                            </div>

                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleFormChange}
                                    placeholder="Email Address"
                                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 pr-9 text-xs focus:outline-none focus:border-[#C29B38] transition-colors placeholder:text-stone-400"
                                />
                                <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-stone-400" />
                            </div>

                            <div className="relative">
                                <textarea
                                    rows="2"
                                    name="message"
                                    value={form.message}
                                    onChange={handleFormChange}
                                    placeholder="Message"
                                    className="w-full bg-white border border-stone-200 rounded-lg px-3 py-2 pr-9 text-xs focus:outline-none focus:border-[#C29B38] transition-colors placeholder:text-stone-400 resize-none"
                                ></textarea>
                                <Pencil className="absolute right-3 top-2.5 w-3.5 h-3.5 text-stone-400" />
                            </div>

                            <button
                                type="submit"
                                disabled={formStatus.loading}
                                className="w-full bg-gradient-to-r from-[#D4A359] to-[#B3833B] hover:from-[#c5954c] hover:to-[#a2742f] text-white font-bold text-[11px] uppercase tracking-wider py-2.5 rounded-lg shadow-sm flex items-center justify-center space-x-1.5 transition-all cursor-pointer disabled:opacity-60"
                            >
                                <span>{formStatus.loading ? 'SENDING...' : 'SEND MESSAGE'}</span>
                                <Send className="w-3.5 h-3.5" />
                            </button>

                            {formStatus.success && (
                                <p className="text-[11px] text-emerald-700 text-center">{formStatus.success}</p>
                            )}
                            {formStatus.error && (
                                <p className="text-[11px] text-red-600 text-center">{formStatus.error}</p>
                            )}
                        </form>

                        <p className="text-[10px] text-stone-500 text-center flex items-center justify-center space-x-1 pt-1">
                            <span className="text-[#C29B38]">❖</span>
                            <span>Our team will get back to you within 24 hours.</span>
                        </p>

                    </div>
                </div>

                {/* Right Side: Resort Background Image & Overlay Card */}
                <div
                    className="lg:col-span-7 relative bg-cover bg-center min-h-[350px] flex items-center justify-start p-6 md:p-8"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1600&q=80')`
                    }}
                >
                    <div className="absolute inset-0 bg-black/30"></div>

                    <div className="relative z-10 bg-[#0A1A12]/85 backdrop-blur-md border border-emerald-900/60 p-5 rounded-xl max-w-sm text-white space-y-3.5">
                        <h3 className="text-[11px] font-bold text-[#D4A359] uppercase tracking-widest">
                            WHY CONNECT WITH US?
                        </h3>

                        <div className="space-y-2.5 text-xs text-stone-200">
                            <div className="flex items-center space-x-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#D4A359] flex-shrink-0" />
                                <span>Expert guidance for your dream property</span>
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#D4A359] flex-shrink-0" />
                                <span>Personalized site visits & consultations</span>
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#D4A359] flex-shrink-0" />
                                <span>Best investment opportunities</span>
                            </div>
                            <div className="flex items-center space-x-2.5">
                                <CheckCircle2 className="w-4 h-4 text-[#D4A359] flex-shrink-0" />
                                <span>Dedicated support at every step</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Bottom Footer: Follow Us On */}
            <footer className="w-full bg-[#FAF7F2] border-t border-stone-200/80 py-5 px-4">
                <div className="max-w-5xl mx-auto space-y-4">
                    <div className="flex items-center justify-center space-x-2 text-[#C29B38]">
                        <span className="h-[1px] w-8 bg-[#C29B38]/40"></span>
                        <span className="text-[11px] font-bold tracking-widest uppercase text-stone-800">FOLLOW US ON</span>
                        <span className="h-[1px] w-8 bg-[#C29B38]/40"></span>
                    </div>

                    <div className="flex justify-center -mt-3 text-[#C29B38]">
                        <span className="text-[10px]">❖</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center justify-items-center">
                        <a href="#instagram" className="flex items-center space-x-2.5 group">
                            <div className="w-8 h-8 rounded-full border border-stone-300 flex items-center justify-center text-red-600 group-hover:bg-red-50 transition-colors">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold tracking-wider text-stone-800 uppercase">INSTAGRAM</p>
                                <p className="text-[9px] text-stone-500">@echoresort</p>
                            </div>
                        </a>

                        <a href="#facebook" className="flex items-center space-x-2.5 group">
                            <div className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center group-hover:opacity-90 transition-opacity">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold tracking-wider text-stone-800 uppercase">FACEBOOK</p>
                                <p className="text-[9px] text-stone-500">@echoresort</p>
                            </div>
                        </a>

                        <a href="#linkedin" className="flex items-center space-x-2.5 group">
                            <div className="w-8 h-8 rounded-full bg-[#0A66C2] text-white flex items-center justify-center group-hover:opacity-90 transition-opacity">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold tracking-wider text-stone-800 uppercase">LINKEDIN</p>
                                <p className="text-[9px] text-stone-500">@echoresort</p>
                            </div>
                        </a>

                        <a href="#youtube" className="flex items-center space-x-2.5 group">
                            <div className="w-8 h-8 rounded-full bg-[#FF0000] text-white flex items-center justify-center group-hover:opacity-90 transition-opacity">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[11px] font-bold tracking-wider text-stone-800 uppercase">YOUTUBE</p>
                                <p className="text-[9px] text-stone-500">@echoresort</p>
                            </div>
                        </a>
                    </div>
                </div>
            </footer>

            {/* Floating "We Are Here!" Widget */}
            <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end">

                {/* Label & Icon */}
                {showWidgetBadge && !isHelpOpen && (
                    <div className="relative mb-1 flex items-center">
                        <button
                            onClick={() => setShowWidgetBadge(false)}
                            className="text-stone-700 hover:text-black p-0.5 rounded-full mr-1 cursor-pointer"
                        >
                            <X className="w-3 h-3" />
                        </button>
                        <span className="text-xl animate-bounce mr-1">👋</span>
                        <div className="font-bold text-sky-400 text-xs tracking-wide drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)] -rotate-6">
                            We Are Here!
                        </div>
                    </div>
                )}

                {/* Compact Circular Chat Button */}
                <button
                    onClick={() => setIsHelpOpen(!isHelpOpen)}
                    className="w-12 h-12 rounded-full bg-[#D8A856] hover:bg-[#c69747] text-white flex items-center justify-center shadow-xl transition-transform transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                    {isHelpOpen ? (
                        <X className="w-5 h-5 text-white" />
                    ) : (
                        <MessageCircle className="w-6 h-6 fill-white text-[#D8A856]" />
                    )}
                </button>

                {/* Reduced Width & Height "Can I Help You?" Modal Form */}
                {isHelpOpen && (
                    <div className="absolute bottom-16 right-0 w-64 sm:w-72 bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden z-50 animate-in fade-in duration-150">
                        {/* Header */}
                        <div className="bg-[#0A1A12] px-3.5 py-2.5 text-white flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="w-7 h-7 rounded-full bg-[#D8A856] flex items-center justify-center text-xs">
                                    💬
                                </div>
                                <div>
                                    <h4 className="text-xs font-bold leading-tight">Can I Help You?</h4>
                                    <p className="text-[9px] text-stone-300">We reply in minutes</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsHelpOpen(false)}
                                className="text-stone-400 hover:text-white"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Compact Form */}
                        <form onSubmit={handleChatSubmit} className="p-3 space-y-2">
                            <div>
                                <label className="text-[10px] font-semibold text-stone-600 block mb-0.5">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={chatForm.name}
                                    onChange={handleChatChange}
                                    required
                                    placeholder="Enter name"
                                    className="w-full text-[11px] p-1.5 px-2 border border-stone-200 rounded-md focus:outline-none focus:border-[#D8A856]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-semibold text-stone-600 block mb-0.5">Email / Phone</label>
                                <input
                                    type="text"
                                    name="contact"
                                    value={chatForm.contact}
                                    onChange={handleChatChange}
                                    required
                                    placeholder="Email or phone"
                                    className="w-full text-[11px] p-1.5 px-2 border border-stone-200 rounded-md focus:outline-none focus:border-[#D8A856]"
                                />
                            </div>

                            <div>
                                <label className="text-[10px] font-semibold text-stone-600 block mb-0.5">How can we assist?</label>
                                <textarea
                                    rows="2"
                                    name="message"
                                    value={chatForm.message}
                                    onChange={handleChatChange}
                                    required
                                    placeholder="Type query here..."
                                    className="w-full text-[11px] p-1.5 px-2 border border-stone-200 rounded-md focus:outline-none focus:border-[#D8A856] resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={chatStatus.loading}
                                className="w-full bg-[#D8A856] hover:bg-[#c69747] text-white font-bold text-[10px] uppercase tracking-wider py-2 rounded-md shadow-sm transition-colors flex items-center justify-center space-x-1 disabled:opacity-60"
                            >
                                <span>{chatStatus.loading ? 'Sending...' : 'Start Chat'}</span>
                                <Send className="w-3 h-3" />
                            </button>
                            {chatStatus.error && (
                                <p className="text-[10px] text-red-600 text-center">{chatStatus.error}</p>
                            )}
                        </form>
                    </div>
                )}

            </div>

        </div>
    );
}