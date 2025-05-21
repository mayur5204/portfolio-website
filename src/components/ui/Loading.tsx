'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface LoadingProps {
  color?: string;
  size?: number;
  text?: string;
  showText?: boolean;
}

const Loading = ({ 
  color = '#7000FF', 
  size = 40, 
  text = 'Loading', 
  showText = true 
}: LoadingProps) => {
  const [dots, setDots] = useState('.');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev.length >= 3) return '.';
        return prev + '.';
      });
    }, 500);
    
    return () => clearInterval(interval);
  }, []);
  
  // Circle variants for animation
  const circleVariants = {
    start: {
      y: '0%'
    },
    end: {
      y: ['0%', '-100%', '0%'],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
        delay: 0.1
      }
    }
  };
  
  // Container animation
  const containerVariants = {
    start: {
      rotate: 0
    },
    end: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'linear'
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center">
      <motion.div
        variants={containerVariants}
        initial="start"
        animate="end"
        className="relative"
        style={{ width: size, height: size }}
      >
        <motion.span
          variants={circleVariants}
          initial="start"
          animate="end"
          className="absolute"
          style={{
            width: size / 5,
            height: size / 5,
            borderRadius: '50%',
            background: color,
            top: 0,
            left: '50%',
            marginLeft: -(size / 10),
            opacity: 0.8
          }}
        />
        <motion.span
          variants={circleVariants}
          initial="start"
          animate="end"
          className="absolute"
          style={{
            width: size / 5,
            height: size / 5,
            borderRadius: '50%',
            background: color,
            top: '50%',
            marginTop: -(size / 10),
            right: 0,
            opacity: 0.6
          }}
          transition={{
            delay: 0.2
          }}
        />
        <motion.span
          variants={circleVariants}
          initial="start"
          animate="end"
          className="absolute"
          style={{
            width: size / 5,
            height: size / 5,
            borderRadius: '50%',
            background: color,
            bottom: 0,
            left: '50%',
            marginLeft: -(size / 10),
            opacity: 0.4
          }}
          transition={{
            delay: 0.3
          }}
        />
        <motion.span
          variants={circleVariants}
          initial="start"
          animate="end"
          className="absolute"
          style={{
            width: size / 5,
            height: size / 5,
            borderRadius: '50%',
            background: color,
            top: '50%',
            marginTop: -(size / 10),
            left: 0,
            opacity: 0.2
          }}
          transition={{
            delay: 0.4
          }}
        />
      </motion.div>
      
      {showText && (
        <p className="mt-4 text-neutral-300">
          {text}{dots}
        </p>
      )}
    </div>
  );
};

export default Loading;
