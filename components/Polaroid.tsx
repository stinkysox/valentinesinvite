import React from 'react';
import { motion } from 'framer-motion';
import { PhotoData } from '../types';

export const Polaroid: React.FC<{ photo: PhotoData; index: number }> = ({ photo, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0, rotate: photo.rotation }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay: index * 0.15, type: "spring", bounce: 0.4 }}
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 40, transition: { duration: 0.3 } }}
      className="relative group cursor-pointer"
    >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-10 bg-white/20 backdrop-blur-sm shadow-sm rotate-3 z-20 border-l border-r border-white/30 opacity-60"></div>
        <div className="bg-white p-3 pb-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] w-64 md:w-72 relative">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-20 pointer-events-none"></div>
             <div className="aspect-[4/5] overflow-hidden bg-gray-100 mb-4 relative">
                <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] pointer-events-none z-10"></div>
                <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover filter brightness-[1.02] contrast-[1.05] sepia-[0.1]" />
             </div>
             <p className="font-hand text-2xl text-center text-charcoal/80 transform -rotate-1 min-h-[1.5em]">{photo.caption}</p>
        </div>
    </motion.div>
  );
};