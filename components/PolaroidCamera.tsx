import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Reliable sound effects
const SHUTTER_SOUND = "https://assets.mixkit.co/active_storage/sfx/2578/2578-preview.mp3";
const PRINT_SOUND = "https://assets.mixkit.co/active_storage/sfx/3005/3005-preview.mp3";

export const PolaroidCamera: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const [status, setStatus] = useState<'idle' | 'flashing' | 'developing' | 'done'>('idle');
  const [count, setCount] = useState(10);
  const shutterRef = useRef<HTMLAudioElement | null>(null);
  const printRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    shutterRef.current = new Audio(SHUTTER_SOUND);
    printRef.current = new Audio(PRINT_SOUND);
    shutterRef.current.volume = 0.6;
    printRef.current.volume = 0.4;
  }, []);

  const takePhoto = () => {
    if (status !== 'idle') return;
    
    // 1. Play Shutter
    shutterRef.current?.play().catch(e => console.warn("Audio blocked", e));
    
    // 2. Trigger Flash & Shake
    setStatus('flashing');
    setCount(prev => Math.max(0, prev - 1));
    
    // 3. Start Developing Animation & Sound
    setTimeout(() => {
        printRef.current?.play().catch(e => console.warn("Audio blocked", e));
        setStatus('developing');
    }, 400);
    
    // 4. Finish
    setTimeout(() => setStatus('done'), 5500); 
  };

  return (
    <div className="relative flex flex-col items-center justify-center py-2 w-full overflow-hidden min-h-[850px] md:min-h-[900px]">
       {/* Flash Overlay */}
       <AnimatePresence>
         {status === 'flashing' && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: [0, 1, 1, 0] }}
             transition={{ duration: 0.3, times: [0, 0.1, 0.5, 1] }}
             className="fixed inset-0 bg-white z-[100] pointer-events-none mix-blend-hard-light"
           />
         )}
       </AnimatePresence>

       <div className="text-center mb-6 relative z-10 px-4">
          <h3 className={`font-serif text-3xl md:text-4xl mb-4 ${isNight ? 'text-gold' : 'text-burgundy'}`}>The OneStep</h3>
          <p className={`text-[10px] tracking-[0.5em] uppercase font-bold opacity-50 ${isNight ? 'text-gray-400' : 'text-gray-600'}`}>Click the red button</p>
       </div>

       {/* Camera Container with Shake Effect */}
       <motion.div 
            animate={status === 'flashing' ? { x: [-2, 2, -2, 2, 0], y: [-1, 1, -1, 1, 0] } : {}}
            transition={{ duration: 0.1, repeat: 1 }}
            className="relative z-20 cursor-pointer perspective-1000 transform scale-90 md:scale-100 origin-center" 
            onClick={takePhoto}
        >
          {/* Camera Body (Creamy White) */}
          <div className="relative w-72 h-64 bg-[#f4f1ea] rounded-[30px] shadow-[0_30px_60px_rgba(0,0,0,0.5),inset_0_-10px_20px_rgba(0,0,0,0.1)] flex flex-col items-center pt-8 overflow-hidden border-b-[12px] border-[#dcd9d2]">
              {/* Texture Overlay */}
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/plastic-matte.png')]"></div>
              
              {/* Rainbow Stripe */}
              <div className="absolute top-[45%] left-0 w-full h-6 flex z-10 shadow-sm">
                  <div className="h-full w-full bg-[#ff3b30]"></div>
                  <div className="h-full w-full bg-[#ff9500]"></div>
                  <div className="h-full w-full bg-[#ffcc00]"></div>
                  <div className="h-full w-full bg-[#4cd964]"></div>
                  <div className="h-full w-full bg-[#007aff]"></div>
              </div>

              {/* Viewfinder & Flash Bar Area */}
              <div className="w-full px-8 flex justify-between items-start z-20">
                   {/* Viewfinder Window */}
                   <div className="w-20 h-16 bg-[#111] rounded-lg border-4 border-[#333] shadow-inner flex items-center justify-center overflow-hidden">
                        <div className="relative w-12 h-10 bg-[#080808] rounded shadow-[inset_0_2px_5px_rgba(255,255,255,0.1)]">
                            <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-blue-500/10 blur-sm"></div>
                        </div>
                   </div>
                   
                   {/* Flash Block (Simulated) */}
                   <div className="w-16 h-16 bg-[#ddd] rounded-lg border-2 border-[#ccc] flex items-center justify-center shadow-inner relative overflow-hidden">
                        <div className={`w-12 h-12 bg-white rounded-full transition-all duration-100 shadow-[0_0_10px_rgba(0,0,0,0.2)] ${status === 'flashing' ? 'brightness-[10] scale-110' : 'brightness-100'}`}></div>
                        {/* Grid texture */}
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                   </div>
              </div>

              {/* Lens Barrel (Center) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 mt-6 md:mt-4">
                  <div className="relative w-36 h-36 rounded-full bg-[#111] border-[6px] border-[#222] shadow-[0_10px_30px_rgba(0,0,0,0.6)] flex items-center justify-center">
                       {/* Inner Rings */}
                       <div className="w-28 h-28 rounded-full border border-gray-700 bg-[#080808] flex items-center justify-center shadow-inner">
                           <div className="w-20 h-20 rounded-full bg-[#050505] shadow-[inset_0_5px_20px_rgba(0,0,0,1)] relative flex items-center justify-center overflow-hidden">
                                {/* Glass Reflection */}
                                <div className="absolute top-3 right-5 w-8 h-4 bg-white/5 rounded-full rotate-45 blur-[2px]"></div>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_60%)]"></div>
                                {/* Iris */}
                                <div className="w-8 h-8 rounded-full border border-gray-800 bg-black"></div>
                           </div>
                       </div>
                       
                       {/* Focus Knob */}
                       <div className="absolute -bottom-2 w-8 h-8 rounded-full bg-[#333] border border-gray-600 shadow-md"></div>
                  </div>
              </div>

              {/* Red Shutter Button */}
              <div className="absolute top-[55%] left-8 z-30">
                  <motion.div 
                    whileTap={{ scale: 0.9 }}
                    className="w-12 h-12 rounded-full bg-[#ff3b30] shadow-[0_4px_0_#b91c1c,0_8px_10px_rgba(0,0,0,0.3)] border-2 border-[#ff6b6b] flex items-center justify-center cursor-pointer active:shadow-none active:translate-y-1 transition-all"
                  >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                  </motion.div>
              </div>

              {/* Film Counter */}
              <div className="absolute top-[58%] right-10 z-30 w-8 h-8 bg-black rounded border border-gray-600 flex items-center justify-center">
                   <span className="text-white text-xs font-mono">{count}</span>
              </div>

              {/* Front Plate (Black Bottom) */}
              <div className="absolute bottom-0 w-full h-16 bg-[#1a1a1a] z-20 flex items-center justify-center border-t-2 border-white/5">
                   <div className="text-gray-500 font-sans text-[10px] tracking-widest uppercase mb-6">Polaroid Land Camera</div>
                   {/* Ejection Slot */}
                   <div className="absolute bottom-2 w-56 h-3 bg-[#0a0a0a] rounded-sm border-t border-gray-800 shadow-[inset_0_2px_5px_rgba(0,0,0,1)]"></div>
              </div>
          </div>
       </motion.div>

       {/* Developing Photo Animation - Ejecting Downwards */}
       <div className="relative h-auto w-64 -mt-6 perspective-1000 z-10 pointer-events-none flex justify-center">
          <AnimatePresence>
            {(status === 'developing' || status === 'done') && (
               <motion.div
                  initial={{ y: -180, opacity: 0, scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 2, ease: "easeOut" }}
                  className="bg-white p-3 shadow-xl transform-gpu"
               >
                   <div className="aspect-[3.5/4.2] bg-[#111] overflow-hidden relative shadow-inner">
                       {/* The Image */}
                       <motion.img 
                          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop" 
                          className="w-full h-full object-cover"
                          initial={{ filter: "brightness(0) contrast(2) sepia(1) blur(6px)" }}
                          animate={{ filter: "brightness(1) contrast(1.05) sepia(0.2) blur(0px)" }}
                          transition={{ duration: 6, ease: "easeOut", delay: 1 }}
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                   </div>
                   <div className="mt-4 text-center pb-8">
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 3, duration: 1 }}
                        className="font-hand text-2xl text-gray-800 rotate-[-2deg]"
                      >
                        You look cute &hearts;
                      </motion.p>
                   </div>
               </motion.div>
            )}
          </AnimatePresence>
       </div>
    </div>
  );
};