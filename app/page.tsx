
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Lightbulb, Bot, Palette, Sparkles, Zap, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import React from 'react';
import { TypewriterEffect } from '@/components/typewriter-effect';

const features = [
  {
    icon: Lightbulb,
    title: 'Instant Ideas',
    description: 'Kickstart your creative process with unique ideas generated in seconds.',
  },
  {
    icon: Bot,
    title: 'Smart Captions',
    description: 'Generate engaging captions and scripts tailored to your chosen tone and audience.',
  },
  {
    icon: Palette,
    title: 'AI Content Concepts',
    description: 'Get creative descriptions and branding concepts for your marketing.',
  },
];

export default function Home() {
    
  return (
    <div className="relative flex flex-col min-h-full overflow-hidden">
        {/* Animated background */}
        <div className="fixed top-0 left-0 w-full h-full -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-indigo rounded-full mix-blend-screen filter blur-[150px] opacity-50 animate-blob"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/4 w-[500px] h_-[500px] bg-glow-magenta rounded-full mix-blend-screen filter blur-[150px] opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 translate-x-1/4 translate-y-1/4 w-[400px] h-[400px] bg-glow-orange rounded-full mix-blend-screen filter blur-[150px] opacity-50 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="fixed inset-0 z-0 bg-black/60"></div>

      <div className="relative w-full h-screen flex flex-col justify-center items-center text-white">
        {/* Hero Section */}
        <section className="relative z-10 w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto text-center px-4">
            <div data-aos="fade-up">
              <motion.h1 
                className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter text-white mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                Where sparks become stories
              </motion.h1>
              <motion.p 
                className="max-w-2xl mx-auto text-xl md:text-2xl text-gray-300 mb-10 font-headline italic"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                Transform your ideas into words that captivate.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                <Button 
                  size="lg" 
                  className="text-white font-semibold shadow-lg hover:shadow-xl transition-shadow bg-accent-gradient"
                  asChild
                 >
                  <Link href="/create">
                    <span>
                      Launch Vynce <ArrowRight className="ml-2 h-5 w-5 inline" />
                    </span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

       {/* Features Section */}
      <section id="features" className="relative z-10 w-full py-20 md:py-28 lg:py-32 bg-transparent">
        <div className="container mx-auto text-center px-4">
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            A New Era of Digital Expression
          </h2>
          <div data-aos="fade-up" data-aos-delay="100" className="max-w-3xl mx-auto text-lg text-gray-400 mb-16">
            <TypewriterEffect text="Vynce is more than just a tool—it's your creative co-pilot. Built with cutting-edge AI, it helps you craft compelling narratives and stunning visuals with ease." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
               <motion.div
                key={feature.title}
                className="holographic-card p-6 text-center"
                initial={{ opacity: 0, y: 50, transform: 'perspective(800px) rotateY(0deg) rotateX(0deg)' }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 }, boxShadow: '0 10px 30px rgba(138, 43, 226, 0.3)' }}
              >
                 <div className="holographic-glow"></div>
                <div className="relative inline-block mb-4">
                  <motion.div
                    className="absolute -inset-2 bg-primary/20 rounded-full blur-lg"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-full bg-background border border-white/10">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
       <section id="about" className="relative z-10 w-full py-20 md:py-28 lg:py-32 bg-transparent">
        <div className="container mx-auto text-center px-4">
          <h2 data-aos="fade-up" className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Made with 💙 by Team Clutch Commit
          </h2>
          <p data-aos="fade-up" data-aos-delay="100" className="max-w-3xl mx-auto text-lg text-gray-400 mb-8">
            Vynce was built during JU Hackathon 2025 to empower creators through AI. Designed by passionate students exploring the fusion of creativity and technology.
          </p>
          <div data-aos="fade-up" data-aos-delay="200" className="flex justify-center gap-4">
            <span className="inline-flex items-center rounded-md bg-white/10 px-3 py-1 text-sm font-medium text-gray-300">Built with Gemini</span>
            <span className="inline-flex items-center rounded-md bg-white/10 px-3 py-1 text-sm font-medium text-gray-300">Powered by Firebase</span>
          </div>
        </div>
      </section>
    </div>
  );
}
