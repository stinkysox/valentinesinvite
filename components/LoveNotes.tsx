import React, { useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Ticket, Star } from 'lucide-react';
import { CONTENT } from '../data/content';

const Balloons: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const balloonCount = 8; // Slightly more for effect
  const balloons = useMemo(() => {
    const colors = isNight 
      ? ['rgba(255,255,255,0.4)', 'rgba(212,175,55,0.4)', 'rgba(255,255,255,0.2)', 'rgba(255,215,0,0.2)'] // Brighter Translucent for Night
      : ['#72383D', '#A64D59', '#D98E99', '#C5A059']; 

    return [...Array(balloonCount)].map((_, i) => ({
      id: i,
      size: Math.random() * 40 + 70, 
      left: Math.random() * 90 + 5, // Keep within bounds
      delay: Math.random() * 15,
      duration: 35 + Math.random() * 20, // Slower rise
      color: colors[Math.floor(Math.random() * colors.length)],
      swing: 10 + Math.random() * 15
    }));
  }, [isNight]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {balloons.map((b) => (
        <motion.div
            key={b.id}
            initial={{ y: "100%", opacity: 0 }} // Start from bottom
            animate={{ 
                y: "-120%",  // Go up past the top
                opacity: [0, 0.6, 0.6, 0], // Fade in/out
                x: [0, b.swing, -b.swing, b.swing/2, 0]
            }}
            transition={{ 
                duration: b.duration, 
                repeat: Infinity, 
                delay: b.delay,
                ease: "linear"
            }}
            className="absolute flex flex-col items-center"
            style={{ 
                left: `${b.left}%`,
                mixBlendMode: isNight ? 'plus-lighter' : 'normal' // Glow effect in night
            }}
        >
            {/* Balloon Body */}
            <div 
                className="rounded-[50%_50%_50%_50%/40%_40%_60%_60%] relative"
                style={{
                    width: b.size,
                    height: b.size * 1.25,
                    background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.4) 0%, transparent 10%, ${b.color} 40%, ${isNight ? 'transparent' : 'rgba(0,0,0,0.1)'} 100%)`, 
                    border: '1px solid rgba(255,255,255,0.1)',
                    opacity: isNight ? 0.4 : 0.9 
                }}
            >
                {/* Shine Highlight */}
                <div className="absolute top-[15%] left-[20%] w-[15%] h-[20%] bg-white/30 rounded-full blur-[1px]"></div>
            </div>
            
            {/* Balloon String */}
            <div className={`w-[0.5px] h-32 ${isNight ? 'bg-white/10' : 'bg-burgundy/10'}`}></div>
        </motion.div>
      ))}
    </div>
  );
};

export const ReasonsGrid: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const containerRef = React.useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const [revealedIdx, setRevealedIdx] = React.useState<number[]>([]);

  const toggleReveal = (idx: number) => {
    if (revealedIdx.includes(idx)) {
        setRevealedIdx(revealedIdx.filter(i => i !== idx));
    } else {
        setRevealedIdx([...revealedIdx, idx]);
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-6xl mx-auto px-4 py-20 relative min-h-[900px]">
      <div className="absolute inset-0 z-[-1]">
        {isInView && <Balloons isNight={isNight} />}
      </div>
      
      <div className="text-center mb-16 relative z-10">
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className={`font-serif text-4xl md:text-5xl mb-4 ${isNight ? 'text-gold' : 'text-burgundy'}`}
        >
          Why I Love You
        </motion.h3>
        <p className={`text-[10px] tracking-[0.4em] uppercase opacity-50 font-bold ${isNight ? 'text-gray-400' : 'text-gray-600'}`}>
          Tap a heart to reveal a reason
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-12 relative z-10 place-items-center">
        {CONTENT.reasons.map((reason, i) => {
          const isRevealed = revealedIdx.includes(i);
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: (i % 4) * 0.1 }}
              className="relative w-full max-w-[180px] md:max-w-none"
              onClick={() => toggleReveal(i)}
            >
              <div className="perspective-1000 w-full aspect-square cursor-pointer">
                <motion.div 
                  animate={{ rotateY: isRevealed ? 180 : 0 }}
                  transition={{ duration: 0.8, type: "spring", stiffness: 60, damping: 12 }}
                  className="relative w-full h-full transform-style-3d"
                >
                  {/* Front: Premium Heart Card */}
                  <div className={`absolute inset-0 backface-hidden rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.1)] flex items-center justify-center p-6 border backdrop-blur-sm transition-all duration-500 ${
                    isNight 
                    ? 'bg-white/5 border-gold/20' 
                    : 'bg-white/40 border-burgundy/10'
                  }`}>
                    <div className="relative">
                      <Heart 
                        className={`w-12 h-12 transition-all duration-500 ${
                          isNight ? 'text-gold/30' : 'text-burgundy/20'
                        } ${isRevealed ? 'opacity-0' : 'opacity-100'}`} 
                        strokeWidth={1}
                      />
                      <motion.div 
                        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                        className={`absolute inset-0 blur-xl rounded-full ${isNight ? 'bg-gold' : 'bg-burgundy'}`}
                      ></motion.div>
                    </div>
                    <span className={`absolute bottom-4 text-[9px] tracking-[0.2em] font-bold uppercase opacity-30 ${isNight ? 'text-gold' : 'text-burgundy'}`}>
                      Tap to open
                    </span>
                  </div>

                  {/* Back: The Reason Revealed */}
                  <div className={`absolute inset-0 backface-hidden rotate-y-180 rounded-2xl shadow-2xl flex items-center justify-center p-6 text-center border-2 transition-all duration-500 ${
                    isNight 
                    ? 'bg-gradient-to-br from-gold/90 to-gold text-burgundy border-white/20' 
                    : 'bg-gradient-to-br from-burgundy to-[#5a111a] text-cream border-white/10'
                  }`}>
                     <div className="absolute inset-2 border border-current opacity-10 rounded-xl"></div>
                     <p className="font-serif text-base md:text-lg font-bold leading-tight italic">
                       "{reason}"
                     </p>
                  </div>
                </motion.div>
              </div>
              
              {/* Floating Sparkles for revealed cards */}
              {isRevealed && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -top-4 -right-4 pointer-events-none"
                >
                  <Star className="text-gold animate-pulse" size={16} />
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export const Coupons: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 my-20">
      <h3 className={`text-center font-serif text-3xl mb-12 ${isNight ? 'text-gold' : 'text-burgundy'}`}>
        Love Coupons
      </h3>
      <div className="flex flex-col gap-6">
        {CONTENT.coupons.map((coupon, i) => (
          <motion.div 
            key={i}
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ delay: i * 0.2 }}
            className={`relative flex items-center p-6 rounded-lg border-2 border-dashed ${isNight ? 'border-gold/30 bg-white/5' : 'border-burgundy/20 bg-white/50'}`}
          >
             <div className={`p-4 rounded-full mr-6 ${isNight ? 'bg-gold/20 text-gold' : 'bg-burgundy/10 text-burgundy'}`}>
               <Ticket size={24} />
             </div>
             <div>
               <h4 className={`font-serif text-xl font-bold ${isNight ? 'text-gold' : 'text-burgundy'}`}>{coupon.title}</h4>
               <p className={`text-sm ${isNight ? 'text-gray-400' : 'text-gray-600'}`}>{coupon.desc}</p>
             </div>
             <div className="ml-auto opacity-50">
               <Star size={16} className={isNight ? 'text-gold' : 'text-burgundy'} />
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};