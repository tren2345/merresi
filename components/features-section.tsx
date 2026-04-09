"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Code, Palette, LineChart, Cog, Globe, Shield } from "lucide-react"

const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }

const features = [
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Digital Architecture",
    description:
      "Custom websites engineered for conversion, not just aesthetics. Every pixel serves a purpose.",
  },
  {
    icon: <Code className="h-6 w-6" />,
    title: "Python Automation",
    description:
      "Eliminate repetitive tasks with intelligent scripts that work around the clock.",
  },
  {
    icon: <LineChart className="h-6 w-6" />,
    title: "Growth Engineering",
    description:
      "Apply Industrial Engineering principles to systematically scale your operations.",
  },
  {
    icon: <Cog className="h-6 w-6" />,
    title: "Process Optimization",
    description:
      "Identify bottlenecks and streamline workflows for maximum efficiency.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "CIPC Integration",
    description:
      "Seamless connection with South African business registration systems.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Compliance Automation",
    description:
      "Stay compliant with automated audits and documentation systems.",
  },
]

export function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  // Scroll-based transforms for the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, springConfig)
  
  // Background parallax
  const bgY = useTransform(smoothProgress, [0, 1], [0, 50])

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Dotted Grid Background with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, #E5E5E5 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
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
            className="text-sm font-medium text-[#8B7A9E] uppercase tracking-wider inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", ...springConfig }}
          >
            What We Build
          </motion.span>
          <motion.h2 
            className="mt-4 text-3xl sm:text-4xl font-normal text-foreground font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", ...springConfig, delay: 0.1 }}
          >
            Engineering Excellence, Delivered
          </motion.h2>
          <motion.p 
            className="mt-4 text-muted-foreground max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", ...springConfig, delay: 0.2 }}
          >
            We combine technical expertise with business acumen to create systems that drive real growth.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                delay: index * 0.1,
              }}
            >
              <motion.div 
                className="h-full flex flex-col p-6 rounded-[20px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.05)] transition-colors duration-300"
                whileHover={{ 
                  y: -8,
                  boxShadow: "0px 16px 40px rgba(180, 156, 197, 0.2)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Icon */}
                <motion.div 
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F6FA] text-[#6B5B7A] mb-4"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    backgroundColor: "rgba(180, 156, 197, 0.3)" 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  {feature.icon}
                </motion.div>

                {/* Content */}
                <h3 className="font-semibold text-[#2D2438] text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[#8B7A9E] text-sm flex-grow">
                  {feature.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
