"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Frown, Check } from "lucide-react"

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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-white"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-normal text-foreground font-serif">
            Business Owners Frustrations Into Solutions
          </h2>
        </motion.div>

        {/* Two Card Layout */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Pain Points Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-2xl bg-foreground text-white p-8"
          >
            <h3 className="text-lg font-semibold uppercase tracking-wide mb-8">
              Does This Sound And Feel Familiar?
            </h3>
            <div className="space-y-6">
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 border border-white/20">
                    <Frown className="h-4 w-4 text-white/70" />
                  </div>
                  <p className="text-white/90 text-base leading-relaxed pt-1">
                    {point}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="rounded-2xl bg-[#FAFAFA] border border-foreground/10 p-8"
          >
            <h3 className="text-lg font-semibold uppercase tracking-wide mb-8 text-foreground">
              Good News, It&apos;s Your Lucky Day!
            </h3>
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-[#E3F2FD]">
                    <Check className="h-4 w-4 text-[#2196F3]" />
                  </div>
                  <p className="text-foreground/80 text-base leading-relaxed pt-1">
                    {solution}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
