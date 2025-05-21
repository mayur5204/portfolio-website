'use client';

import { useState, useEffect } from 'react';
import { throttle } from '@/utils/performance';

interface ScrollPosition {
  scrollX: number;
  scrollY: number;
  scrollDirection: 'up' | 'down' | null;
  scrollPercentage: number;
}

export const useScrollPosition = (): ScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    scrollX: 0,
    scrollY: 0,
    scrollDirection: null,
    scrollPercentage: 0
  });
  
  useEffect(() => {
    let previousScrollY = window.scrollY;
    
    const handleScrollThrottled = throttle(() => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      const direction = currentScrollY > previousScrollY ? 'down' : 'up';
      
      // Calculate scroll percentage (how far down the page the user has scrolled)
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = scrollHeight > 0 ? (currentScrollY / scrollHeight) * 100 : 0;
      
      setScrollPosition({
        scrollY: currentScrollY,
        scrollX: currentScrollX,
        scrollDirection: direction,
        scrollPercentage
      });
      
      previousScrollY = currentScrollY;
    }, 100); // Throttle to improve performance
    
    const handleScroll = () => handleScrollThrottled();
    
    window.addEventListener('scroll', handleScroll);
    
    // Initial call to set first values
    handleScrollThrottled();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollPosition;
};

export default useScrollPosition;
