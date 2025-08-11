import { useEffect, useState } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      
      setScrollPosition(currentScrollPosition);
      
      if (currentScrollPosition > lastScrollPosition) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollPosition]);

  return { scrollPosition, scrollDirection };
}; 