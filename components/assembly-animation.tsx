"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Zap, TrendingUp, Shield, Clock } from "lucide-react"

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
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#8B7A9E] uppercase tracking-wider">
            Systematic Excellence
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-normal text-foreground font-serif">
            The Building Blocks of Automation
          </h2>
        </motion.div>

        {/* Features Grid with Animated Lines */}
        <div className="relative">
          {/* Connecting Lines SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B49CC5" stopOpacity="0" />
                <stop offset="50%" stopColor="#B49CC5" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#B49CC5" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Horizontal connecting line */}
            <motion.line
              x1="10%"
              y1="50%"
              x2="90%"
              y2="50%"
              stroke="url(#lineGradient)"
              strokeWidth="1"
              strokeDasharray="8 4"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </svg>

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
                  delay: index * 0.1 + 0.3,
                }}
                className="relative"
              >
                <div className="relative flex flex-col items-center p-6 rounded-[20px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_24px_rgba(180,156,197,0.15)] transition-shadow duration-300">
                  {/* Icon */}
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F6FA] text-[#6B5B7A] mb-4">
                    {feature.icon}
                  </div>
                  
                  {/* Content */}
                  <h3 className="font-semibold text-[#2D2438] text-center">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#8B7A9E] text-center">
                    {feature.description}
                  </p>

                  {/* Step indicator */}
                  <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#B49CC5] text-white text-xs font-medium">
                    {index + 1}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
