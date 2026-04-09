"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { PhoneCall, ClipboardCheck, Rocket, BarChart3 } from "lucide-react"

const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }

const steps = [
  {
    icon: <PhoneCall className="h-6 w-6" />,
    title: "Discovery Call",
    description:
      "We dive deep into your business, understand your goals, and identify friction points holding you back.",
  },
  {
    icon: <ClipboardCheck className="h-6 w-6" />,
    title: "System Audit",
    description:
      "Our team analyzes your current processes and creates a detailed engineering blueprint for improvement.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Build & Deploy",
    description:
      "We engineer your custom solution - website, automations, integrations - and deploy it seamlessly.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Optimize & Scale",
    description:
      "Continuous monitoring and optimization ensures your systems grow with your business.",
  },
]

export function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  // Scroll-based transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, springConfig)
  
  // Background parallax
  const bgY = useTransform(smoothProgress, [0, 1], [0, 80])
  
  // Line drawing progress
  const lineProgress = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])
  const smoothLineProgress = useSpring(lineProgress, { stiffness: 50, damping: 20 })

  return (
    <section
      ref={sectionRef}
      id="process"
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
            className="text-sm font-medium text-[#8B7A9E] uppercase tracking-wider"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", ...springConfig }}
          >
            Our Process
          </motion.span>
          <motion.h2 
            className="mt-4 text-3xl sm:text-4xl font-normal text-foreground font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", ...springConfig, delay: 0.1 }}
          >
            From Chaos to Clarity in 4 Steps
          </motion.h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Animated Connecting Line */}
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E5E0EB] hidden lg:block"
            style={{ scaleY: smoothLineProgress, transformOrigin: "top" }}
          />
          
          {/* Glowing line overlay */}
          <motion.div 
            className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#B49CC5] to-transparent hidden lg:block"
            style={{ 
              scaleY: smoothLineProgress, 
              transformOrigin: "top",
              filter: "blur(2px)",
            }}
          />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0
              
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.15,
                  }}
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-8 lg:py-8 ${
                    !isEven ? "lg:direction-rtl" : ""
                  }`}
                >
                  {/* Step Number Circle */}
                  <motion.div 
                    className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ 
                      type: "spring", 
                      stiffness: 200, 
                      damping: 15, 
                      delay: 0.3 + index * 0.15 
                    }}
                  >
                    <motion.div 
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B49CC5] text-white font-semibold shadow-[0px_4px_12px_rgba(180,156,197,0.3)]"
                      whileHover={{ 
                        scale: 1.2, 
                        boxShadow: "0px 8px 24px rgba(180,156,197,0.5)" 
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {index + 1}
                    </motion.div>
                  </motion.div>

                  {/* Content Card */}
                  <motion.div
                    className={`${
                      isEven ? "lg:pr-16" : "lg:col-start-2 lg:pl-16"
                    }`}
                    initial={{ 
                      opacity: 0, 
                      x: isEven ? -50 : 50 
                    }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15, 
                      delay: 0.2 + index * 0.15 
                    }}
                  >
                    <motion.div 
                      className="flex flex-col p-6 rounded-[20px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.05)]"
                      whileHover={{ 
                        y: -4,
                        boxShadow: "0px_12px_32px_rgba(180,156,197,0.15)" 
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      {/* Mobile Step Number */}
                      <div className="flex items-center gap-4 mb-4 lg:hidden">
                        <motion.div 
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B49CC5] text-white text-sm font-semibold"
                          whileTap={{ scale: 0.9 }}
                        >
                          {index + 1}
                        </motion.div>
                      </div>

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
                        {step.icon}
                      </motion.div>

                      {/* Content */}
                      <h3 className="font-semibold text-[#2D2438] text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-[#8B7A9E] text-sm">
                        {step.description}
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* Empty column for alternating layout */}
                  {isEven ? (
                    <div className="hidden lg:block" />
                  ) : (
                    <div className="hidden lg:block lg:col-start-1 lg:row-start-1" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
