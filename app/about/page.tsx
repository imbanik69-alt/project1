'use client';

import { Sparkles, Zap, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const whyVynceFeatures = [
    {
      icon: Sparkles,
      title: "Context-Aware Writing",
      description: "Generates captions and stories that actually match your tone and emotion.",
    },
    {
      icon: Zap,
      title: "Creator-Focused",
      description: "Built from real creator workflows — not random text generation.",
    },
    {
      icon: Heart,
      title: "Human Touch",
      description: "Every output feels natural, personal, and genuinely expressive.",
    },
  ];

const developers = [
    {
      name: "Rahit Pal",
      role: "Front-end Architect",
      description: "Brought the vision to life with pixel-perfect execution.",
      image: "https://i.ibb.co/j9LF9C2k/rahitprofile-Desert.png",
    },
    {
        name: "Sagar Banik",
        role: "UI/UX Designer",
        description: "The logic mastermind behind Vynce’s AI core.",
        image: "https://i.ibb.co/qMzsZCXy/sagarprofile-Highway.png",
    },
    {
        name: "Drup Mondal",
        role: "Backend Developer",
        description: "Crafted emotion through color and intuitive design.",
        image: "https://i.ibb.co/B2vm838N/drupprofile-Whale.png",
    },
  ];

const galleryImages = [
    { src: "https://i.ibb.co/XxpMJ1wP/p2.jpg", alt: "Hackathon 1" },
    { src: "https://i.ibb.co/dsxGVQYJ/p3.jpg", alt: "Hackathon 2" },
    { src: "https://i.ibb.co/bDhFgwy/p4.jpg", alt: "Hackathon 3" },
    { src: "https://i.ibb.co/Kj7bKkCG/p5.jpg", alt: "Hackathon 4" },
    { src: "https://i.ibb.co/JRDNmNyR/p6.jpg", alt: "p6" },
    { src: "https://i.ibb.co/wFS9jPxN/p8.jpg", alt: "Hackathon 6" },
    { src: "https://i.ibb.co/N2W94wpT/jp9.jpg", alt: "Hackathon 7" },
    { src: "https://i.ibb.co/ZzLjx8L9/p11.jpg", alt: "Hackathon 8" },
    { src: "https://i.ibb.co/d0QHFG8p/p12.jpg", alt: "Hackathon 9" },
    { src: "https://i.ibb.co/9k8C0SR1/p1.jpg", alt: "Hackathon 10" },
];

function HackathonGallery() {
    const trackRef = useRef<HTMLDivElement>(null);

    const handleNav = (direction: 'left' | 'right') => {
        if (trackRef.current) {
            const scrollAmount = direction === 'left' ? -300 : 300;
            trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };
    
    return (
        <section className="vynce-gallery">
            <h2>Hackathon '25 Gallery</h2>
            <p>A glimpse into the moments that sparked creativity at JU Hackathon.</p>
            <div className="stack-carousel">
                <button className="gallery-nav left" onClick={() => handleNav('left')}>❮</button>
                <div className="stack-track-container" ref={trackRef}>
                    <div className="stack-track">
                        {galleryImages.map((image, i) => (
                            <img key={`img-1-${i}`} src={image.src} alt={image.alt} />
                        ))}
                        {galleryImages.map((image, i) => (
                            <img key={`img-2-${i}`} src={image.src} alt={image.alt} />
                        ))}
                    </div>
                </div>
                <button className="gallery-nav right" onClick={() => handleNav('right')}>❯</button>
            </div>
        </section>
    );
}

function AboutUsSection() {
  return (
    <section className="about-us-section">
      <div className="about-container">
        <h2 data-aos="fade-up">About Us</h2>
        <p className="about-intro" data-aos="fade-up" data-aos-delay="100">
            We are a team of three developers from Jadavpur University, Adamas University, and Techno India University — brought together by curiosity, caffeine, and the chaos of Hackathon 2025. What began as a late-night idea soon turned into something real. We brainstormed for hours, switched directions mid-way, and finally locked our topic almost three hours after the hackathon began.
        </p>
        <p className="about-body" data-aos="fade-up" data-aos-delay="200">
            We spent sleepless nights writing, debugging, and reimagining ideas — fueled mostly by coffee and persistence. From exploring open-source projects to building custom solutions from scratch, everything we made was self-coded + vibe-coded, a reflection of our teamwork and creative drive.
        </p>
        <p className="about-body" data-aos="fade-up" data-aos-delay="300">
            This being our first hackathon, the journey was both intense and unforgettable. We didn’t just code — we learned, adapted, and pushed beyond our comfort zones. Through every challenge, we discovered the joy of creating something meaningful together.
        </p>
        <p className="about-conclusion" data-aos="fade-up" data-aos-delay="400">
            Three friends. One sleepless journey. Countless lines of code.
            <br />
            A story born out of chaos — and shaped by creativity.
        </p>
      </div>
    </section>
  );
}

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const panels = containerRef.current.querySelectorAll('.holographic-panel');
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      panels.forEach(panel => {
        const rect = (panel as HTMLElement).getBoundingClientRect();
        const x = clientX - (rect.left + rect.width / 2);
        const y = clientY - (rect.top + rect.height / 2);
        
        const rotateX = (y / innerHeight) * -30;
        const rotateY = (x / innerWidth) * 30;

        (panel as HTMLElement).style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1, 1, 1)`;
      });
    };

    const handleMouseLeave = () => {
      if (!containerRef.current) return;
      const panels = containerRef.current.querySelectorAll('.holographic-panel');
      panels.forEach(panel => {
        (panel as HTMLElement).style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    };

    const container = containerRef.current;
    container?.addEventListener('mousemove', handleMouseMove);
    container?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container?.removeEventListener('mousemove', handleMouseMove);
      container?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-full space-y-8 overflow-hidden">
       <div className="absolute inset-0 -z-20">
         <div id="particle-container"></div>
       </div>
       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-glow-indigo rounded-full mix-blend-screen filter blur-[150px] opacity-30"></div>
      
       <div className="w-full max-w-4xl z-10">
          <div className="text-center relative">
            <h2 className="text-3xl font-bold">
              Why Vynce?
            </h2>
             <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary/50 rounded-full blur-md animate-glow-pulse"></div>
          </div>
          <div className="relative text-center text-lg text-muted-foreground max-w-3xl mx-auto py-6">
            <p className="italic">
            Most AI tools can write — but they can’t feel. They miss the rhythm, the tone, the pulse of what makes a caption go viral or a story feel real. Vynce was born from that gap — crafted by creators, for creators. We built it with love, experience, and an obsession for words that connect. Whether you’re an influencer, a storyteller, or a dreamer — Vynce understands your vibe and turns ideas into something that truly sounds like you.
            </p>
          </div>
          <div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
              {whyVynceFeatures.map((feature, index) => (
                <div key={index} className="holographic-panel p-6 text-center">
                    <div className="holographic-panel-glow"></div>
                    <div className="holographic-panel-content">
                      <div className="inline-block mb-4 relative icon-wrapper">
                          <feature.icon className="h-8 w-8 text-primary transition-transform duration-300 icon-main" />
                          <div className="icon-glow"></div>
                      </div>
                      <h3 className="text-xl font-bold mb-2 transition-transform duration-300 title-main">{feature.title}</h3>
                      <p className="text-muted-foreground transition-transform duration-300 description-main">{feature.description}</p>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative w-full h-32 my-16 overflow-hidden">
            <div className="absolute inset-0 w-full h-full bg-gradient-flow-horizontal animate-gradient-flow-horizontal blur-2xl opacity-30"></div>
        </div>

        <div className="w-full max-w-5xl z-10 text-center pb-16">
          <h2 className="text-3xl font-bold">
              Meet Our Developers
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              The minds behind Vynce — built with creativity, caffeine, and collaboration at JU Hackathon 2025.
          </p>
          <div className="relative flex justify-center items-center flex-wrap gap-6 py-12 overflow-hidden">
            {developers.map((dev, i) => {
              const isHovered = hovered === i;
              const repulsion =
                hovered !== null && hovered !== i
                  ? i < hovered
                    ? "-100%"
                    : "100%"
                  : "0%";

              return (
                <motion.div
                  key={i}
                  className="relative flex flex-col items-center justify-center rounded-full overflow-hidden cursor-pointer border border-[#6366f1]/30 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                  style={{
                    width: "clamp(120px, 25vw, 180px)",
                    height: "clamp(120px, 25vw, 180px)",
                    backgroundImage: `url(${dev.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    zIndex: isHovered ? 10 : 1,
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  animate={{
                    x: repulsion,
                    scale: isHovered ? 1.15 : 1,
                    boxShadow: isHovered
                      ? "0 0 40px rgba(124,58,237,0.7)"
                      : "0 0 15px rgba(124,58,237,0.2)",
                    rotate: isHovered ? 2 : 0,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 140,
                    damping: 12,
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : 20,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-4 text-center"
                  >
                    <div className="text-base md:text-lg font-bold text-white bg-black/50 px-4 py-1 rounded-full backdrop-blur-md">
                      {dev.name}
                    </div>
                    <div className="text-xs md:text-sm text-primary bg-black/40 px-3 py-0.5 rounded-full backdrop-blur-sm mt-1">
                      {dev.role}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
        <AboutUsSection />
        <HackathonGallery />
    </div>
  );
}
