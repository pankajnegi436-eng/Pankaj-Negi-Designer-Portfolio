
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, Variants } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: 'Kinetic Typography',
    category: 'Motion Experiment',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200',
    link: 'https://www.behance.net/gallery/77956337/Kinetic-typography-animation'
  },
  {
    title: 'Branding in Motion',
    category: 'Visual Identity',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200',
    link: 'https://www.behance.net/gallery/76614935/Naturigo-Branding'
  },
  {
    title: 'Social Media',
    category: 'Motion Graphics',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
    link: 'https://www.behance.net/gallery/140612745/Social-Media-Gifs'
  },
  {
    title: 'Photography',
    category: 'Visual Storytelling',
    image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=1200',
    link: 'https://www.behance.net/gallery/136140343/Cinematic-Photograhy-Visual-Story-Telling'
  },
];

const WorkGrid: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Mouse position for floating preview
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor following
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const cardVariants: Variants = {
    initial: { opacity: 0, y: 40 },
    animate: (idx: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: idx * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }),
    hover: {}
  };

  const categoryVariants: Variants = {
    initial: { 
      x: 0, 
      color: "rgba(255, 255, 255, 0.4)",
      letterSpacing: "0.1em"
    },
    hover: { 
      x: 8, 
      color: "#ef4444", 
      letterSpacing: "0.2em",
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <section 
      id="work" 
      className="py-32 px-6 md:px-12 relative"
      onMouseMove={handleMouseMove}
    >
      {/* Floating Preview Container */}
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            style={{
              left: smoothMouseX,
              top: smoothMouseY,
              translateX: '-50%',
              translateY: '-50%',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed pointer-events-none z-50 hidden md:block"
          >
            <div className="w-64 h-40 overflow-hidden border border-white/20 shadow-2xl rounded-lg bg-black">
              <motion.img 
                key={projects[hoveredIndex].image}
                src={projects[hoveredIndex].image}
                alt="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full object-cover grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <span className="text-[10px] uppercase tracking-widest text-white/80">View Case Study</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-end mb-16 md:mb-24 px-4">
        <div>
          <h2 className="text-xs uppercase tracking-[0.3em] text-white/30 mb-4">Selected Work</h2>
          <h3 className="text-4xl md:text-6xl font-serif">Restrained <span className="italic">Visuals</span></h3>
        </div>
        <div className="hidden md:block text-right">
          <p className="text-sm text-white/40 max-w-[200px]">Curated projects showcasing precision and movement.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        {projects.map((project, idx) => (
          <motion.a 
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            custom={idx}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true }}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group cursor-none block relative"
          >
            <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-[#111]">
              <motion.img 
                src={project.image} 
                alt={project.title}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
                className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-1000 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <ArrowUpRight className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="flex justify-between items-start px-2">
              <div>
                <h4 className="text-xl md:text-2xl font-serif mb-1 group-hover:italic transition-all">{project.title}</h4>
                <motion.p 
                  variants={categoryVariants}
                  className="text-xs uppercase"
                >
                  {project.category}
                </motion.p>
              </div>
              <span className="text-[10px] text-white/20">0{idx + 1}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default WorkGrid;
