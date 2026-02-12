import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';
import { CONTENT } from '../data/content';

export const WaxSealLetter: React.FC<{ isOpen: boolean; onOpen: () => void; isNight: boolean }> = ({ isOpen, onOpen, isNight }) => {
    const [showSecret, setShowSecret] = useState(false);
    
    return (
        <div className="relative w-full max-w-xl mx-auto perspective-1000 z-30">
            <AnimatePresence mode="wait">
                {!isOpen ? (
                    <motion.div 
                        key="envelope"
                        onClick={onOpen}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, rotateX: -90, transition: { duration: 0.5 } }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-[#f0e6d2] aspect-[1.6/1] rounded shadow-2xl relative cursor-pointer flex items-center justify-center overflow-hidden border border-[#e6dcc5]"
                    >
                         <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.1)]"></div>
                         <div className="absolute top-0 left-0 w-full h-full" style={{ clipPath: 'polygon(0 0, 50% 55%, 100% 0)' }}><div className="w-full h-full bg-[#e8deca] shadow-lg"></div></div>
                         <div className="absolute bottom-0 left-0 w-full h-full" style={{ clipPath: 'polygon(0 100%, 50% 55%, 100% 100%)' }}><div className="w-full h-full bg-[#f5ebd9]"></div></div>
                         <div className="absolute top-0 left-0 w-full h-full" style={{ clipPath: 'polygon(0 0, 0 100%, 50% 55%)' }}><div className="w-full h-full bg-[#efe5d1]"></div></div>
                         <div className="absolute top-0 right-0 w-full h-full" style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 55%)' }}><div className="w-full h-full bg-[#efe5d1]"></div></div>
                         <div className="absolute z-20 w-16 h-16 bg-red-800 rounded-full shadow-lg flex items-center justify-center border-4 border-red-900/50 group">
                             <Heart className="text-red-950 fill-red-950/20" size={24} />
                             <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/20 to-transparent pointer-events-none"></div>
                         </div>
                         <div className="absolute z-20 bottom-10 text-[#8a8170] font-serif text-sm tracking-widest uppercase opacity-70">Tap to open</div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="letter"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-[#fffefc] p-8 md:p-12 shadow-2xl relative rounded-sm mx-4 md:mx-0"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-50 pointer-events-none rounded-sm"></div>
                        <div className="relative z-10 font-serif text-charcoal">
                            <h3 className="text-2xl mb-6 font-bold text-burgundy">{CONTENT.loveLetter.greeting}</h3>
                            <p className="text-lg leading-loose whitespace-pre-line text-gray-800">{CONTENT.loveLetter.body}</p>
                            <div className="mt-12 text-right">
                                <p className="text-xl italic mb-2">{CONTENT.loveLetter.closing}</p>
                                <p className="font-hand text-4xl text-burgundy">{CONTENT.loveLetter.sender}</p>
                            </div>
                        </div>
                        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
                            <p className="text-xs uppercase tracking-widest text-gray-400 mb-4">You have a P.S.</p>
                            <button onClick={() => setShowSecret(true)} className="px-6 py-2 bg-burgundy text-cream font-serif text-sm rounded hover:bg-crimson transition-colors shadow-md">Read Secret Message</button>
                        </div>
                        
                        <SecretMessageModal isOpen={showSecret} onClose={() => setShowSecret(false)} isNight={isNight} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const SecretMessageModal: React.FC<{ isOpen: boolean; onClose: () => void; isNight: boolean }> = ({ isOpen, onClose, isNight }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className={`relative w-full max-w-sm rounded-3xl p-8 shadow-2xl overflow-hidden border ${
                            isNight ? 'bg-[#1a0a0d] border-gold/30' : 'bg-[#fffefc] border-burgundy/10'
                        }`}
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <button onClick={onClose} className={`text-2xl ${isNight ? 'text-gold' : 'text-burgundy'}`}>×</button>
                        </div>
                        <div className="relative z-10 text-center">
                            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-6 ${isNight ? 'bg-gold/10 text-gold' : 'bg-burgundy/10 text-burgundy'}`}>
                                <Heart fill="currentColor" size={24} />
                            </div>
                            <h4 className={`font-serif text-xl mb-4 font-bold ${isNight ? 'text-gold' : 'text-burgundy'}`}>A Secret for You</h4>
                            <p className={`font-serif italic text-lg leading-relaxed ${isNight ? 'text-gray-300' : 'text-gray-700'}`}>
                                "{CONTENT.secretMessage}"
                            </p>
                            <button 
                                onClick={onClose}
                                className={`mt-8 px-8 py-2 rounded-full font-serif text-sm transition-all shadow-lg ${
                                    isNight ? 'bg-gold text-burgundy hover:bg-gold-light' : 'bg-burgundy text-cream hover:bg-crimson'
                                }`}
                            >
                                Forever & Always
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const RealisticCandle: React.FC = () => {
    const [lit, setLit] = useState(true);
    return (
        <div className="relative w-28 h-40 mx-auto group cursor-pointer flex flex-col items-center translate-y-8" onClick={() => setLit(!lit)}>
            {/* Flame and Glow */}
            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 transition-opacity duration-700 z-30 ${lit ? 'opacity-100' : 'opacity-0'}`}>
                {/* Core Flame Layers */}
                <div className="relative w-6 h-12">
                    {/* Outer Glow */}
                    <div className="absolute inset-[-20px] bg-orange-500/20 rounded-full blur-[25px] animate-pulse"></div>
                    <div className="absolute inset-[-10px] bg-orange-300/30 rounded-full blur-[15px] animate-flicker"></div>
                    
                    {/* Main Flame */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-10 bg-gradient-to-t from-orange-600 via-yellow-400 to-white/90 rounded-[50%_50%_20%_20%] blur-[1px] animate-flicker origin-bottom shadow-[0_0_15px_rgba(251,191,36,0.6)]"></div>
                    
                    {/* Blue Base */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2.5 h-3 bg-blue-500/60 rounded-full blur-[2px] z-10"></div>
                </div>
            </div>

            {/* Smoke Effect when extinguished */}
            {!lit && (
                <motion.div 
                    initial={{ opacity: 0, y: 0, scale: 0.5 }}
                    animate={{ opacity: [0, 0.4, 0], y: -60, scale: [0.5, 1.2, 1.5], x: [0, 10, -10, 5] }}
                    transition={{ duration: 3, ease: "easeOut" }}
                    className="absolute -top-12 left-1/2 -translate-x-1/2 pointer-events-none z-20"
                >
                    <svg width="40" height="60" viewBox="0 0 40 60" className="filter blur-[2px] opacity-40">
                        <path d="M20,50 Q25,40 15,30 T20,10" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
                    </svg>
                </motion.div>
            )}

            {/* Candle Body */}
            <div className="w-16 h-32 relative group-hover:scale-[1.02] transition-transform duration-500">
                {/* Main Wax Cylinder */}
                <div className="w-full h-full bg-gradient-to-r from-[#fdfbf7] via-[#f1e6d0] to-[#e8dec5] rounded-md shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] relative overflow-hidden border-x border-white/20">
                    {/* Translucent Rim */}
                    <div className="absolute top-0 w-full h-4 bg-gradient-to-b from-white/90 to-transparent z-10"></div>
                    
                    {/* Wax Drips */}
                    <div className="absolute top-0 left-3 w-2.5 h-12 bg-white/40 rounded-full blur-[1px]"></div>
                    <div className="absolute top-0 right-4 w-2 h-8 bg-white/30 rounded-full blur-[1px]"></div>

                    {/* Internal Wick */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 bg-[#111] rounded-t-full"></div>
                </div>

                {/* Top Concavity */}
                <div className="absolute -top-1 left-0 w-full h-4 bg-[#fdfbf7] rounded-[50%] shadow-[inset_0_4px_8px_rgba(0,0,0,0.15)] border-t border-white/20 z-0">
                    {lit && <div className="absolute inset-1.5 bg-yellow-100/30 rounded-full blur-sm animate-pulse"></div>}
                </div>
            </div>

            {/* Base Shadow */}
            <div className="mt-1 w-24 h-3 bg-black/20 rounded-[50%] blur-lg opacity-40 translate-y-1"></div>
        </div>
    )
}