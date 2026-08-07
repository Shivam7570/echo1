import React, { useState } from 'react';

export const GalleryAndFooter = () => {
    const [filter, setFilter] = useState('All');
    const [selectedImage, setSelectedImage] = useState(null);

    const categories = ['All', 'Exterior', 'Living Room', 'Bedroom', 'Swimming Pool', 'Kitchen', 'Garden', 'Balcony', 'Night View'];

    const galleryImages = [
        {
            src: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop',
            alt: 'Villa Exterior',
            category: 'Exterior',
            size: 'large',
        },
        {
            src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1200&auto=format&fit=crop',
            alt: 'Living Room',
            category: 'Living Room',
            size: 'small',
        },
        {
            src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200&auto=format&fit=crop',
            alt: 'Bedroom',
            category: 'Bedroom',
            size: 'small',
        },
        {
            src: 'https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?q=80&w=1200&auto=format&fit=crop',
            alt: 'Swimming Pool',
            category: 'Swimming Pool',
            size: 'large',
        },
        {
            src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
            alt: 'Garden',
            category: 'Garden',
            size: 'large',
        },
    ];

    const filteredImages =
        filter === 'All'
            ? galleryImages
            : galleryImages.filter((img) => img.category === filter);

    return (
        <section className="bg-[#FAF8F5] py-20 px-10">
            <div className="max-w-7xl mx-auto">
                {/* Gallery Header & Filter */}
                <div className="text-center mb-8">
                    <span className="text-amber-700 text-xs tracking-widest uppercase">— VILLA GALLERY —</span>
                    <div className="flex flex-wrap justify-center gap-2 mt-6">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 py-1.5 rounded-full text-xs transition ${filter === cat
                                    ? 'bg-amber-600 text-white'
                                    : 'bg-white text-gray-600 border hover:bg-gray-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Gallery Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    {filteredImages.length === 0 ? (
                        <p className="col-span-full text-center text-gray-500 text-sm py-10">
                            No images found for "{filter}".
                        </p>
                    ) : (
                        filteredImages.map((img, i) => (
                            <img
                                key={i}
                                src={img.src}
                                alt={img.alt}
                                onClick={() => setSelectedImage(img)}
                                className={`rounded-lg w-full object-cover cursor-pointer hover:opacity-90 transition ${img.size === 'large' ? 'h-64' : 'h-32'
                                    }`}
                            />
                        ))
                    )}
                </div>

                {/* Lightbox Modal */}
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
                        <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="w-full max-h-[80vh] object-contain rounded-lg"
                            />
                            <p className="text-white text-center mt-4 text-sm tracking-wide">
                                {selectedImage.alt}
                            </p>
                        </div>
                    </div>
                )}

                {/* Bottom Banner CTA */}

            </div>
        </section>
    );
};