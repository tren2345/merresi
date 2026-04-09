"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Code, Palette, LineChart, Cog, Globe, Shield } from "lucide-react"

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

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-24 lg:py-32"
    >
      {/* Dotted Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, #E5E5E5 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#8B7A9E] uppercase tracking-wider">
            What We Build
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-normal text-foreground font-serif">
            Engineering Excellence, Delivered
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            We combine technical expertise with business acumen to create systems that drive real growth.
          </p>
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
              <div className="h-full flex flex-col p-6 rounded-[20px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0px_8px_24px_rgba(180,156,197,0.15)] transition-all duration-300 hover:-translate-y-1">
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F6FA] text-[#6B5B7A] mb-4">
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="font-semibold text-[#2D2438] text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-[#8B7A9E] text-sm flex-grow">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
