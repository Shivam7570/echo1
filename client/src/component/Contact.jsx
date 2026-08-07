import React from 'react'
import ContactHero from './Contact/ContactHero'
import CorporateOfficeSection from './Contact/CorporateOfficeSection'
import SendEnquirySection from './Contact/SendEnquirySection'

export default function Contact() {
    return (
        <div>
            <ContactHero />
            <CorporateOfficeSection />
            <SendEnquirySection />
        </div>
    )
}
