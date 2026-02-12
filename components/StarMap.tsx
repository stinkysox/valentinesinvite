import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export const StarMap: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const stars = useMemo(() => {
    return [...Array(150)].map((_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
      baseOpacity: Math.random() * 0.6 + 0.2,
    }));
  }, []);

  const points = [
    { x: 50, y: 35 }, 
    { x: 30, y: 25 }, 
    { x: 25, y: 45 }, 
    { x: 50, y: 65 }, 
    { x: 75, y: 45 }, 
    { x: 70, y: 25 }, 
    { x: 50, y: 35 }, 
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-24">
       <div className="text-center mb-16 relative">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <h3 className={`font-serif text-4xl md:text-5xl mb-4 tracking-tight ${isNight ? 'text-gold' : 'text-burgundy'}`}>Written in the Stars</h3>
            <div className={`h-[1px] w-24 mx-auto ${isNight ? 'bg-gold/30' : 'bg-burgundy/30'}`}></div>
          </motion.div>
       </div>

       <div 
        className="relative aspect-[1.4/1] md:aspect-[2.2/1] w-full rounded-[40px] md:rounded-[120px] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)] border-2 transition-all duration-700 group"
        style={{ 
            background: 'linear-gradient(to bottom, #02040a, #050816, #0a0e24)',
            borderColor: isNight ? 'rgba(197, 160, 89, 0.15)' : 'rgba(74, 14, 30, 0.08)'
        }}
       >
          {/* Subtle Nebula Effect */}
          <div className="absolute inset-0 opacity-30 mix-blend-screen pointer-events-none bg-[radial-gradient(circle_at_30%_40%,rgba(139,92,246,0.1),transparent_50%),radial-gradient(circle_at_70%_60%,rgba(236,72,153,0.05),transparent_50%)]"></div>
          
          <div className="absolute inset-[-20%]">
             {stars.map((star, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    opacity: [star.baseOpacity * 0.5, star.baseOpacity, star.baseOpacity * 0.5],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: star.duration, 
                    delay: star.delay,
                    ease: "easeInOut"
                  }}
                  className="absolute rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.4)]"
                  style={{
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                  }}
                />
             ))}

             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80">
                <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    <motion.path
                        d="M50 35 L30 25 L25 45 L50 65 L75 45 L70 25 Z"
                        fill="rgba(197, 160, 89, 0.05)"
                        stroke="#C5A059"
                        strokeWidth="0.4"
                        strokeDasharray="2 2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.6 }}
                        transition={{ duration: 4, ease: "easeInOut" }}
                        filter="url(#glow)"
                    />
                    
                    {points.slice(0, 6).map((p, i) => (
                        <g key={i}>
                             <motion.circle 
                                cx={p.x} cy={p.y} r="0.8" fill="#FFF" 
                                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
                                transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                             />
                             <circle cx={p.x} cy={p.y} r="2.5" fill="rgba(197, 160, 89, 0.15)" />
                        </g>
                    ))}
                </svg>
                <div className="absolute top-[78%] w-full text-center">
                    <p className="text-[9px] text-gold tracking-[0.5em] uppercase font-serif font-bold opacity-60">Heart of the Cosmos</p>
                </div>
             </div>
          </div>

          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none"></div>
       </div>

       {/* Simplified Message */}
       <div className="mt-12 text-center">
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`font-serif text-2xl italic tracking-wide ${isNight ? 'text-gold-light/60' : 'text-burgundy/60'}`}
          >
            "Our love is written in the stars"
          </motion.p>
       </div>
    </div>
  );
};