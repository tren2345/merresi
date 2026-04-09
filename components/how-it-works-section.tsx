"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PhoneCall, ClipboardCheck, Rocket, BarChart3 } from "lucide-react"

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

  return (
    <section
      ref={sectionRef}
      id="process"
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
            Our Process
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-normal text-foreground font-serif">
            From Chaos to Clarity in 4 Steps
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#E5E0EB] hidden lg:block" />

          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => (
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
                  index % 2 === 0 ? "" : "lg:direction-rtl"
                }`}
              >
                {/* Step Number Circle */}
                <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B49CC5] text-white font-semibold shadow-[0px_4px_12px_rgba(180,156,197,0.3)]">
                    {index + 1}
                  </div>
                </div>

                {/* Content Card */}
                <div
                  className={`${
                    index % 2 === 0 ? "lg:pr-16" : "lg:col-start-2 lg:pl-16"
                  }`}
                >
                  <div className="flex flex-col p-6 rounded-[20px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.05)]">
                    {/* Mobile Step Number */}
                    <div className="flex items-center gap-4 mb-4 lg:hidden">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#B49CC5] text-white text-sm font-semibold">
                        {index + 1}
                      </div>
                    </div>

                    {/* Icon */}
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F6FA] text-[#6B5B7A] mb-4">
                      {step.icon}
                    </div>

                    {/* Content */}
                    <h3 className="font-semibold text-[#2D2438] text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[#8B7A9E] text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Empty column for alternating layout */}
                {index % 2 === 0 ? (
                  <div className="hidden lg:block" />
                ) : (
                  <div className="hidden lg:block lg:col-start-1 lg:row-start-1" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
