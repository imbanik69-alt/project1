'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function AiBadge({ isTyping }: { isTyping: boolean }) {
  return (
    <motion.div
      className="relative h-8 w-8 flex-shrink-0 flex items-center justify-center"
      animate={{
        scale: isTyping ? [1, 1.05, 1] : 1,
        rotateZ: isTyping ? [0, 3, -3, 0] : 0,
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        repeat: isTyping ? Infinity : 0,
      }}
    >
      {/* Subtle ambient glow */}
      <div
        className={cn(
          'absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 blur-lg transition-opacity duration-700',
          isTyping ? 'opacity-70' : 'opacity-40'
        )}
      ></div>

      {/* Main badge body */}
      <div className="relative h-8 w-8 rounded-full bg-neutral-950 flex items-center justify-center shadow-[0_0_8px_rgba(139,92,246,0.6)] border border-neutral-800">
        {/* Center crystal mark */}
        <div
          className={cn(
            'h-3 w-3 rounded-[4px] bg-gradient-to-br from-blue-400 to-indigo-500 rotate-45 shadow-[0_0_6px_rgba(59,130,246,0.6)] transition-transform duration-700',
            isTyping ? 'scale-110' : 'scale-100'
          )}
        ></div>
      </div>
    </motion.div>
  );
}
