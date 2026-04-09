"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Zap, TrendingUp, Shield, Clock } from "lucide-react"

const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }

const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: "Automated Workflows",
    description: "Python-powered systems that run 24/7",
  },
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Growth Engineering",
    description: "IE principles applied to your business",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Risk Mitigation",
    description: "Systematic audits and compliance checks",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    title: "Time Recovery",
    description: "Reclaim hours lost to manual processes",
  },
]

export function AssemblyAnimation() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  // Scroll-based transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, springConfig)
  
  // Line drawing animation based on scroll
  const lineWidth = useTransform(smoothProgress, [0.2, 0.6], ["0%", "100%"])
  const smoothLineWidth = useSpring(lineWidth, { stiffness: 50, damping: 20 })

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden bg-[#FAFAFA]"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", ...springConfig }}
          className="text-center mb-16"
        >
          <motion.span 
            className="text-sm font-medium text-[#8B7A9E] uppercase tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", ...springConfig }}
          >
            Systematic Excellence
          </motion.span>
          <motion.h2 
            className="mt-4 text-3xl sm:text-4xl font-normal text-foreground font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", ...springConfig, delay: 0.1 }}
          >
            The Building Blocks of Automation
          </motion.h2>
        </motion.div>

        {/* Features Grid with Animated Lines */}
        <div className="relative">
          {/* Connecting Lines SVG */}
          <div className="absolute inset-0 pointer-events-none hidden lg:flex items-center justify-center">
            {/* Background line */}
            <div className="absolute top-1/2 left-[10%] right-[10%] h-px bg-[#E5E0EB]" />
            
            {/* Animated foreground line */}
            <motion.div 
              className="absolute top-1/2 left-[10%] h-0.5 bg-gradient-to-r from-[#B49CC5] via-[#B49CC5] to-transparent"
              style={{ width: smoothLineWidth }}
            />
            
            {/* Animated pulse dot */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-[#B49CC5] shadow-[0_0_10px_rgba(180,156,197,0.6)]"
              style={{ 
                left: smoothLineWidth,
                marginLeft: "-6px"
              }}
            />
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.15 + 0.3,
                }}
                className="relative"
              >
                <motion.div 
                  className="relative flex flex-col items-center p-6 rounded-[20px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-shadow duration-300"
                  whileHover={{ 
                    y: -8,
                    boxShadow: "0px 16px 40px rgba(180,156,197,0.2)" 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  {/* Icon */}
                  <motion.div 
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F6FA] text-[#6B5B7A] mb-4"
                    whileHover={{ 
                      scale: 1.1, 
                      rotate: 10,
                      backgroundColor: "rgba(180,156,197,0.3)" 
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    {feature.icon}
                  </motion.div>
                  
                  {/* Content */}
                  <h3 className="font-semibold text-[#2D2438] text-center">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#8B7A9E] text-center">
                    {feature.description}
                  </p>

                  {/* Step indicator */}
                  <motion.div 
                    className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#B49CC5] text-white text-xs font-medium"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15, 
                      delay: index * 0.15 + 0.5 
                    }}
                    whileHover={{ scale: 1.2 }}
                  >
                    {index + 1}
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
