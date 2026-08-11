import React, { useState } from 'react';
import { submitEnquiry } from '../../lib/api';

export const ContactAndFooterSection = () => {
    const [form, setForm] = useState({
        brideName: '', groomName: '', phone: '', email: '',
        weddingDate: '', guests: '', package: '', budget: '',
        requirements: '', message: '',
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitEnquiry({
                name: `${form.brideName} & ${form.groomName}`.trim() || form.brideName || form.groomName,
                email: form.email,
                phone: form.phone,
                visitDate: form.weddingDate,
                budgetRange: form.budget,
                message: `Guests: ${form.guests}, Package: ${form.package}, Requirements: ${form.requirements}, Message: ${form.message}`,
                source: 'wedding-contact'
            });
            alert('Thanks! We will get back to you shortly.');
            setForm({
                brideName: '', groomName: '', phone: '', email: '',
                weddingDate: '', guests: '', package: '', budget: '',
                requirements: '', message: '',
            });
        } catch (err) {
            alert('Error: ' + (err.message || 'Failed to submit request.'));
        }
    };

    return (
        <>
            <section className="bg-[#FBF9F4] py-20 px-10">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                    {/* Form */}
                    <div>
                        <span className="text-amber-700 text-xs tracking-widest uppercase">Start Planning Your Dream Wedding</span>
                        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-6">
                            <input name="brideName" value={form.brideName} onChange={handleChange} placeholder="Bride Name" className="border rounded px-4 py-2 text-sm col-span-1" />
                            <input name="groomName" value={form.groomName} onChange={handleChange} placeholder="Groom Name" className="border rounded px-4 py-2 text-sm col-span-1" />
                            <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" className="border rounded px-4 py-2 text-sm col-span-1" />
                            <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" className="border rounded px-4 py-2 text-sm col-span-1" />
                            <input type="date" name="weddingDate" value={form.weddingDate} onChange={handleChange} className="border rounded px-4 py-2 text-sm col-span-1" />
                            <input name="guests" value={form.guests} onChange={handleChange} placeholder="Number of Guests" className="border rounded px-4 py-2 text-sm col-span-1" />
                            <select name="package" value={form.package} onChange={handleChange} className="border rounded px-4 py-2 text-sm col-span-1">
                                <option value="">Select Package</option>
                                <option>Silver</option>
                                <option>Gold</option>
                                <option>Royal</option>
                            </select>
                            <select name="budget" value={form.budget} onChange={handleChange} className="border rounded px-4 py-2 text-sm col-span-1">
                                <option value="">Select Budget</option>
                                <option>Under ₹10L</option>
                                <option>₹10L - ₹20L</option>
                                <option>₹20L+</option>
                            </select>
                            <textarea name="requirements" value={form.requirements} onChange={handleChange} placeholder="Tell us about your requirements" className="border rounded px-4 py-2 text-sm col-span-2" rows={2} />
                            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" className="border rounded px-4 py-2 text-sm col-span-2" rows={2} />
                            <button type="submit" className="col-span-2 bg-[#0F1E19] hover:bg-[#152922] text-white py-3 rounded text-sm flex items-center justify-center gap-2">
                                Plan My Wedding ♥
                            </button>
                        </form>
                    </div>

                    {/* Contact Info + Map */}
                    <div>
                        <span className="text-amber-700 text-xs tracking-widest uppercase">Get In Touch</span>
                        <div className="space-y-4 mt-6 text-sm text-gray-700">
                            <p>📍 <strong>Resort Address</strong><br />Echo – The Jungle Resort &amp; Villa, Village Dhole, Ramnagar, Nainital, Uttarakhand, India – 244715</p>
                            <p>📞 <strong>Call Us</strong><br />+91 98765 43210</p>
                            <p>✉️ <strong>Email Us</strong><br />weddings@echoresort.com</p>
                            <p>💬 <strong>Chat on WhatsApp</strong><br />+91 98765 43210</p>
                            <button className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded text-xs">
                                Schedule a Site Visit 📅
                            </button>
                        </div>

                        <div className="mt-6 rounded-lg overflow-hidden border">
                            <iframe
                                title="Resort Location"
                                src="https://www.google.com/maps?q=Ramnagar,Nainital,Uttarakhand&output=embed"
                                className="w-full h-64 border-0"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            {/* <footer className="bg-[#0F1E19] text-white pt-14 pb-6 px-10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-xs mb-10">
                    {['Luxury Amenities', 'Exquisite Cuisine', 'Beautiful Venues', 'Memorable Experiences'].map((cat, i) => (
                        <div key={i} className="text-center">
                            <p className="mb-3 text-amber-400">{cat}</p>
                        </div>
                    ))}
                </div>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-6 gap-4">
                    <div className="text-lg font-serif tracking-widest">ECHO</div>
                    <p className="text-[11px] text-gray-400">© 2025 Echo – The Jungle Resort &amp; Villa. All Rights Reserved.</p>
                    <button className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2 rounded text-xs">
                        Book Consultation
                    </button>
                </div>
            </footer> */}
        </>
    );
};