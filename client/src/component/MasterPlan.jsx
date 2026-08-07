import React from 'react'
import MasterHero from './MasterPlan/MasterHero'
import OverviewS2 from './MasterPlan/OverviewS2'
// import PlotSizes from './MasterPlan/PlotSizes'
// import PlotOptions from './MasterPlan/PlotOptions'
import DevelopmentFeatures from './MasterPlan/DevelopmentFeatures'
import CTA from './MasterPlan/CTA'
import MasterPlanS from './MasterPlan/MasterPlanS'

export default function MasterPlan() {
    return (
        <div className="font-body bg-ivory overflow-x-hidden">

            <MasterHero />
            <OverviewS2 />
            {/* <PlotSizes /> */}
            {/* <PlotOptions /> */}
            <MasterPlanS />
            <DevelopmentFeatures />
            <CTA />

        </div>
    )
}
