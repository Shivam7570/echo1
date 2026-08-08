import React from 'react'
import ContactHero from './Contact/ContactHero'
import CorporateOfficeSection from './Contact/CorporateOfficeSection'
import AmenitiesSection from './Contact/AmemitiesSection'
import Amenities from './Contact/Amenities'

export default function Contact() {
    return (
        <div>
            <ContactHero />
            <CorporateOfficeSection />
            <Amenities />
        </div>
    )
}
