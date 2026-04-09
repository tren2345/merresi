"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, X } from "lucide-react"

const comparisonItems = [
  { feature: "Custom code, not templates", us: true, others: false },
  { feature: "Python automation included", us: true, others: false },
  { feature: "IE principles applied", us: true, others: false },
  { feature: "CIPC integration ready", us: true, others: false },
  { feature: "Conversion-focused design", us: true, others: false },
  { feature: "Ongoing optimization", us: true, others: false },
]

export function ComparisonSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#FAFAFA]"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#8B7A9E] uppercase tracking-wider">
            The Difference
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-normal text-foreground font-serif">
            Engineering vs. Just Design
          </h2>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-[20px] bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          {/* Header Row */}
          <div className="grid grid-cols-3 bg-[#F8F6FA] p-4">
            <div className="text-sm font-medium text-[#6B5B7A]">Feature</div>
            <div className="text-sm font-medium text-[#6B5B7A] text-center">
              Meresimplicity
            </div>
            <div className="text-sm font-medium text-[#6B5B7A] text-center">
              Typical Agencies
            </div>
          </div>

          {/* Comparison Rows */}
          {comparisonItems.map((item, index) => (
            <motion.div
              key={item.feature}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              className="grid grid-cols-3 p-4 border-t border-[#F0EDF3] items-center"
            >
              <div className="text-sm text-[#2D2438]">{item.feature}</div>
              <div className="flex justify-center">
                {item.us ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F5E9]">
                    <Check className="h-4 w-4 text-[#4CAF50]" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFEBEE]">
                    <X className="h-4 w-4 text-[#EF5350]" />
                  </div>
                )}
              </div>
              <div className="flex justify-center">
                {item.others ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F5E9]">
                    <Check className="h-4 w-4 text-[#4CAF50]" />
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FFEBEE]">
                    <X className="h-4 w-4 text-[#EF5350]" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
