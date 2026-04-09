"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Sparkles } from "lucide-react"
import Image from "next/image"

const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" })

  // Scroll-based transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  })

  const smoothProgress = useSpring(scrollYProgress, springConfig)
  
  // Header parallax
  const headerY = useTransform(smoothProgress, [0, 1], [50, 0])
  const headerOpacity = useTransform(smoothProgress, [0, 0.5], [0, 1])
  
  // Cal.com widget scale effect
  const widgetScale = useTransform(smoothProgress, [0, 1], [0.95, 1])
  const widgetX = useTransform(smoothProgress, [0, 1], [-30, 0])
  
  // Photo parallax
  const photoX = useTransform(smoothProgress, [0, 1], [30, 0])
  const photoRotate = useTransform(smoothProgress, [0, 1], [5, 0])

  const smoothHeaderY = useSpring(headerY, springConfig)
  const smoothWidgetScale = useSpring(widgetScale, springConfig)
  const smoothWidgetX = useSpring(widgetX, springConfig)
  const smoothPhotoX = useSpring(photoX, springConfig)
  const smoothPhotoRotate = useSpring(photoRotate, springConfig)

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 lg:py-32 bg-white overflow-hidden"
    >
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          style={{ y: smoothHeaderY, opacity: headerOpacity }}
          className="text-center mb-12"
        >
          <motion.span 
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-white px-4 py-1.5 text-sm font-medium text-foreground shadow-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", ...springConfig }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Sparkles className="h-4 w-4" />
            </motion.div>
            Application Form
          </motion.span>
          <motion.h2 
            className="mt-6 text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground font-serif"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", ...springConfig, delay: 0.1 }}
          >
            Apply Now to Work With Us.
            <br />
            <motion.span 
              className="font-serif italic"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              (Only 3 Spots Per Month)
            </motion.span>
          </motion.h2>
          <motion.p 
            className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", ...springConfig, delay: 0.2 }}
          >
            I only work with ambitious businesses looking to take their business to the next level.
            If that&apos;s you, apply below and let&apos;s find out if we&apos;re a fit.
          </motion.p>
        </motion.div>

        {/* Cal.com Widget + Photo Layout */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8">
          {/* Cal.com Embed */}
          <motion.div
            style={{ scale: smoothWidgetScale, x: smoothWidgetX }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-1 max-w-2xl"
          >
            <motion.div
              className="rounded-2xl overflow-hidden shadow-[0px_8px_30px_rgba(0,0,0,0.12)] bg-white"
              whileHover={{ 
                boxShadow: "0px_16px_50px_rgba(180,156,197,0.2)",
                y: -4
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <iframe
                src="https://cal.com/bonny-cfb1wp?embed=true&theme=light"
                className="w-full h-[600px] border-0"
                title="Book a call"
              />
            </motion.div>
          </motion.div>

          {/* Professional Photo */}
          <motion.div
            style={{ x: smoothPhotoX, rotate: smoothPhotoRotate }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="hidden lg:block w-80"
          >
            <motion.div
              className="rounded-2xl overflow-hidden shadow-[0px_8px_30px_rgba(0,0,0,0.12)] h-full"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0px_16px_50px_rgba(180,156,197,0.25)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ type: "spring", ...springConfig, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-8 text-muted-foreground"
        >
          {[
            "No commitment required",
            "Free growth audit",
            "Actionable insights"
          ].map((item, index) => (
            <motion.div 
              key={item}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 15, 
                delay: 0.7 + index * 0.1 
              }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.svg 
                className="h-5 w-5 text-[#4CAF50]" 
                fill="currentColor" 
                viewBox="0 0 20 20"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15, 
                  delay: 0.8 + index * 0.1 
                }}
              >
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </motion.svg>
              <span className="text-sm">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
