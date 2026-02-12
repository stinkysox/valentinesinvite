import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Ticket } from 'lucide-react';
import { CONTENT } from '../data/content';

const ScratchTicket: React.FC<{ onReveal: () => void }> = ({ onReveal }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isRevealed, setIsRevealed] = useState(false);
    const [scratchPercent, setScratchPercent] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set up the scratch layer (Gold Foil)
        ctx.fillStyle = '#C5A059'; // Gold color
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some texture/text to the foil
        ctx.fillStyle = '#8a6e3d';
        ctx.font = 'bold 20px serif';
        ctx.textAlign = 'center';
        ctx.fillText("SCRATCH HERE", canvas.width / 2, canvas.height / 2);
        
        // Add pattern
        ctx.fillStyle = 'rgba(255,255,255,0.1)';
        for(let i=0; i<50; i++) {
            ctx.beginPath();
            ctx.arc(Math.random()*canvas.width, Math.random()*canvas.height, Math.random()*5, 0, Math.PI*2);
            ctx.fill();
        }

    }, []);

    const handleScratch = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas || isRevealed) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;

        // Scratch effect
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2);
        ctx.fill();

        // Calculate revealed area
        // Throttle this calculation in a real app, but for this size it's okay-ish
        if (Math.random() > 0.8) { // Only check occasionally to save perf
             const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
             const pixels = imageData.data;
             let transparent = 0;
             for (let i = 0; i < pixels.length; i += 4) {
                 if (pixels[i + 3] < 128) transparent++;
             }
             const percent = (transparent / (pixels.length / 4)) * 100;
             setScratchPercent(percent);

             if (percent > 40) { // Reveal threshold
                 setIsRevealed(true);
                 onReveal();
             }
        }
    };

    return (
        <div className="relative w-72 h-40 bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-gold/50 transform rotate-[-2deg]">
            {/* The Prize (Underneath) */}
            <div className="absolute inset-0 bg-[#fffdf5] flex flex-col items-center justify-center p-4 text-center">
                <div className="border-2 border-dashed border-gold/30 absolute inset-2 rounded-lg"></div>
                <div className="flex items-center gap-2 mb-2 text-gold">
                    <Ticket size={20} />
                    <span className="font-serif font-bold tracking-widest text-xs uppercase">Golden Ticket</span>
                    <Ticket size={20} />
                </div>
                <h3 className="font-serif text-xl font-bold text-burgundy mb-1">{CONTENT.giftMessage}</h3>
                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Valid Forever • Non-Expirable</p>
                
                {isRevealed && (
                    <motion.div 
                        initial={{ scale: 2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div className="border-4 border-red-800/20 text-red-800/20 font-black text-4xl uppercase -rotate-12 p-2 rounded-lg">
                            REDEEMED
                        </div>
                    </motion.div>
                )}
            </div>

            {/* The Scratch Layer (Canvas) */}
            <motion.canvas
                ref={canvasRef}
                width={300}
                height={160}
                className="absolute inset-0 w-full h-full cursor-pointer touch-none"
                onMouseMove={handleScratch}
                onTouchMove={handleScratch}
                animate={isRevealed ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.5 }}
            />
        </div>
    );
};

export const LuxuryGiftBox: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
    const [status, setStatus] = useState<'closed' | 'opening' | 'ticket-view'>('closed');
  
    const handleClick = () => {
        if (status === 'closed') {
            setStatus('opening');
            setTimeout(() => {
                setStatus('ticket-view');
            }, 1500);
        }
    };

    const handleTicketReveal = () => {
        onOpen(); // Trigger confetti
    };
  
    return (
      <div className="relative w-80 h-96 mx-auto perspective-1000 z-30 group cursor-pointer mt-12">
         
         {/* Floating Scratch Ticket */}
         <AnimatePresence>
            {status === 'ticket-view' && (
                <motion.div 
                    initial={{ y: 50, opacity: 0, scale: 0.5 }}
                    animate={{ y: -150, opacity: 1, scale: 1.1 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full flex justify-center"
                >
                    <ScratchTicket onReveal={handleTicketReveal} />
                </motion.div>
            )}
         </AnimatePresence>

         {/* 3D Box Container */}
         <div 
            className="relative w-52 h-36 mx-auto top-32 transform-style-3d transition-transform duration-700"
            onClick={handleClick}
        >
             
             {/* Box Base Faces */}
             {/* Front */}
             <div className="absolute w-full h-full bg-[#4A0E1E] transform translate-z-24 flex items-center justify-center border border-white/5 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-10"></div>
                <div className="w-10 h-full bg-gradient-to-r from-[#8a6e3d] via-[#C5A059] to-[#8a6e3d] border-x border-white/10 shadow-lg relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/silk-weave.png')] opacity-20"></div>
                </div>
             </div>
             {/* Back */}
             <div className="absolute w-full h-full bg-[#3a0815] transform -translate-z-24 rotate-y-180 border border-white/5"></div>
             {/* Left */}
             <div className="absolute w-48 h-full bg-[#420a18] transform -translate-x-24 rotate-y-90 border border-white/5"></div>
             {/* Right */}
             <div className="absolute w-48 h-full bg-[#420a18] transform translate-x-24 rotate-y-90 border border-white/5"></div>
             {/* Bottom */}
             <div className="absolute w-full h-48 bg-[#2a0811] transform translate-y-12 rotate-x-90 shadow-[0_40px_70px_rgba(0,0,0,0.8)]"></div>

             {/* Animated Lid */}
             <motion.div 
                className="absolute w-full h-52 bg-transparent transform-style-3d -translate-y-28 -translate-z-24 origin-bottom"
                animate={status !== 'closed' ? { rotateX: 115 } : { rotateX: 0 }}
                transition={{ duration: 1.8, type: "spring", damping: 12 }}
             >
                  {/* Lid Top */}
                  <div className="absolute w-full h-full bg-[#5A1A2C] transform rotate-x-90 translate-z-10 border border-white/10 flex items-center justify-center shadow-lg overflow-hidden">
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-10"></div>
                       {/* Ribbon Cross */}
                       <div className="absolute w-10 h-full bg-gradient-to-r from-[#8a6e3d] via-[#C5A059] to-[#8a6e3d] shadow-md border-x border-white/5">
                           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/silk-weave.png')] opacity-30"></div>
                       </div>
                       <div className="absolute h-10 w-full bg-gradient-to-b from-[#8a6e3d] via-[#C5A059] to-[#8a6e3d] shadow-md border-y border-white/5">
                           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/silk-weave.png')] opacity-30"></div>
                       </div>
                       {/* Ribbon Knot (Bow) */}
                       <div className="relative z-10 w-16 h-16 flex items-center justify-center">
                           <motion.div 
                             animate={status === 'closed' ? { scale: [1, 1.05, 1] } : {}}
                             transition={{ repeat: Infinity, duration: 3 }}
                             className="w-12 h-12 rounded-full bg-gold shadow-[0_0_20px_rgba(197,160,89,0.5)] border border-white/20 flex items-center justify-center"
                           >
                               <Heart size={24} className="text-[#3a0815] fill-[#3a0815]/20" />
                           </motion.div>
                       </div>
                  </div>
                  {/* Lid Sides */}
                  <div className="absolute w-full h-20 bg-[#5A1A2C] transform translate-y-44 translate-z-24 flex justify-center border border-white/5 overflow-hidden shadow-inner">
                      <div className="w-10 h-full bg-[#C5A059] border-x border-white/10"></div>
                  </div>
                  <div className="absolute w-full h-20 bg-[#3a0815] transform translate-y-44 -translate-z-24 rotate-y-180 border border-white/5"></div>
                  <div className="absolute w-48 h-20 bg-[#4A0E1E] transform translate-y-44 -translate-x-24 rotate-y-90 border border-white/5"></div>
                  <div className="absolute w-48 h-20 bg-[#4A0E1E] transform translate-y-44 translate-x-24 rotate-y-90 border border-white/5"></div>
             </motion.div>
         </div>
  
         {status === 'closed' && (
           <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-10 w-full flex flex-col items-center gap-2"
           >
              <p className="text-gold/50 text-[9px] tracking-[0.5em] font-serif uppercase font-bold animate-pulse">
                Unwrap your surprise
              </p>
              <div className="w-1 h-3 bg-gold/30 rounded-full animate-bounce"></div>
           </motion.div>
         )}
      </div>
    );
};