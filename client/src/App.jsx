import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { Routes, Route } from "react-router-dom";

import './App.css'
import Navbar from './component/Navbar/Navbar'
import Home from './component/Home'
import EchoFooter from './component/EchoFooter'
import Resort from './component/Resort';
import Villas from './component/Villas';
import Wedding from './component/VillasPages/Wedding';
import MasterPlan from './component/MasterPlan';
import Contact from './component/Contact';
import ResortListingsings from './component/ResortPages/ResortListingsings';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resort" element={<Resort />} />
        <Route path="/villa" element={<Villas />} />
        <Route path="/wedding" element={<Wedding />} />
        <Route path="/masterplan" element={<MasterPlan />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/ResortListingsings" element={<ResortListingsings />} />

      </Routes>
      <EchoFooter />

    </>
  )
}

export default App
