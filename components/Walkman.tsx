import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Square, SkipBack, SkipForward } from 'lucide-react';

export const Walkman: React.FC<{ isPlaying: boolean; togglePlay: () => void; isNight: boolean }> = ({ isPlaying, togglePlay, isNight }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCounter(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatCounter = (count: number) => {
    return count.toString().padStart(3, '0');
  };

  return (
    <div className="relative group perspective-1000">
      <motion.div 
        className={`relative w-80 h-56 rounded-2xl shadow-[0_30px_60px_-12px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10 flex flex-col overflow-hidden transition-colors duration-700 ${isNight ? 'bg-[#1a1a1a]' : 'bg-[#bfc3c9]'}`}
        whileHover={{ rotateX: 3, rotateY: 3 }}
      >
        {/* Grainy Metal Texture Overlay */}
        <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/brushed-alum.png')]"></div>
        
        {/* Realistic Gradients */}
        <div className={`absolute inset-0 opacity-90 transition-colors duration-700 ${isNight 
          ? 'bg-gradient-to-br from-[#2a2a2a] via-[#1a1a1a] to-[#0a0a0a]' 
          : 'bg-gradient-to-br from-[#e0e2e5] via-[#bfc3c9] to-[#9da1a8]'}`}></div>

        {/* Top Branding & Indicators */}
        <div className="absolute top-0 w-full h-10 bg-[#222] flex items-center px-4 gap-4 shadow-lg z-30 border-b border-white/5">
            <div className="text-[9px] text-[#C5A059] tracking-[.3em] font-bold font-sans">VINTAGE STEREO</div>
            <div className="flex-1 h-[1px] bg-white/10"></div>
            <div className="flex items-center gap-3">
                <div className="flex flex-col items-center">
                    <span className="text-[6px] text-white/40 mb-1">REC</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]' : 'bg-red-900/30'}`}></div>
                </div>
                <div className="bg-black/40 px-2 py-0.5 rounded border border-white/5 shadow-inner">
                    <span className="text-[10px] font-mono text-red-500/80 tracking-tighter">{formatCounter(counter)}</span>
                </div>
            </div>
        </div>

        {/* Cassette Window Area */}
        <div className="relative mx-auto mt-14 w-68 h-32 bg-[#0a0a0a] rounded-lg border-[3px] border-[#333] shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
            {/* Glass Glare */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none z-30"></div>
            
            {/* The Cassette */}
            <div className="w-[92%] h-[88%] bg-[#1a1a1a] rounded-sm flex items-center justify-between px-5 relative shadow-2xl border border-white/5">
                {/* Cassette Label */}
                <div className={`absolute top-1 left-1.5 right-1.5 bottom-1 rounded-sm z-0 transition-colors duration-700 ${isNight ? 'bg-gradient-to-b from-[#4A0E1E] to-[#1a050a]' : 'bg-gradient-to-b from-[#f9f4e8] to-[#e6dac0]'}`}>
                    <div className="absolute top-1 left-2 space-y-0.5">
                        <div className="w-8 h-[1px] bg-black/20"></div>
                        <div className="w-12 h-[1px] bg-black/10"></div>
                    </div>
                    <div className="absolute bottom-1.5 left-0 w-full text-center">
                        <span className={`text-[9px] font-serif italic tracking-widest ${isNight ? 'text-white/40' : 'text-burgundy/40'}`}>Valentine Mix Vol. 1</span>
                    </div>
                </div>

                {/* Left Reel */}
                <div className="relative z-10 flex flex-col items-center">
                    <motion.div 
                        animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="w-12 h-12 rounded-full border-[3px] border-[#222] bg-[#333] flex items-center justify-center relative shadow-md overflow-hidden"
                    >
                         <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#222,#444,#222)] opacity-50"></div>
                         <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center">
                             {[0, 60, 120, 180, 240, 300].map(deg => (
                                 <div key={deg} className="absolute w-1 h-3 bg-[#444] rounded-full" style={{ transform: `rotate(${deg}deg) translateY(-3px)` }}></div>
                             ))}
                         </div>
                    </motion.div>
                </div>

                {/* Tape Center View (Waveform) */}
                <div className="w-20 h-8 bg-[#0a0a0a]/80 backdrop-blur-[1px] border-y border-white/10 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,rgba(255,255,255,0.02)_4px,rgba(255,255,255,0.02)_5px)]"></div>
                    <div className="flex gap-0.5">
                        {[...Array(12)].map((_, i) => (
                           <motion.div 
                             key={i} 
                             animate={isPlaying ? { height: [3, 8, 4, 3] } : { height: 3 }} 
                             transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.05 }} 
                             className="w-[2px] bg-gold/50 rounded-full"
                             style={{ opacity: isPlaying ? 1 : 0.3 }}
                           />
                        ))}
                    </div>
                </div>

                {/* Right Reel */}
                <div className="relative z-10 flex flex-col items-center">
                    <motion.div 
                        animate={isPlaying ? { rotate: [0, 360] } : { rotate: 0 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                        className="w-12 h-12 rounded-full border-[3px] border-[#222] bg-[#333] flex items-center justify-center relative shadow-md overflow-hidden"
                    >
                         <div className="absolute inset-0 bg-[conic-gradient(from_0deg,#222,#444,#222)] opacity-50"></div>
                         <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center">
                             {[0, 60, 120, 180, 240, 300].map(deg => (
                                 <div key={deg} className="absolute w-1 h-3 bg-[#444] rounded-full" style={{ transform: `rotate(${deg}deg) translateY(-3px)` }}></div>
                             ))}
                         </div>
                    </motion.div>
                </div>
            </div>
        </div>

        {/* Mechanical Buttons Section */}
        <div className={`mt-auto w-full h-16 border-t border-black/20 flex px-6 items-center justify-between shadow-[inset_0_1px_4px_rgba(255,255,255,0.1)] ${isNight ? 'bg-[#222]' : 'bg-[#d1d5db]'}`}>
            <div className="flex h-full py-2 items-center">
                <WalkmanButton 
                    onClick={togglePlay} 
                    active={isPlaying} 
                    icon={isPlaying ? <Pause size={20} /> : <Play size={20} />} 
                    label={isPlaying ? "PAUSE" : "PLAY"}
                    large 
                />
            </div>
            
            <div className="flex flex-col items-end opacity-40">
                <span className="text-[7px] font-bold tracking-tighter leading-none text-current">HIGH RESOLUTION</span>
                <span className="text-[10px] font-black italic tracking-tighter text-current">DOLBY SYSTEM</span>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

interface WalkmanButtonProps {
    onClick: () => void;
    icon: React.ReactNode;
    label?: string;
    active?: boolean;
    large?: boolean;
}

const WalkmanButton: React.FC<WalkmanButtonProps> = ({ onClick, icon, label, active, large }) => (
    <motion.button 
        whileTap={{ y: 2, scale: 0.98 }}
        onClick={onClick}
        className={`${large ? 'min-w-[100px] h-11 px-4' : 'w-11 h-10'} rounded-lg shadow-[0_4px_0_rgba(0,0,0,0.3)] flex items-center justify-center transition-all relative border border-white/10 ${
            active 
            ? 'bg-gradient-to-b from-[#C5A059] to-[#997B3D] translate-y-0.5 shadow-[0_1px_0_rgba(0,0,0,0.2)]' 
            : 'bg-gradient-to-b from-[#f3f4f6] to-[#9ca3af] hover:from-[#fff] hover:to-[#cbd5e1]'
        }`}
    >
        <div className={`flex items-center justify-center gap-2 ${active ? 'text-white' : 'text-gray-700'}`}>
            {icon}
            {large && label && <span className="font-serif text-[11px] font-black tracking-[0.2em]">{label}</span>}
        </div>
        {!active && <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 rounded-lg pointer-events-none"></div>}
    </motion.button>
);