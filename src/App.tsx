
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, Variants, MotionValue } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import Process from './components/Process';
import WorkGrid from './components/WorkGrid';
import RhythmGame from './components/RhythmGame';
import ScrollChallenge from './components/ScrollChallenge';
import Footer from './components/Footer';

interface CursorDotProps {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  damping: number;
  stiffness: number;
  size: number;
  opacity: number;
}

const CursorDot: React.FC<CursorDotProps> = ({ 
  mouseX, 
  mouseY, 
  damping, 
  stiffness, 
  size, 
  opacity 
}) => {
  const smoothX = useSpring(mouseX, { damping, stiffness });
  const smoothY = useSpring(mouseY, { damping, stiffness });

  return (
    <motion.div
      className="fixed top-0 left-0 bg-red-600 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: smoothX,
        y: smoothY,
        width: size,
        height: size,
        opacity,
        translateX: '-50%',
        translateY: '-50%',
      }}
    />
  );
};

const CustomCursor = () => {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      <CursorDot mouseX={mouseX} mouseY={mouseY} damping={20} stiffness={300} size={16} opacity={1} />
      <CursorDot mouseX={mouseX} mouseY={mouseY} damping={25} stiffness={200} size={14} opacity={0.4} />
      <CursorDot mouseX={mouseX} mouseY={mouseY} damping={30} stiffness={150} size={12} opacity={0.2} />
      <CursorDot mouseX={mouseX} mouseY={mouseY} damping={35} stiffness={100} size={10} opacity={0.1} />
      <CursorDot mouseX={mouseX} mouseY={mouseY} damping={40} stiffness={80} size={8} opacity={0.05} />
    </>
  );
};

const InkText = ({ text, className }: { text: string; className?: string }) => {
  const letters = text.split("");

  const letterVariant: Variants = {
    initial: { 
      color: "rgba(255, 255, 255, 1)",
      scale: 1,
      y: 0,
      rotate: 0,
      filter: "blur(0px)",
      textShadow: "0px 0px 0px rgba(239, 68, 68, 0)",
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: (i: number) => ({ 
      color: "#ef4444", 
      scale: 1.12, 
      y: -6, 
      rotate: i % 2 === 0 ? 1.5 : -1.5,
      filter: "blur(0.8px)", 
      textShadow: "0px 0px 25px rgba(239, 68, 68, 0.7)",
      transition: { 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      }
    })
  };

  return (
    <div className={`inline-flex items-baseline cursor-none select-none ${className}`}>
      {letters.map((char, i) => (
        <motion.span 
          key={i} 
          custom={i}
          initial="initial"
          whileHover="hover"
          variants={letterVariant}
          className="inline-block origin-bottom px-[1px] cursor-none"
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { label: 'Work', href: '#work' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Process', href: '#process' },
    { label: 'Rhythm', href: '#rhythm' },
    { label: 'Focus', href: '#focus' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a]">
      <CustomCursor />
      
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 md:px-12 py-6 flex justify-between items-center ${
          scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="text-xl font-bold tracking-tighter">
          <InkText text="PANKAJ NEGI" />
        </div>
        
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <a 
              key={item.label} 
              href={item.href} 
              className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-none"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button onClick={toggleMenu} className="md:hidden text-white cursor-none">
          <Menu className="w-6 h-6" />
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#0a0a0a] flex flex-col justify-center items-center"
          >
            <button 
              onClick={toggleMenu} 
              className="absolute top-8 right-8 p-2 hover:bg-white/10 rounded-full transition-colors cursor-none text-white"
            >
              <X className="w-8 h-8" />
            </button>
            <div className="flex flex-col space-y-8 items-center text-center">
              {menuItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  onClick={toggleMenu}
                  className="text-4xl font-serif tracking-tight text-white hover:italic hover:text-red-500 transition-all cursor-none"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <Hero />
        <Philosophy />
        <WorkGrid />
        <Process />
        <RhythmGame />
        <ScrollChallenge />
      </main>

      <Footer />
    </div>
  );
};

export default App;
