'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export const AOSInit = () => {
  useEffect(() => {
    AOS.init({
      easing: 'ease-out-quad',
      duration: 800,
      once: true,
    });
  }, []);

  return null;
};
