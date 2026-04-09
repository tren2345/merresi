"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Frown, Check } from "lucide-react"

const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }

const painPoints = [
  "You're tired of your website not bringing in any results at all...?",
  "Customers visit your site, but they don't reach out or take action.",
  "It's slow, buggy, or even goes down at the worst times.",
  "You want a decent website but you don't know who you can trust..?",
]

const solutions = [
  "Because I'm not about false promises, I keep it real.",
  "We create websites that guide visitors toward calling or booking services.",
  "We keep your site fast, secure, and running 24/7 without issues.",
  "My work is high quality.",
]

export function ComparisonSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  // Scroll-based transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  })

  const smoothProgress = useSpring(scrollYProgress, springConfig)

  // Cards slide in from opposite sides
  const leftCardX = useTransform(smoothProgress, [0, 1], [-100, 0])
  const rightCardX = useTransform(smoothProgress, [0, 1], [100, 0])
  const leftCardRotate = useTransform(smoothProgress, [0, 1], [-5, 0])
  const rightCardRotate = useTransform(smoothProgress, [0, 1], [5, 0])

  const smoothLeftX = useSpring(leftCardX, springConfig)
  const smoothRightX = useSpring(rightCardX, springConfig)
  const smoothLeftRotate = useSpring(leftCardRotate, springConfig)
  const smoothRightRotate = useSpring(rightCardRotate, springConfig)

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", ...springConfig }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl font-normal text-foreground font-serif"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 80, damping: 15 }}
          >
            Business Owners Frustrations Into Solutions
          </motion.h2>
        </motion.div>

        {/* Two Card Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pain Points Card */}
          <motion.div
            style={{ x: smoothLeftX, rotate: smoothLeftRotate }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="rounded-2xl bg-foreground text-white p-8 h-full"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0px 20px 50px rgba(0,0,0,0.2)" 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.h3 
                className="text-lg font-semibold uppercase tracking-wide mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", ...springConfig, delay: 0.3 }}
              >
                Does This Sound And Feel Familiar?
              </motion.h3>
              <div className="space-y-6">
                {painPoints.map((point, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15, 
                      delay: 0.4 + index * 0.1 
                    }}
                    className="flex items-start gap-4"
                  >
                    <motion.div 
                      className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20"
                      whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Frown className="h-4 w-4 text-white/70" />
                    </motion.div>
                    <p className="text-white/90 text-base leading-relaxed pt-1">
                      {point}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Solutions Card */}
          <motion.div
            style={{ x: smoothRightX, rotate: smoothRightRotate }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="rounded-2xl bg-[#FAFAFA] border border-foreground/10 p-8 h-full"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0px 20px 50px rgba(180, 156, 197, 0.15)" 
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.h3 
                className="text-lg font-semibold uppercase tracking-wide mb-8 text-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ type: "spring", ...springConfig, delay: 0.4 }}
              >
                Good News, It&apos;s Your Lucky Day!
              </motion.h3>
              <div className="space-y-6">
                {solutions.map((solution, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ 
                      type: "spring", 
                      stiffness: 100, 
                      damping: 15, 
                      delay: 0.5 + index * 0.1 
                    }}
                    className="flex items-start gap-4"
                  >
                    <motion.div 
                      className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#E3F2FD]"
                      whileHover={{ 
                        scale: 1.1, 
                        backgroundColor: "#BBDEFB",
                        rotate: 10,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      <Check className="h-4 w-4 text-[#2196F3]" />
                    </motion.div>
                    <p className="text-foreground/80 text-base leading-relaxed pt-1">
                      {solution}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
