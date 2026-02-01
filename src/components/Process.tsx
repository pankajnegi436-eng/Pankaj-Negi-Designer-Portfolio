
import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Context',
    description: 'Understanding the core message before a single frame is created. Restraint starts with defining what doesn’t need to be said.',
  },
  {
    title: 'Static Design',
    description: 'Building the visual foundation. I spend more time perfecting the balance of the static image to ensure the motion has meaning.',
  },
  {
    title: 'Animation',
    description: 'The execution of movement. Every keyframe is a decision, every easing curve is calibrated for natural rhythm.',
  },
  {
    title: 'Refinement',
    description: 'The "fixing details" stage. This is where most of the time is spent—cleaning up the motion so the viewer only sees the message.',
  }
];

const Process: React.FC = () => {
  return (
    <section id="process" className="py-32 md:py-64 px-6 md:px-12 bg-white text-black overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="mb-24">
          <h2 className="text-xs uppercase tracking-[0.3em] text-black/30 mb-4">Methodology</h2>
          <h3 className="text-5xl md:text-7xl font-serif tracking-tighter">The <span className="italic">Process</span> of Less</h3>
        </div>

        <div className="space-y-12 md:space-y-0">
          {steps.map((step, idx) => (
            <motion.div 
              key={step.title}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group flex flex-col md:flex-row md:items-center py-12 md:py-20 border-b border-black/10 last:border-0"
            >
              <div className="md:w-1/4 mb-4 md:mb-0">
                <span className="text-6xl font-serif italic text-black/5 group-hover:text-black/20 transition-colors">0{idx + 1}</span>
              </div>
              <div className="md:w-1/4">
                <h4 className="text-2xl md:text-3xl font-bold uppercase tracking-tighter">{step.title}</h4>
              </div>
              <div className="md:w-2/4">
                <p className="text-lg md:text-xl text-black/60 font-light leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
