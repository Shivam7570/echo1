import React from 'react';
import { HeroSection } from './VillasPages/HeroSection';
import { LifestyleSection } from './VillasPages/LifestyleSection';
import { FeaturesAndInvestment } from './VillasPages/FeaturesAndInvestment';
import { GalleryAndFooter } from './VillasPages/GalleryAndFooter';
import VillaTypesSection from './VillasPages/VillaTypesSection';
import VillaComparisonSection from './VillasPages/VillaComparisonSection';


export default function Villas() {
    return (
        <main className="font-sans antialiased text-gray-900">
            <HeroSection />
            <LifestyleSection />
            <FeaturesAndInvestment />
            <GalleryAndFooter />
            <VillaTypesSection />
            <VillaComparisonSection />

        </main>
    );
}