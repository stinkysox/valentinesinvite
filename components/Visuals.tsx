import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export const FairyLights: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-24 overflow-hidden pointer-events-none z-20">
      <svg className="w-[120%] -ml-[10%] h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
        <path d="M0,0 Q600,100 1200,0" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
      </svg>
      <div className="absolute top-0 left-0 w-[120%] -ml-[10%] h-full flex justify-between px-12">
         {[...Array(12)].map((_, i) => (
            <div key={i} className="relative" style={{ top: Math.sin(i / 11 * Math.PI) * 45 + 'px' }}>
                <div className={`w-3 h-3 rounded-full bg-[#fdf4dc] shadow-[0_0_15px_4px_rgba(253,244,220,0.6)] animate-flicker`} style={{ animationDelay: `${Math.random() * 2}s` }}></div>
                <div className="w-[1px] h-2 bg-gray-400 absolute -top-2 left-1/2 -translate-x-1/2"></div>
            </div>
         ))}
      </div>
    </div>
  );
};

export const DayNightToggle: React.FC<{ isNight: boolean; toggle: () => void }> = ({ isNight, toggle }) => {
  return (
    <button 
      onClick={toggle}
      className={`fixed top-6 right-6 z-50 p-3 rounded-full shadow-xl transition-all duration-500 border border-white/20 ${isNight ? 'bg-indigo-950 text-gold' : 'bg-orange-100 text-orange-500'}`}
    >
      <AnimatePresence mode="wait">
        {isNight ? (
          <motion.div key="moon" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
            <Moon size={20} fill="currentColor" />
          </motion.div>
        ) : (
          <motion.div key="sun" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
            <Sun size={20} fill="currentColor" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export const RealisticConfetti: React.FC = () => {
  // Generate particles with random physics properties
  const particles = Array.from({ length: 150 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100 - 50, // spread relative to center
    y: Math.random() * -100 - 50, // upward velocity
    r: Math.random() * 360, // initial rotation
    scale: Math.random() * 0.6 + 0.4,
    color: ['#C5A059', '#4A0E1E', '#FFFFFF', '#D4AF37'][Math.floor(Math.random() * 4)],
    shape: Math.random() > 0.5 ? '50%' : '0%', // Circle or square
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0 }}
          animate={{ 
            x: p.x * (Math.random() * 10 + 5), // Explode outward width
            y: [0, p.y * 3, window.innerHeight], // Go up then fall down
            rotate: [0, p.r, p.r + 720], // Spin wildly
            opacity: [1, 1, 0],
            scale: p.scale 
          }}
          transition={{ 
            duration: Math.random() * 2 + 2, // 2-4 seconds
            ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for explosion physics
            times: [0, 0.2, 1] 
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '10px',
            backgroundColor: p.color,
            borderRadius: p.shape,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}
        />
      ))}
    </div>
  );
};

export const SectionDivider: React.FC<{ isNight: boolean }> = ({ isNight }) => (
  <div className="w-full flex justify-center py-4 opacity-30">
    <div className={`h-px w-24 ${isNight ? 'bg-gold' : 'bg-burgundy'}`}></div>
    <div className={`mx-4 ${isNight ? 'text-gold' : 'text-burgundy'}`}>❦</div>
    <div className={`h-px w-24 ${isNight ? 'bg-gold' : 'bg-burgundy'}`}></div>
  </div>
);