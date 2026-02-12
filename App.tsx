import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';

import { CONTENT } from './data/content';
import { FairyLights, DayNightToggle, RealisticConfetti, SectionDivider, FallingPetals } from './components/Visuals';
import { Walkman } from './components/Walkman';
import { Polaroid } from './components/Polaroid';
import { TimelineItem } from './components/Timeline';
import { StarMap } from './components/StarMap';
import { ReasonsGrid, Coupons } from './components/LoveNotes';
import { WaxSealLetter, RealisticCandle } from './components/Interactive';
import { PolaroidCamera } from './components/PolaroidCamera';
import { LuxuryGiftBox } from './components/GiftBox';
import { Photobooth } from './components/Photobooth';

export default function App() {
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -150]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => window.scrollTo(0, 0), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    audioRef.current = new Audio(CONTENT.musicUrl);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    return () => { audioRef.current?.pause(); };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play().catch(console.error);
    setPlaying(!playing);
  };

  const handleGiftOpen = () => {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); 
  };

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden relative transition-colors duration-1000 ${isNight ? 'bg-night text-night-text' : 'bg-cream text-charcoal'}`}>
      
      {started && <DayNightToggle isNight={isNight} toggle={() => setIsNight(!isNight)} />}
      {started && <FallingPetals />}
      
      <AnimatePresence>
         {showConfetti && <RealisticConfetti key="confetti" />}
      </AnimatePresence>

      <AnimatePresence>
        {!started && (
          <motion.div 
            key="intro"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
            className="fixed inset-0 z-50 bg-[#F5E6D3] flex items-center justify-center overflow-hidden"
          >
            {/* Left Curtain */}
            <motion.div 
              initial={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 2.5, ease: [0.45, 0, 0.55, 1], delay: 0.2 }}
              className="absolute left-0 top-0 w-1/2 h-full bg-burgundy z-30 shadow-[5px_0_30px_rgba(0,0,0,0.5)] flex"
            >
                <div className="absolute right-0 w-1 h-full bg-black/20"></div>
                {/* Decorative Tassels/Edge */}
                <div className="absolute right-2 top-0 bottom-0 w-px bg-gold/20 mr-2"></div>
            </motion.div>

            {/* Right Curtain */}
            <motion.div 
              initial={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 2.5, ease: [0.45, 0, 0.55, 1], delay: 0.2 }}
              className="absolute right-0 top-0 w-1/2 h-full bg-burgundy z-30 shadow-[-5px_0_30px_rgba(0,0,0,0.5)] flex"
            >
                <div className="absolute left-0 w-1 h-full bg-black/20"></div>
                <div className="absolute left-2 top-0 bottom-0 w-px bg-gold/20 ml-2"></div>
            </motion.div>

            {/* Intro Content - Premium Envelope Style */}
            <motion.div 
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.8, ease: "easeInOut" } }}
              className="relative z-40 flex flex-col items-center justify-center min-h-[60vh]"
            >
                 {/* Decorative Top Ribbon/Flourish */}
                 <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="w-64 md:w-96 h-[2px] bg-gradient-to-r from-transparent via-gold/60 to-transparent mb-8"
                 ></motion.div>

                 <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.3 }}
                    className="text-center relative p-4"
                 >
                    <h2 className="font-hand text-6xl md:text-8xl mb-4 text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5E1] via-[#D4AF37] to-[#8a6e3d] drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] pb-2 pr-2 pl-2 leading-relaxed">
                        {CONTENT.recipientName}
                    </h2>
                    <p className="font-serif text-lg md:text-2xl text-gold/80 tracking-[0.2em] uppercase mt-2">
                        A Valentine's Surprise
                    </p>
                 </motion.div>

                 {/* Decorative Bottom Ribbon/Flourish */}
                 <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="w-40 md:w-60 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent mt-8 mb-16"
                 ></motion.div>

                 {/* Interactive Wax Seal Closure */}
                 <motion.div 
                    onClick={() => setStarted(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5, type: "spring" }}
                    className="relative cursor-pointer group"
                 >
                    {/* The Wax Seal */}
                    <div className="w-28 h-28 bg-[#7A1F31] rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.4)] flex items-center justify-center border-[6px] border-[#5a111a] relative overflow-hidden ring-4 ring-[#5a111a]/30">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/30"></div>
                        
                        {/* Seal Texture */}
                        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]"></div>

                        <Heart className="text-[#3a0b12] fill-[#3a0b12]/40 z-10 drop-shadow-sm" size={48} />
                        
                        {/* Highlight Ring */}
                        <div className="absolute inset-[6px] rounded-full border border-white/10"></div>
                        
                        {/* Shine */}
                        <div className="absolute top-[15%] left-[15%] w-[30%] h-[30%] bg-white/20 rounded-full blur-[6px]"></div>
                    </div>
                    
                    <div className="absolute -bottom-10 w-full text-center">
                        <span className="text-[10px] uppercase tracking-[0.3em] text-gold/60 font-serif">Tap to Open</span>
                    </div>

                    {/* Pulse Effect */}
                    <div className="absolute inset-0 bg-[#7A1F31] rounded-full animate-ping opacity-10 pointer-events-none duration-1000"></div>
                 </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {started && (
        <motion.main 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative pb-32"
        >
          <motion.div style={{ y: y1 }} className={`absolute top-20 left-10 text-9xl font-serif pointer-events-none z-0 transition-colors duration-1000 ${isNight ? 'text-white/5' : 'text-burgundy/5'}`}>Love</motion.div>
          <motion.div style={{ y: y2 }} className={`absolute top-1/3 right-10 text-[12rem] font-serif pointer-events-none z-0 transition-colors duration-1000 ${isNight ? 'text-white/5' : 'text-gold/10'}`}>Forever</motion.div>

          <section className="min-h-screen flex flex-col items-center justify-center relative px-6 pt-20">
             <FairyLights />
             
             <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-center z-10 space-y-6"
             >
                <div className={`inline-block border-b pb-2 mb-4 transition-colors duration-1000 ${isNight ? 'border-gold/30' : 'border-burgundy/30'}`}>
                     <p className={`font-bold tracking-[0.3em] uppercase text-xs md:text-sm transition-colors duration-1000 ${isNight ? 'text-gold' : 'text-gold-dark'}`}>February 14, 2025</p>
                </div>
                <h1 className={`font-serif text-6xl md:text-8xl drop-shadow-sm transition-colors duration-1000 ${isNight ? 'text-white' : 'text-burgundy'}`}>{CONTENT.heroTitle}</h1>
                <p className={`font-hand text-4xl md:text-5xl mt-4 transition-colors duration-1000 ${isNight ? 'text-gold-light' : 'text-charcoal/70'}`}>{CONTENT.recipientName}</p>
             </motion.div>

             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="mt-16 z-20"
             >
                <Walkman isPlaying={playing} togglePlay={toggleMusic} isNight={isNight} />
                <div className="text-center mt-6 flex flex-col items-center gap-2">
                   {playing && (
                       <div className="flex gap-1 h-3 items-end">
                           {[1,2,3,4,3,2].map((h, i) => (
                               <motion.div 
                                 key={i} 
                                 animate={{ height: [4, 12, 4] }} 
                                 transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }} 
                                 className={`w-1 rounded-full ${isNight ? 'bg-gold' : 'bg-burgundy/40'}`}
                               />
                           ))}
                       </div>
                   )}
                   <p className={`text-xs font-serif italic ${isNight ? 'text-white/40' : 'text-burgundy/40'}`}>Now Playing: Our Song</p>
                </div>
             </motion.div>
             
             <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute bottom-10 opacity-30"
             >
                <ChevronDown />
             </motion.div>
          </section>

          <section className="py-24 px-6 relative z-10">
             <FairyLights />
             <Photobooth isNight={isNight} />
          </section>

          <section className={`py-32 px-6 backdrop-blur-sm border-y relative overflow-hidden transition-colors duration-1000 ${isNight ? 'bg-white/5 border-white/10' : 'bg-white/40 border-white/50'}`}>
             <FairyLights />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,160,89,0.05),transparent_70%)]"></div>
             <div className="max-w-3xl mx-auto relative pt-12">
                <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px ${isNight ? 'bg-gold/20' : 'bg-burgundy/20'}`}></div>
                
                <h3 className="text-center font-serif text-3xl mb-20 relative z-10 inline-block w-full">
                    <span className={`px-4 py-2 rounded-full shadow-sm border ${isNight ? 'bg-gray-900 border-gold/40 text-gold' : 'bg-[#fcf8f2] border-gold/20 text-burgundy'}`}>Our Story</span>
                </h3>

                <div className="space-y-12">
                    {CONTENT.timeline.map((item, i) => (
                        <TimelineItem key={i} data={item} index={i} isNight={isNight} />
                    ))}
                </div>
             </div>
          </section>

          <section className="py-20 relative z-10">
             <FairyLights />
             <StarMap isNight={isNight} />
          </section>

          <section className="py-20 relative z-10 bg-transparent">
             <FairyLights />
             <ReasonsGrid isNight={isNight} />
          </section>

          <section className="py-10 relative z-10">
             <FairyLights />
             <Coupons isNight={isNight} />
          </section>

          <SectionDivider isNight={isNight} />

          <section className="py-20 px-6 relative flex flex-col items-center">
              <FairyLights />
              <WaxSealLetter isOpen={letterOpen} onOpen={() => setLetterOpen(true)} isNight={isNight} />
          </section>

          <SectionDivider isNight={isNight} />
          
          <section className="py-4 px-6 flex flex-col items-center relative">
              <FairyLights />
              <div className="text-center z-10">
                  <p className={`font-serif italic mb-8 ${isNight ? 'text-gold/60' : 'text-burgundy/60'}`}>Make a wish...</p>
                  <RealisticCandle />
              </div>
          </section>

          <SectionDivider isNight={isNight} />

          <section className="py-4 px-6">
              <PolaroidCamera isNight={isNight} />
          </section>

          <SectionDivider isNight={isNight} />

          <section className="py-32 px-6 flex flex-col items-center justify-center min-h-[50vh] relative">
               <FairyLights />
               <h2 className={`font-serif text-2xl mb-12 z-10 ${isNight ? 'text-gold' : 'text-burgundy'}`}>One Last Surprise</h2>
               <div className="z-10">
                   <LuxuryGiftBox onOpen={handleGiftOpen} />
               </div>
          </section>

          <footer className={`pt-20 pb-10 text-center font-serif tracking-widest ${isNight ? 'text-white/30' : 'text-burgundy/40'}`}>
              <p className="mb-2 text-xs uppercase">© 2025 Vintage Valentine.</p>
              <p className="text-lg italic font-hand opacity-80">From {CONTENT.loveLetter.sender} with Love</p>
          </footer>

        </motion.main>
      )}
    </div>
  );
}