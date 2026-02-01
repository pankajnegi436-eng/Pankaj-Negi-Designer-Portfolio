
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Instagram, ArrowUpRight } from 'lucide-react';

const Footer: React.FC = () => {
  const socials = [
    { 
      label: 'LinkedIn', 
      icon: <Linkedin className="w-4 h-4" />, 
      href: 'https://www.linkedin.com/in/pankaj-negi-50294b79/' 
    },
    { 
      label: 'Instagram', 
      icon: <Instagram className="w-4 h-4" />, 
      href: 'https://www.instagram.com/creative__cat/?hl=en' 
    },
    { 
      label: 'Behance', 
      icon: <ArrowUpRight className="w-4 h-4" />, 
      href: 'https://www.behance.net/pankajnegi' 
    },
  ];

  return (
    <footer id="contact" className="py-32 md:py-48 px-6 md:px-24 bg-[#0a0a0a] border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-xs uppercase tracking-[0.4em] text-white/30 mb-12">Get in touch</h2>
        <a 
          href="mailto:pankaj@negi.design" 
          className="text-4xl md:text-7xl lg:text-8xl font-serif italic mb-24 hover:opacity-50 transition-opacity tracking-tighter break-all"
        >
          pankaj@negi.design
        </a>

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-12 border-t border-white/10 pt-16">
          <div className="text-left space-y-4">
            <p className="text-xs uppercase tracking-widest text-white/30">Location</p>
            <p className="text-lg">Remote / Worldwide</p>
          </div>

          <div className="flex space-x-12">
            {socials.map((social) => (
              <motion.a 
                key={social.label} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial="initial"
                whileHover="hover"
                className="relative flex items-center gap-2 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors pb-1"
              >
                {social.icon}
                <span>{social.label}</span>
                
                {/* Animated Underline */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 h-[1px] bg-red-600 origin-left"
                  variants={{
                    initial: { scaleX: 0 },
                    hover: { scaleX: 1 }
                  }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                />
              </motion.a>
            ))}
          </div>

          <div className="text-right text-[10px] uppercase tracking-widest text-white/20">
            © 2024 Pankaj Negi. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
