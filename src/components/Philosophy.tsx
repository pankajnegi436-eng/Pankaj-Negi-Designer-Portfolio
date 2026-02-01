
import React from 'react';
import { motion } from 'framer-motion';

const Philosophy: React.FC = () => {
  return (
    <section id="philosophy" className="py-32 md:py-64 px-6 md:px-24 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24">
        <div className="md:w-1/3">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.3em] text-white/30 sticky top-32"
          >
            Philosophy & Restraint
          </motion.h2>
        </div>
        <div className="md:w-2/3 space-y-16">
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif italic leading-tight text-white/90"
          >
            “I’m Pankaj Negi, a Motion Designer who spends more time fixing details than showing off ideas.”
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-12 text-lg md:text-xl text-white/60 font-light max-w-2xl leading-relaxed"
          >
            <p>
              Most of my work is about restraint. I remove more than I add, because not everything needs to move. When something does move, it’s because I decided it should.
            </p>
            <p>
              Progress comes from repetition, discipline, and accepting that good work takes longer than expected.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-white/10"
          >
            {[
              { label: 'Focus', value: 'Details' },
              { label: 'Method', value: 'Restraint' },
              { label: 'Philosophy', value: 'Discipline' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">{stat.label}</p>
                <p className="text-xl font-medium">{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
