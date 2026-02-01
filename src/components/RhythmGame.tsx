
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BPM = 100;
const BEAT_DURATION = 60000 / BPM; // ms per beat

interface Ripple {
  id: number;
  color: string;
}

const RhythmGame: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{ text: string; color: string } | null>(null);
  const [lastBeatTime, setLastBeatTime] = useState(0);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  
  const gameRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rippleIdCounter = useRef(0);

  const handleTap = useCallback(() => {
    if (!isPlaying) return;

    const now = performance.now();
    const timeSinceLastBeat = (now - lastBeatTime) % BEAT_DURATION;
    const diff = Math.min(timeSinceLastBeat, BEAT_DURATION - timeSinceLastBeat);

    let accuracy = "";
    let points = 0;
    let color = "text-white";
    let rippleColor = "rgba(255, 255, 255, 0.4)";

    if (diff < 60) {
      accuracy = "PERFECT";
      points = 100;
      color = "text-red-500";
      rippleColor = "rgba(239, 68, 68, 0.6)";
    } else if (diff < 120) {
      accuracy = "GREAT";
      points = 50;
      color = "text-white";
      rippleColor = "rgba(255, 255, 255, 0.4)";
    } else if (diff < 200) {
      accuracy = "GOOD";
      points = 20;
      color = "text-white/60";
      rippleColor = "rgba(255, 255, 255, 0.2)";
    } else {
      accuracy = "MISS";
      points = 0;
      color = "text-white/20";
      rippleColor = "rgba(255, 255, 255, 0.05)";
    }

    // Add ripple
    const newRipple = { id: rippleIdCounter.current++, color: rippleColor };
    setRipples(prev => [...prev, newRipple]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 600);

    if (points > 0) {
      setScore(s => s + points);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }

    setFeedback({ text: accuracy, color });
    
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);
    feedbackTimeout.current = setTimeout(() => setFeedback(null), 500);
  }, [isPlaying, lastBeatTime]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (!isPlaying) {
          startGame();
        } else {
          handleTap();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, handleTap]);

  const startGame = () => {
    setIsPlaying(true);
    setScore(0);
    setStreak(0);
    setLastBeatTime(performance.now());
  };

  const stopGame = () => {
    setIsPlaying(false);
    setFeedback(null);
    setRipples([]);
  };

  return (
    <section id="rhythm" className="py-32 md:py-64 px-6 bg-[#0a0a0a] overflow-hidden border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-24">
        
        <div className="md:w-1/2 space-y-8">
          <h2 className="text-xs uppercase tracking-[0.3em] text-white/30">Motion is Rhythm</h2>
          <h3 className="text-5xl md:text-7xl font-serif tracking-tighter leading-none">
            The <span className="italic">Athletics</span> of Timing
          </h3>
          <p className="text-xl text-white/50 font-light leading-relaxed max-w-md">
            Motion design isn't just about moving pixels; it's about the cadence of movement. Test your internal clock against the rhythm of the grid.
          </p>
          
          <div className="pt-8">
            {!isPlaying ? (
              <button 
                onClick={startGame}
                className="group flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-white hover:text-red-500 transition-colors"
              >
                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-red-500 transition-colors">
                  <div className="w-2 h-2 bg-white rounded-full group-hover:bg-red-500 animate-pulse" />
                </span>
                Initialize Session [Space]
              </button>
            ) : (
              <div className="flex items-center gap-12">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Current Score</p>
                  <p className="text-4xl font-serif italic">{score.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/30 mb-1">Streak</p>
                  <p className="text-4xl font-serif">{streak}</p>
                </div>
                <button 
                  onClick={stopGame}
                  className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                >
                  End Session
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:w-1/2 relative flex items-center justify-center min-h-[400px]">
          {/* Central Beat Core */}
          <div 
            className="relative cursor-none flex items-center justify-center w-96 h-96"
            onClick={handleTap}
          >
            {/* Ripples Container */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <AnimatePresence>
                {ripples.map(ripple => (
                  <motion.div
                    key={ripple.id}
                    initial={{ scale: 0.5, opacity: 1, border: `1px solid ${ripple.color}` }}
                    animate={{ scale: 2.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="absolute w-32 h-32 rounded-full pointer-events-none"
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* The Pulse Rings */}
            <motion.div 
              animate={isPlaying ? { 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1]
              } : {}}
              transition={{ 
                duration: BEAT_DURATION / 1000, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="absolute w-64 h-64 border border-white/20 rounded-full pointer-events-none"
            />
            
            <motion.div 
              animate={isPlaying ? { 
                scale: [1, 1.5, 1],
                opacity: [0.05, 0.15, 0.05]
              } : {}}
              transition={{ 
                duration: BEAT_DURATION / 1000, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: 0.1
              }}
              className="absolute w-96 h-96 border border-white/10 rounded-full pointer-events-none"
            />

            {/* The Target */}
            <motion.div 
              whileTap={{ scale: 0.9 }}
              animate={feedback?.text === 'PERFECT' ? { scale: [1, 1.1, 1] } : {}}
              className={`z-10 w-32 h-32 rounded-full border-2 flex items-center justify-center transition-colors duration-300 ${
                isPlaying ? (streak > 5 ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]' : 'border-white/40') : 'border-white/10'
              }`}
            >
              <div className="text-center">
                <AnimatePresence mode="wait">
                  {feedback ? (
                    <motion.div
                      key={feedback.text}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 1.5 }}
                      className={`text-[10px] font-bold tracking-[0.3em] ${feedback.color}`}
                    >
                      {feedback.text}
                    </motion.div>
                  ) : (
                    <div className="text-[10px] font-bold tracking-[0.3em] text-white/20 uppercase">
                      {isPlaying ? 'TAP' : 'IDLE'}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Streak Indicator (Circular) */}
            {isPlaying && streak > 0 && (
              <motion.div 
                className="absolute w-40 h-40 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
              </motion.div>
            )}
          </div>

          {/* Background Text */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="text-[15rem] font-serif italic text-white/[0.02] select-none">
              {streak}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RhythmGame;
