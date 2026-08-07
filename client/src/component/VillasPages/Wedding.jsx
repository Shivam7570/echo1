import React from 'react'

import { WhyChooseSection } from '../WeddingPages/WhyChooseSection'
import { OurStorySection } from '../WeddingPages/OurStorySection'
import { GalleryAndPackagesSection } from '../WeddingPages/GallarySection'
import { FAQSection } from '../WeddingPages/FAQSection'
import { ContactAndFooterSection } from '../WeddingPages/Contact'
import { HeroWedding } from '../WeddingPages/Heros'

export default function Wedding() {
    return (
        <div className="font-sans">
            <HeroWedding />
            <WhyChooseSection />
            <OurStorySection />
            <GalleryAndPackagesSection />
            <FAQSection />
            <ContactAndFooterSection />
        </div>
    )
}
