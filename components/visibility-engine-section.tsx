"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Shield, Layers, Palette, Server, Play, ExternalLink } from "lucide-react"

const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }

const servicePillars = [
  {
    id: "compliance",
    icon: <Shield className="h-5 w-5" />,
    title: "Compliance Engineering",
    description: "CIPC/SARS legal foundations automated for seamless business registration.",
  },
  {
    id: "architecture",
    icon: <Layers className="h-5 w-5" />,
    title: "Digital Architecture",
    description: "Conversion-focused websites engineered with precision, not templates.",
  },
  {
    id: "branding",
    icon: <Palette className="h-5 w-5" />,
    title: "Brand Identity Systems",
    description: "Visual systems that communicate trust and authority in your market.",
  },
  {
    id: "backend",
    icon: <Server className="h-5 w-5" />,
    title: "Backend Automation",
    description: "Python-driven marketing pipelines that scale without manual intervention.",
  },
]

const videoModules = [
  {
    id: "strategy",
    label: "Phase 1: Zero-to-10k Traffic Engineering",
    description: "Learn the strategy behind Domain Rating (DR) and competing for keywords with real business value.",
    youtubeId: "_RVG1pJlGNE",
    thumbnail: "https://img.youtube.com/vi/_RVG1pJlGNE/maxresdefault.jpg",
  },
  {
    id: "execution",
    label: "Phase 2: AI-Powered Viral Loops",
    description: "Discover how AI creates 10 variations of a hook in minutes, outpacing slow corporate marketing.",
    youtubeId: "x60gG9zi0bI",
    thumbnail: "https://img.youtube.com/vi/x60gG9zi0bI/maxresdefault.jpg",
  },
]

export function VisibilityEngineSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })
  const [activeVideo, setActiveVideo] = useState(0)
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, springConfig)
  const bgY = useTransform(smoothProgress, [0, 1], [0, 30])

  // Scale video when marketing pillar is hovered
  const videoScale = hoveredPillar === "backend" || hoveredPillar === "branding" ? 1.03 : 1

  return (
    <section
      ref={sectionRef}
      id="visibility-engine"
      className="relative py-24 lg:py-32 overflow-hidden bg-[#FAFAFA]"
    >
      {/* Subtle grid background */}
      <motion.div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(circle, #D1D5DB 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
          y: bgY,
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", ...springConfig }}
          className="text-center mb-16"
        >
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 text-[#16A34A] text-sm font-medium mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", ...springConfig }}
          >
            <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
            Growth Marketing
          </motion.span>
          <motion.h2 
            className="text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground font-serif text-balance"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", ...springConfig, delay: 0.1 }}
          >
            The Visibility Engine
          </motion.h2>
          <motion.p 
            className="mt-2 text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", ...springConfig, delay: 0.15 }}
          >
            Small Business Growth, Automated.
          </motion.p>
        </motion.div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Service Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", ...springConfig, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
              The Assembly Line
            </h3>
            
            {servicePillars.map((pillar, index) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ 
                  type: "spring", 
                  ...springConfig, 
                  delay: 0.3 + index * 0.1 
                }}
                onMouseEnter={() => setHoveredPillar(pillar.id)}
                onMouseLeave={() => setHoveredPillar(null)}
              >
                <motion.div
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-border/50 cursor-pointer transition-colors"
                  whileHover={{ 
                    x: 8,
                    backgroundColor: "rgba(34, 197, 94, 0.05)",
                    borderColor: "rgba(34, 197, 94, 0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <motion.div 
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F8F6FA] text-[#6B5B7A]"
                    whileHover={{ 
                      scale: 1.1,
                      backgroundColor: "rgba(34, 197, 94, 0.2)",
                      color: "#16A34A",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {pillar.icon}
                  </motion.div>
                  <div>
                    <h4 className="font-semibold text-foreground">{pillar.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{pillar.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Right Column: Video Player */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ type: "spring", ...springConfig, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6">
              Learning Modules
            </h3>

            {/* Video Tabs */}
            <div className="flex gap-2 mb-4">
              {videoModules.map((module, index) => (
                <motion.button
                  key={module.id}
                  onClick={() => {
                    setActiveVideo(index)
                    setIsPlaying(false)
                  }}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeVideo === index
                      ? "bg-[#22C55E] text-white"
                      : "bg-white text-muted-foreground hover:bg-muted/50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  {index === 0 ? "SEO Strategy" : "Viral Growth"}
                </motion.button>
              ))}
            </div>

            {/* Video Container */}
            <motion.div
              className="relative rounded-2xl overflow-hidden bg-black"
              animate={{ 
                scale: videoScale,
                boxShadow: hoveredPillar 
                  ? "0 0 0 3px rgba(34, 197, 94, 0.4), 0 20px 40px rgba(0,0,0,0.2)" 
                  : "0 0 0 0px rgba(34, 197, 94, 0), 0 10px 30px rgba(0,0,0,0.1)"
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {!isPlaying ? (
                <div className="relative aspect-video">
                  <img
                    src={videoModules[activeVideo].thumbnail}
                    alt={videoModules[activeVideo].label}
                    className="w-full h-full object-cover"
                  />
                  {/* Play overlay */}
                  <motion.button
                    onClick={() => setIsPlaying(true)}
                    className="absolute inset-0 flex items-center justify-center bg-black/30 group"
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                  >
                    <motion.div
                      className="w-16 h-16 rounded-full bg-[#22C55E] flex items-center justify-center shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      <Play className="h-7 w-7 text-white ml-1" fill="white" />
                    </motion.div>
                  </motion.button>
                </div>
              ) : (
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${videoModules[activeVideo].youtubeId}?autoplay=1&rel=0`}
                    title={videoModules[activeVideo].label}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              )}
            </motion.div>

            {/* Video Info */}
            <motion.div 
              className="p-4 bg-white rounded-xl border border-border/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={activeVideo}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 rounded-full bg-[#22C55E]/10 text-[#16A34A] text-xs font-medium">
                  {videoModules[activeVideo].label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {videoModules[activeVideo].description}
              </p>
              <a
                href={`https://www.youtube.com/watch?v=${videoModules[activeVideo].youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-sm text-[#22C55E] hover:underline"
              >
                Watch on YouTube <ExternalLink className="h-3 w-3" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* South African Mission Statement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", ...springConfig, delay: 0.5 }}
          className="mt-16"
        >
          <div className="relative rounded-2xl bg-[#1A1A1A] p-8 lg:p-12 overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#22C55E]/20 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#B49CC5]/20 to-transparent rounded-full blur-3xl" />
            
            <div className="relative">
              <motion.div
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ type: "spring", ...springConfig, delay: 0.6 }}
              >
                <div className="w-8 h-0.5 bg-[#22C55E]" />
                <span className="text-[#22C55E] text-sm font-medium uppercase tracking-wider">
                  Our Objective
                </span>
              </motion.div>
              
              <motion.p
                className="text-xl lg:text-2xl text-white font-sans leading-relaxed max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", ...springConfig, delay: 0.7 }}
              >
                To help South African Small Businesses{" "}
                <span className="text-[#22C55E] font-semibold">bypass the noise</span>. 
                We combine CIPC/SARS legal foundations with Python-driven marketing to ensure you 
                don&apos;t just exist—
                <span className="text-[#22C55E] font-semibold">you dominate your local threshold</span>.
              </motion.p>

              <motion.div
                className="flex flex-wrap items-center gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", ...springConfig, delay: 0.8 }}
              >
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  Johannesburg
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  Cape Town
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  Durban
                </div>
                <div className="flex items-center gap-2 text-white/60 text-sm">
                  <div className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  Pretoria
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
