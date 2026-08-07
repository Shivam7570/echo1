import React, { useState } from 'react';

export const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const faqs = [
        'How many guests can your wedding venue accommodate?',
        'Do you provide complete wedding planning services?',
        'Can we customize our wedding package?',
        'Are luxury villas available for guests?',
        'Do you arrange destination weddings?',
        'Is catering included?',
        'Can we book only the venue?',
        'How far in advance should we book?',
        'Is parking available?',
        'How can we schedule a site visit?',
    ];

    const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section className="bg-[#0F1E19] text-white py-20 px-10">
            <div className="max-w-5xl mx-auto text-center">
                <span className="text-amber-400 text-xs tracking-widest uppercase">Frequently Asked Questions</span>
                <h2 className="text-3xl font-serif mt-2 mb-10">Frequently Asked Questions About Weddings</h2>

                <div className="grid md:grid-cols-2 gap-3 text-left">
                    {faqs.map((q, i) => (
                        <div key={i} className="bg-[#152922] rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between px-4 py-3 text-sm"
                            >
                                <span>{i + 1}. {q}</span>
                                <span className="text-amber-400">{openIndex === i ? '−' : '+'}</span>
                            </button>
                            {openIndex === i && (
                                <div className="px-4 pb-3 text-xs text-gray-300">
                                    Our team will guide you through every detail — reach out via the contact form below and we'll answer this personally.
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};