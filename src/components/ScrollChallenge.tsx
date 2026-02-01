
import React, { useRef, useState, useEffect } from 'react';
// Added AnimatePresence to the imports from framer-motion
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const words = ["TIMING", "SPACING", "WEIGHT", "RHYTHM", "BALANCE", "PRECISION"];

const ScrollChallenge: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [accuracy, setAccuracy] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [offset, setOffset] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to a wider range for movement
  const yTranslate = useTransform(scrollYProgress, [0, 1], ["20%", "-80%"]);

  useEffect(() => {
    const updateAccuracy = () => {
      if (!containerRef.current) return;
      
      const viewportHeight = window.innerHeight;
      const center = viewportHeight / 2;
      
      // Get all word elements
      const elements = containerRef.current.querySelectorAll('.challenge-word');
      let bestDiff = Infinity;

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const diff = Math.abs(center - elCenter);
        if (diff < bestDiff) {
          bestDiff = diff;
        }
      });

      // Accuracy: 100% at 0 diff, 0% at 200px+ diff
      const newOffset = Math.round(bestDiff);
      const newAcc = Math.max(0, 100 - (bestDiff / 2));
      
      setOffset(newOffset);
      setAccuracy(Math.round(newAcc));
      
      if (newAcc > 99) {
        setIsLocked(true);
      } else {
        setIsLocked(false);
      }
    };

    window.addEventListener('scroll', updateAccuracy);
    updateAccuracy();
    return () => window.removeEventListener('scroll', updateAccuracy);
  }, []);

  return (
    <section 
      ref={containerRef} 
      id="focus"
      className="relative h-[400vh] bg-[#0a0a0a] border-t border-white/5"
    >
      {/* Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
        />

        {/* Challenge UI Overlays */}
        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">System Status</p>
              <p className="text-xs font-mono text-white/60">SPATIAL_CALIBRATION_v2.0</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Accuracy</p>
              <motion.p 
                className={`text-2xl font-mono ${accuracy > 90 ? 'text-red-500' : 'text-white'}`}
              >
                {accuracy}%
              </motion.p>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30">Offset</p>
              <p className="text-xl font-mono text-white/60">{offset}px</p>
            </div>
            <div className="max-w-xs text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2">Objective</p>
              <p className="text-xs text-white/40 leading-relaxed uppercase tracking-widest">
                Scroll to align the core principles within the focal plane. 100% precision required.
              </p>
            </div>
          </div>
        </div>

        {/* The Viewfinder */}
        <div className="relative w-full max-w-4xl h-32 md:h-48 flex items-center justify-center">
          {/* Alignment Lines */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-white/10" />
          <div className="absolute inset-x-0 bottom-0 h-[1px] bg-white/10" />
          
          {/* Target Line (The Laser) */}
          <motion.div 
            animate={{ 
              backgroundColor: accuracy > 95 ? "#ef4444" : "rgba(255,255,255,0.2)",
              scaleX: accuracy > 95 ? 1 : 0.8,
              opacity: accuracy > 95 ? 1 : 0.5
            }}
            className="absolute inset-x-0 top-1/2 h-[1px] -translate-y-1/2 z-20"
          />

          {/* Viewfinder Corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/40" />

          {/* Scrolling Content */}
          <motion.div 
            style={{ y: yTranslate }}
            className="flex flex-col items-center gap-64 md:gap-96 py-[50vh]"
          >
            {words.map((word, i) => (
              <motion.div
                key={word}
                className="challenge-word text-6xl md:text-9xl font-serif tracking-tighter transition-all duration-300"
                animate={{
                  opacity: accuracy > 90 ? 1 : 0.2,
                  scale: accuracy > 98 ? 1.05 : 1,
                  fontStyle: accuracy > 98 ? 'italic' : 'normal',
                }}
              >
                {word}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Lock Indicator */}
        <AnimatePresence>
          {isLocked && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="absolute bottom-32 px-6 py-2 border border-red-500 bg-red-500/10 backdrop-blur-md rounded-full"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-500">
                Position Locked • Calibrated
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Background Section Labels */}
      <div className="absolute top-0 left-12 h-full flex flex-col justify-between py-24 pointer-events-none">
        <span className="text-[10rem] font-serif italic text-white/[0.02] rotate-90 origin-left">SPATIAL</span>
        <span className="text-[10rem] font-serif italic text-white/[0.02] rotate-90 origin-left">DISCIPLINE</span>
      </div>
    </section>
  );
};

export default ScrollChallenge;
