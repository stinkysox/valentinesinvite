import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { CONTENT } from '../data/content';

export const Photobooth: React.FC<{ isNight: boolean }> = ({ isNight }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
            rotate: direction > 0 ? 10 : -10
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
            rotate: 0
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0,
            scale: 0.8,
            rotate: direction < 0 ? 10 : -10
        })
    };

    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => (prevIndex + newDirection + CONTENT.polaroids.length) % CONTENT.polaroids.length);
    };

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-20 relative overflow-hidden">
            <div className="text-center mb-12">
                <h3 className={`font-serif text-3xl md:text-4xl mb-2 ${isNight ? 'text-gold' : 'text-burgundy'}`}>
                    Memory Lane
                </h3>
                <div className={`h-px w-24 mx-auto ${isNight ? 'bg-gold/30' : 'bg-burgundy/20'}`}></div>
            </div>

            {/* Vintage Booth Container */}
            <div className="relative aspect-[4/5] md:aspect-video max-w-2xl mx-auto group">
                {/* Outer Frame (Wood/Metal) */}
                <div className={`absolute inset-0 rounded-[2rem] border-[12px] md:border-[20px] shadow-2xl z-10 pointer-events-none ${
                    isNight ? 'border-[#3d2b1f] bg-[#2a1b12]/10' : 'border-[#5a3e2b] bg-[#4a3324]/5'
                }`}>
                    <div className="absolute inset-0 rounded-lg border border-white/10 shadow-inner"></div>
                </div>

                {/* Internal Screen */}
                <div className={`absolute inset-4 md:inset-8 rounded-xl overflow-hidden flex items-center justify-center ${
                    isNight ? 'bg-[#0a0a0a]' : 'bg-[#1a1a1a]'
                }`}>
                    <AnimatePresence initial={false} custom={direction}>
                        <motion.div
                            key={currentIndex}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);
                                if (swipe < -10000) paginate(1);
                                else if (swipe > 10000) paginate(-1);
                            }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-6"
                        >
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                {/* The Photo */}
                                <div className="bg-white p-2 pb-10 shadow-2xl transform rotate-1 w-[85%] md:w-[60%] aspect-[4/5] relative">
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-20 pointer-events-none"></div>
                                    <div className="w-full h-full overflow-hidden bg-gray-100">
                                        <img 
                                            src={CONTENT.polaroids[currentIndex].url} 
                                            alt={CONTENT.polaroids[currentIndex].caption}
                                            className="w-full h-full object-cover filter contrast-[1.1] sepia-[0.2]"
                                        />
                                    </div>
                                    <p className="font-hand text-xl md:text-2xl text-center text-charcoal/80 absolute bottom-2 left-0 right-0">
                                        {CONTENT.polaroids[currentIndex].caption}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Scanlines Overlay */}
                    <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,118,0.06))] bg-[length:100%_2px,3px_100%]"></div>
                </div>

                {/* Controls */}
                <button 
                    onClick={() => paginate(-1)}
                    className="absolute left-[-15px] md:left-[-30px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all shadow-xl"
                >
                    <ChevronLeft size={32} />
                </button>
                <button 
                    onClick={() => paginate(1)}
                    className="absolute right-[-15px] md:right-[-30px] top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center hover:bg-white/20 transition-all shadow-xl"
                >
                    <ChevronRight size={32} />
                </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-12">
                {CONTENT.polaroids.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => {
                            setDirection(i > currentIndex ? 1 : -1);
                            setCurrentIndex(i);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            i === currentIndex 
                            ? (isNight ? 'bg-gold w-6' : 'bg-burgundy w-6') 
                            : (isNight ? 'bg-gold/20' : 'bg-burgundy/10')
                        }`}
                    />
                ))}
            </div>

            {/* Bottom Panel */}
            <div className="flex items-center justify-center gap-4 mt-8 opacity-40">
                <Camera size={16} className={isNight ? 'text-gold' : 'text-burgundy'} />
                <span className="text-[10px] tracking-[0.4em] uppercase font-bold">Swipe to explore</span>
            </div>
        </div>
    );
};
