"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Sparkles } from "lucide-react"
import Image from "next/image"

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 bg-white"
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-white px-4 py-1.5 text-sm font-medium text-foreground shadow-sm">
            <Sparkles className="h-4 w-4" />
            Application Form
          </span>
          <h2 className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground font-serif">
            Apply Now to Work With Us.
            <br />
            <span className="font-serif italic">(Only 3 Spots Per Month)</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            I only work with ambitious businesses looking to take their business to the next level.
            If that&apos;s you, apply below and let&apos;s find out if we&apos;re a fit.
          </p>
        </motion.div>

        {/* Cal.com Widget + Photo Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col lg:flex-row items-stretch justify-center gap-8"
        >
          {/* Cal.com Embed */}
          <div className="flex-1 max-w-2xl rounded-2xl overflow-hidden shadow-[0px_8px_30px_rgba(0,0,0,0.12)] bg-white">
            <iframe
              src="https://cal.com/bonny-cfb1wp?embed=true&theme=light"
              className="w-full h-[600px] border-0"
              title="Book a call"
            />
          </div>

          {/* Professional Photo */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:block w-80 rounded-2xl overflow-hidden shadow-[0px_8px_30px_rgba(0,0,0,0.12)]"
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TsK0lVIuoFVgcRong9LOjxJbxKB8Lz.png"
              alt="Professional portrait"
              width={320}
              height={600}
              className="w-full h-full object-cover"
              priority
            />
          </motion.div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-[#4CAF50]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">No commitment required</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-[#4CAF50]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Free growth audit</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5 text-[#4CAF50]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Actionable insights</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
