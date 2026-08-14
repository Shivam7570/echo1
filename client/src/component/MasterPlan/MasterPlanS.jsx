import React, { useState, useRef } from 'react';
import { Compass, ZoomIn } from 'lucide-react';
import imageSrc from "../../assets/masterlayout.jpeg";

export default function MasterPlanS() {
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // Touch gesture tracking state
    const touchDistanceRef = useRef(null);




    const zones = [
        { id: 'resort', name: 'Resort Zone', color: 'bg-blue-600' },
        { id: 'villa', name: 'Villa Zone', color: 'bg-amber-600' },
        { id: 'plot', name: 'Plot Zone', color: 'bg-[#C2A34E]' },
        { id: 'landscape', name: 'Landscape Zone', color: 'bg-[#557A3C]' },
    ];

    const mapFeatures = [
        { id: 1, title: 'Resort Zone', description: 'Luxury resort, clubhouse, spa, restaurant & more', top: '25%', left: '25%' },
        { id: 2, title: 'Villa Zone', description: 'Premium villas with private gardens & luxury amenities', top: '32%', left: '42%' },
        { id: 3, title: 'Plot Zone', description: 'Residential plots in different sizes with wide roads', top: '38%', left: '58%' },
        { id: 4, title: 'Landscape Zone', description: 'Parks, lake, walking trails & green open spaces', top: '60%', left: '41%' },
    ];

    // Helper: Distance between two touch points
    const getTouchDistance = (touches) => {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.hypot(dx, dy);
    };

    // Touch Event Handlers (2 Fingers Pinch-to-Zoom & 1 Finger Pan)
    const handleTouchStart = (e) => {
        if (e.touches.length === 2) {
            touchDistanceRef.current = getTouchDistance(e.touches);
        } else if (e.touches.length === 1 && zoomLevel > 1) {
            setIsDragging(true);
            setDragStart({
                x: e.touches[0].clientX - panPosition.x,
                y: e.touches[0].clientY - panPosition.y,
            });
        }
    };

    const handleTouchMove = (e) => {
        // Pinch-to-zoom with 2 fingers
        if (e.touches.length === 2 && touchDistanceRef.current !== null) {
            const newDistance = getTouchDistance(e.touches);
            const delta = newDistance - touchDistanceRef.current;

            setZoomLevel((prev) => Math.min(Math.max(prev + delta * 0.01, 1), 3));
            touchDistanceRef.current = newDistance;
        }
        // Move/Pan map with 1 finger when zoomed in
        else if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
            setPanPosition({
                x: e.touches[0].clientX - dragStart.x,
                y: e.touches[0].clientY - dragStart.y,
            });
        }
    };

    const handleTouchEnd = () => {
        touchDistanceRef.current = null;
        setIsDragging(false);
    };

    // Mouse Controls
    const handleWheelZoom = (e) => {
        e.preventDefault();
        const zoomDelta = e.deltaY < 0 ? 0.2 : -0.2;
        setZoomLevel((prev) => Math.min(Math.max(prev + zoomDelta, 1), 3));
    };

    const handleMouseDown = (e) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && zoomLevel > 1) {
            setPanPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
        }
    };

    const handleMouseUp = () => setIsDragging(false);

    const handleDoubleClick = () => {
        if (zoomLevel > 1) {
            setZoomLevel(1);
            setPanPosition({ x: 0, y: 0 });
        } else {
            setZoomLevel(2);
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF7F2] p-4 md:p-8 font-sans flex items-center justify-center">
            <div className="max-w-7xl w-full bg-[#FAF7F2] rounded-3xl border border-stone-200/80 p-6 md:p-8 shadow-xs space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-3 text-[#1C3026]">
                        <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-widest uppercase">
                            MASTER PLAN
                        </h1>
                        <div className="flex items-center space-x-1">
                            <span className="h-[1px] w-6 bg-amber-700/40"></span>
                            <span className="text-xs text-amber-800">❖</span>
                            <span className="h-[1px] w-6 bg-amber-700/40"></span>
                        </div>
                    </div>

                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                    {/* Map Container */}
                    <div
                        className={`lg:col-span-8 relative rounded-2xl overflow-hidden border border-stone-300 bg-stone-900 shadow-inner flex flex-col justify-between touch-none ${zoomLevel > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-pointer'
                            }`}
                        onWheel={handleWheelZoom}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onDoubleClick={handleDoubleClick}
                    >

                        {/* Map Zoom & Pan Wrapper */}
                        <div className="relative w-full h-[380px] md:h-[450px] overflow-hidden select-none">
                            <div
                                className="w-full h-full transition-transform duration-150 ease-out relative origin-center"
                                style={{
                                    transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`
                                }}
                            >
                                <img
                                    src={imageSrc}
                                    alt="Master Plan"
                                    className="w-full h-full object-contain pointer-events-none"
                                />

                                {/* Hotspot Markers */}
                                {mapFeatures.map((spot) => (
                                    <button
                                        key={spot.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedHotspot(spot.id);
                                        }}
                                        style={{ top: spot.top, left: spot.left }}
                                        className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center font-bold text-sm shadow-xl transition-all duration-300 pointer-events-auto cursor-pointer ${selectedHotspot === spot.id
                                            ? 'bg-amber-400 text-stone-900 ring-4 ring-amber-300/50 scale-110'
                                            : 'bg-[#1C3026] text-amber-200 border border-amber-400/60 hover:scale-110 hover:bg-amber-500 hover:text-stone-900'
                                            }`}
                                    >
                                        {spot.id}
                                    </button>
                                ))}
                            </div>

                            {/* Compass Overlay */}
                            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md p-2 rounded-full border border-white/20 text-white shadow-lg pointer-events-none">
                                <Compass className="w-8 h-8 md:w-9 md:h-9 text-stone-200 animate-pulse" />
                            </div>

                            {/* Instructions Overlay */}
                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-amber-200 text-[11px] px-3 py-1.5 rounded-full border border-amber-400/30 pointer-events-none flex items-center space-x-1.5">
                                <ZoomIn className="w-3.5 h-3.5" />
                                <span>Pinch with 2 fingers to Zoom ({Math.round(zoomLevel * 100)}%)</span>
                            </div>


                        </div>

                        {/* Legend Bar */}
                        <div className="bg-[#101D17] border-t border-stone-800 px-4 py-3 flex items-center justify-around text-white text-xs">
                            {zones.map((zone) => (
                                <div key={zone.id} className="flex items-center space-x-2">
                                    <span className={`w-3.5 h-3.5 rounded-xs ${zone.color} shadow-xs`}></span>
                                    <span className="font-medium text-stone-200 text-[11px]">
                                        {zone.name}
                                    </span>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* Right Side Panel */}
                    <div className="lg:col-span-4 bg-[#102319] text-stone-100 rounded-2xl p-5 shadow-lg border border-[#1a3325] flex flex-col justify-between">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xs font-serif font-bold text-amber-300 uppercase tracking-widest">
                                    MAP FEATURES
                                </h3>
                                <p className="text-[10px] text-stone-400 mt-0.5">
                                    Click on hotspots to explore zones
                                </p>
                            </div>

                            <div className="space-y-2.5 pt-1">
                                {mapFeatures.map((item) => (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelectedHotspot(item.id)}
                                        className={`flex items-start space-x-3 p-2.5 rounded-xl cursor-pointer transition-colors ${selectedHotspot === item.id
                                            ? 'bg-stone-800/80 border border-amber-500/30'
                                            : 'hover:bg-stone-800/40'
                                            }`}
                                    >
                                        <div className="w-6 h-6 rounded-full border border-amber-300/80 text-amber-300 flex items-center justify-center text-xs font-serif font-bold flex-shrink-0 mt-0.5">
                                            {item.id}
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-semibold text-stone-200 leading-tight">
                                                {item.title}
                                            </h4>
                                            <p className="text-[10px] text-stone-400 leading-snug mt-1">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}