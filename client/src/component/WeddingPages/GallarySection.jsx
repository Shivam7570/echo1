import React, { useState } from 'react';
import { submitEnquiry } from '../../lib/api';

export const GalleryAndPackagesSection = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null); // State for modal form

    const gallery = [
        { label: 'Haldi Ceremony', src: 'https://images.unsplash.com/photo-1645856052484-2e5506e20942?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: 'Mehendi', src: 'https://media.istockphoto.com/id/1341409072/photo/group-of-unrecognizable-females-showing-henna-hands.jpg?s=1024x1024&w=is&k=20&c=-4ciirUOeMqwdfeaBoZI4Ea-KJXYWm3-earxEqGtRfY=' },
        { label: 'Wedding Mandap', src: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: 'Reception', src: 'https://images.unsplash.com/photo-1677129666186-d29eba893fe3?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { label: 'Couple Photoshoot', src: 'https://images.unsplash.com/photo-1630526720753-aa4e71acf67d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Q291cGxlJTIwUGhvdG9zaG9vdCUyMHdlZGRpbmd8ZW58MHx8MHx8fDA%3D' },
        { label: 'Poolside Dinner', src: 'https://media.istockphoto.com/id/184863764/photo/ready-for-a-wedding.jpg?s=1024x1024&w=is&k=20&c=mGtq_43IPtWs1nW8KtLINV7gGNjfm5kOLkOzzmXfVOs=' },
        { label: 'Bridal Entry', src: 'https://images.unsplash.com/photo-1710494422475-4038622aefe3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8QnJpZGFsJTIwRW50cnl8ZW58MHx8MHx8fDA%3D' },
        { label: 'Fireworks', src: 'https://images.unsplash.com/photo-1533219057257-4bb9ed5d2cc6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fEZpcmV3b3Jrc3xlbnwwfHwwfHx8MA%3D%3D' },
    ];

    const packages = [
        {
            name: 'Silver',
            price: '₹ 8,99,999',
            highlight: false,
            features: ['Venue', 'Decoration', 'Catering', 'Photography'],
        },
        {
            name: 'Gold',
            price: '₹ 14,99,999',
            highlight: true,
            features: ['Everything in Silver', 'Luxury Stay', 'DJ Night', 'Premium Decoration', 'Bridal Suite'],
        },
        {
            name: 'Royal',
            price: '₹ 24,99,999',
            highlight: false,
            features: ['Everything in Gold', 'Luxury Villas', 'Celebrity Chef Menu', 'Airport Pickup', 'Couple Spa', 'Fireworks', 'Wedding Planning Team'],
        },
    ];

    const [formData, setFormData] = useState({ name: '', phone: '', date: '', message: '' });
    const [status, setStatus] = useState({ loading: false, error: '' });

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, error: '' });
        try {
            await submitEnquiry({
                name: formData.name,
                phone: formData.phone,
                message: `Package: ${selectedPackage.name}, Date: ${formData.date}, Requirements: ${formData.message}`,
                source: 'wedding'
            });
            setStatus({ loading: false, error: '' });
            alert(`Thank you! Request submitted for ${selectedPackage.name} Package.`);
            setSelectedPackage(null);
            setFormData({ name: '', phone: '', date: '', message: '' });
        } catch (err) {
            setStatus({ loading: false, error: err.message || 'Failed to send. Please try again.' });
            alert('Error: ' + (err.message || 'Failed to send.'));
        }
    };

    return (
        <section className="bg-[#FBF9F4] py-20 px-10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Gallery */}
                <div>
                    <span className="text-amber-700 text-xs tracking-widest uppercase font-semibold">Wedding Gallery</span>
                    <div className="grid grid-cols-4 gap-3 mt-6">
                        {gallery.map((img, i) => (
                            <div key={i} className="flex flex-col items-center gap-1">
                                <img
                                    src={img.src}
                                    alt={img.label}
                                    onClick={() => setSelectedImage(img)}
                                    className="rounded-lg h-24 w-full object-cover cursor-pointer hover:opacity-80 transition hover:scale-105 duration-200"
                                />
                                <span className="text-[10px] text-gray-600 text-center">{img.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Packages */}
                <div>
                    <span className="text-amber-700 text-xs tracking-widest uppercase font-semibold">Wedding Packages</span>
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        {packages.map((pkg, i) => (
                            <div
                                key={i}
                                className={`rounded-xl p-5 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 cursor-pointer shadow-sm hover:shadow-xl border ${pkg.highlight
                                        ? 'bg-[#0F1E19] text-white border-amber-500 hover:border-amber-300 hover:shadow-amber-900/30'
                                        : 'bg-white border-gray-200 hover:border-amber-600 hover:shadow-amber-100'
                                    }`}
                            >
                                <div>
                                    <h3 className={`font-serif text-lg mb-3 ${pkg.highlight ? 'text-amber-400' : 'text-gray-800'}`}>
                                        {pkg.name}
                                    </h3>
                                    <ul className={`text-xs space-y-1.5 mb-4 ${pkg.highlight ? 'text-gray-300' : 'text-gray-600'}`}>
                                        {pkg.features.map((f, j) => (
                                            <li key={j}>• {f}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <p className="text-[10px] mb-1 text-gray-400">Starting From</p>
                                    <p className={`font-serif mb-3 ${pkg.highlight ? 'text-amber-400' : 'text-gray-800'}`}>{pkg.price}</p>
                                    <button
                                        onClick={() => setSelectedPackage(pkg)}
                                        className={`w-full py-2 rounded text-xs transition duration-200 cursor-pointer ${pkg.highlight
                                                ? 'bg-amber-600 hover:bg-amber-500 text-white'
                                                : 'bg-[#0F1E19] hover:bg-[#1f3d33] text-white'
                                            }`}
                                    >
                                        Request Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-3">⭐ Packages can be customized as per your requirements</p>
                </div>
            </div>

            {/* Gallery Lightbox */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 text-white text-3xl hover:text-amber-400"
                    >
                        &times;
                    </button>
                    <div className="max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.label}
                            className="w-full max-h-[80vh] object-contain rounded-lg"
                        />
                        <p className="text-white text-center mt-4 text-sm tracking-wide">{selectedImage.label}</p>
                    </div>
                </div>
            )}

            {/* Request Details Form Modal */}
            {selectedPackage && (
                <div
                    className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setSelectedPackage(null)}
                >
                    <div
                        className="bg-[#0F1E19] border border-amber-500/50 rounded-2xl p-6 max-w-md w-full text-white shadow-2xl relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedPackage(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-amber-400 text-2xl font-bold"
                        >
                            &times;
                        </button>
                        <h3 className="font-serif text-2xl text-amber-400 mb-1">Inquire for {selectedPackage.name} Package</h3>
                        <p className="text-xs text-slate-300 mb-6">Starting at {selectedPackage.price}</p>

                        <form onSubmit={handleSubmitForm} className="space-y-4 text-left">
                            <div>
                                <label className="block text-xs text-amber-300/90 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    required
                                    placeholder="Enter your name"
                                    className="w-full px-3 py-2 rounded bg-[#06150E] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-amber-300/90 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    required
                                    placeholder="Enter mobile number"
                                    className="w-full px-3 py-2 rounded bg-[#06150E] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-amber-300/90 mb-1">Message / Requirements</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleFormChange}
                                    rows="3"
                                    placeholder="Tell us about your event..."
                                    className="w-full px-3 py-2 rounded bg-[#06150E] border border-amber-500/30 text-white text-xs focus:outline-none focus:border-amber-400 resize-none"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-2.5 mt-2 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded text-xs tracking-wider uppercase transition cursor-pointer"
                            >
                                Submit Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};