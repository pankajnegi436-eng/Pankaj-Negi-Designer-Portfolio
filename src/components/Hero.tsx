
import React from 'react';
import { motion, Variants, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const InkLetter = ({ char, index }: { char: string; index: number }) => {
  const variant: Variants = {
    initial: { 
      color: "rgba(255, 255, 255, 1)", 
      scale: 1, 
      y: 0, 
      rotate: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    },
    hover: { 
      color: "#ef4444", 
      scale: 1.2,
      y: -12,
      rotate: index % 2 === 0 ? 3 : -3,
      filter: "blur(0.5px)",
      transition: { 
        duration: 0.3, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <motion.span 
      variants={variant}
      initial="initial"
      whileHover="hover"
      className="inline-block origin-bottom cursor-none"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
};

const InkTextHero = ({ text, italicPart, className }: { text: string; italicPart?: string; className?: string }) => {
  const letters = text.split("");
  const italicLetters = italicPart ? italicPart.split("") : [];
  
  return (
    <div className={`text-6xl md:text-9xl font-serif leading-[0.9] tracking-tighter mb-12 select-none cursor-none ${className}`}>
      <span className="inline-block">
        {letters.map((char, i) => (
          <InkLetter key={i} char={char} index={i} />
        ))}
      </span>
      {" "}
      <span className="italic inline-block">
        {italicLetters.map((char, i) => (
          <InkLetter key={`italic-${i}`} char={char} index={i + letters.length} />
        ))}
      </span>
    </div>
  );
};

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, 150]);
  
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 45]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -30]);
  
  const scale1 = useTransform(scrollY, [0, 1000], [1, 1.2]);
  
  const contentY = useTransform(scrollY, [0, 1000], [0, -100]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center px-6 md:px-24 overflow-hidden bg-[#0a0a0a]">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div 
          style={{ y: y1, rotate: rotate1, scale: scale1 }}
          className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-white/5 blur-[120px] rounded-full" 
        />
        <motion.div 
          style={{ y: y2, rotate: rotate2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-white/5 blur-[100px] rounded-full" 
        />
        <motion.div 
          style={{ y: y3 }}
          className="absolute top-[20%] left-[10%] w-[30%] h-[30%] bg-red-600/5 blur-[80px] rounded-full" 
        />
      </div>

      <motion.div 
        style={{ y: contentY }}
        className="z-10 text-center max-w-4xl"
      >
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xs md:text-sm uppercase tracking-[0.4em] text-white/40 mb-8"
        >
          Motion Designer & Visual Architect
        </motion.p>
        
        <InkTextHero text="Pankaj" italicPart="Negi" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="flex justify-center"
        >
          <div className="w-[1px] h-24 bg-gradient-to-b from-white/60 to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 100] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" as const }}
              className="absolute top-0 left-0 w-full h-1/2 bg-white"
            />
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        style={{ opacity: contentOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 animate-bounce"
      >
        <ArrowDown className="w-5 h-5" />
      </motion.div>
    </section>
  );
};

export default Hero;
