import { useState, lazy, Suspense } from 'react'
import { Routes, Route } from "react-router-dom";

import './App.css'
import Navbar from './component/Navbar/Navbar'
import EchoFooter from './component/EchoFooter'
import ScrollToTop from './component/Common/ScrollToTop'

// Lazy-loaded route components
const Home = lazy(() => import('./component/Home'));
const Resort = lazy(() => import('./component/Resort'));
const Villas = lazy(() => import('./component/Villas'));
const Wedding = lazy(() => import('./component/VillasPages/Wedding'));
const MasterPlan = lazy(() => import('./component/MasterPlan'));
const Contact = lazy(() => import('./component/Contact'));
const ResortListingsings = lazy(() => import('./component/ResortPages/ResortListingsings'));

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Suspense fallback={
        <div className="min-h-screen bg-[#05110B] flex items-center justify-center text-[#C6A15B]">
          <div className="text-sm font-sans tracking-widest uppercase animate-pulse">Loading...</div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resort" element={<Resort />} />
          <Route path="/villa" element={<Villas />} />
          <Route path="/wedding" element={<Wedding />} />
          <Route path="/masterplan" element={<MasterPlan />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/ResortListingsings" element={<ResortListingsings />} />
        </Routes>
      </Suspense>
      <EchoFooter />
    </>
  )
}

export default App