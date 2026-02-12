import React from 'react';
import { motion } from 'framer-motion';

export const TimelineItem: React.FC<{ data: { date: string, title: string, desc: string }, index: number; isNight: boolean }> = ({ data, index, isNight }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className={`flex w-full mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center justify-center gap-8`}
        >
            <div className={`w-5/12 text-${index % 2 === 0 ? 'right' : 'left'}`}>
                <h4 className={`font-serif text-2xl ${isNight ? 'text-gold' : 'text-burgundy'}`}>{data.title}</h4>
                <p className="text-crimson font-bold text-sm tracking-widest mt-1 mb-2">{data.date}</p>
                <p className={`${isNight ? 'text-gray-300' : 'text-gray-600'} font-light text-sm md:text-base`}>{data.desc}</p>
            </div>
            <div className="relative w-4 h-4 rounded-full bg-burgundy shadow-[0_0_0_4px_rgba(245,230,211,1)] z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-burgundy/20 rounded-full animate-pulse"></div>
            </div>
            <div className="w-5/12"></div>
        </motion.div>
    )
}