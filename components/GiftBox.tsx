import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { CONTENT } from '../data/content';

export const LuxuryGiftBox: React.FC<{ onOpen: () => void }> = ({ onOpen }) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleClick = () => {
        if (!isOpen) {
            setIsOpen(true);
            onOpen();
        }
    };
  
    return (
      <div className="relative w-80 h-80 mx-auto perspective-1000 z-30 group cursor-pointer mt-12" onClick={handleClick}>
         
         {/* Floating Revealed Item */}
         <motion.div 
            initial={{ y: 20, opacity: 0, scale: 0.8 }}
            animate={isOpen ? { y: -100, opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.6, duration: 1.2, type: "spring", stiffness: 100 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-32 h-32 pointer-events-none"
         >
             <div className="relative w-full h-full flex flex-col items-center justify-center">
                 {/* Premium Item Container */}
                 <div className="w-20 h-20 bg-gradient-to-br from-gray-900 to-black rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] flex items-center justify-center border border-gold/40 relative overflow-hidden">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.1),transparent)]"></div>
                     <div className="absolute inset-[2px] rounded-[10px] bg-black/40 shadow-inner"></div>
                     
                     {/* The Gift Item (Detailed Heart) */}
                     <div className="relative transform hover:scale-110 transition-transform duration-500">
                         <Heart className="text-gold fill-gold/20" size={32} strokeWidth={1.5} />
                         <motion.div 
                            animate={{ opacity: [0.3, 0.7, 0.3] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="absolute inset-0 blur-[8px] bg-gold/30 rounded-full"
                         ></motion.div>
                     </div>
                 </div>
                 
                 <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={isOpen ? { opacity: 1, y: 0 } : {}}
                   transition={{ delay: 1.4 }}
                   className="mt-6 text-center"
                 >
                    <p className="font-serif text-gold text-lg font-bold tracking-tight drop-shadow-md">
                        {CONTENT.giftMessage}
                    </p>
                    <div className="h-[1px] w-12 bg-gold/30 mx-auto mt-1"></div>
                 </motion.div>
                 <Sparkles className="absolute -top-4 -right-4 text-gold animate-pulse" size={24} />
             </div>
         </motion.div>

         {/* 3D Box Container */}
         <div className="relative w-52 h-36 mx-auto top-32 transform-style-3d transition-transform duration-700">
             
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
                animate={isOpen ? { rotateX: 115 } : { rotateX: 0 }}
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
                             animate={!isOpen ? { scale: [1, 1.05, 1] } : {}}
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
  
         {!isOpen && (
           <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-10 w-full flex flex-col items-center gap-2"
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