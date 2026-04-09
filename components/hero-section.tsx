"use client"

import { useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

// Spring configuration for smooth animations
const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLDivElement>(null)
  const isValueInView = useInView(valueRef, { once: true, margin: "-20%" })

  // Scroll-based parallax transforms
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })

  // Smooth scroll progress with spring physics
  const smoothProgress = useSpring(scrollYProgress, springConfig)

  // Parallax effects
  const headlineY = useTransform(smoothProgress, [0, 1], [0, 100])
  const badgeY = useTransform(smoothProgress, [0, 1], [0, 50])
  const ctaY = useTransform(smoothProgress, [0, 1], [0, 75])
  const contentOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0])

  // Value proposition section transforms
  const { scrollYProgress: valueScrollProgress } = useScroll({
    target: valueRef,
    offset: ["start end", "center center"],
  })

  const imageScale = useTransform(valueScrollProgress, [0, 1], [0.9, 1])
  const imageX = useTransform(valueScrollProgress, [0, 1], [-50, 0])
  const contentX = useTransform(valueScrollProgress, [0, 1], [50, 0])

  const smoothImageScale = useSpring(imageScale, springConfig)
  const smoothImageX = useSpring(imageX, springConfig)
  const smoothContentX = useSpring(contentX, springConfig)

  return (
    <section ref={sectionRef} className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.div 
          className="mx-auto max-w-3xl text-center"
          style={{ opacity: contentOpacity }}
        >
          {/* Scarcity Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...springConfig }}
            style={{ y: badgeY }}
            className="mb-8 flex items-center justify-center"
          >
            <motion.span 
              className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Only Taking 3 clients per month
            </motion.span>
          </motion.div>
          
          {/* Main Headline - Serif Font */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...springConfig, delay: 0.1 }}
            style={{ y: headlineY }}
            className="text-balance text-4xl font-normal tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1] font-serif"
          >
            Don&apos;t Just Design Growth.{" "}
            <motion.span 
              className="italic inline-block"
              initial={{ opacity: 0, rotateX: -20 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.3 }}
            >
              Engineer It.
            </motion.span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...springConfig, delay: 0.2 }}
            className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            You&apos;ve invested too much into your business for your website to hold it back.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", ...springConfig, delay: 0.3 }}
            style={{ y: ctaY }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button 
                asChild
                size="lg" 
                className="h-12 px-8 text-base bg-foreground text-background hover:bg-foreground/90 rounded-full"
              >
                <Link href="https://cal.com/bonny-cfb1wp" target="_blank" rel="noopener noreferrer">
                  Yes I Want That!
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
            
            {/* Handwritten annotation */}
            <motion.p 
              className="text-base text-muted-foreground font-[family-name:var(--font-caveat)]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", ...springConfig, delay: 0.5 }}
            >
              <span className="inline-flex items-center gap-1">
                <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Link to book a call
              </span>
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Value Proposition Section */}
        <motion.div
          ref={valueRef}
          initial={{ opacity: 0 }}
          animate={isValueInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-24 grid gap-12 lg:grid-cols-2 items-center"
        >
          {/* Image with parallax scale */}
          <motion.div 
            className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted"
            style={{ 
              scale: smoothImageScale,
              x: smoothImageX,
            }}
          >
            <Image
              src="/images/founder.jpg"
              alt="Get a Site That Actually Brings You Clients"
              fill
              className="object-cover"
            />
            {/* Overlay gradient on scroll */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent"
              style={{ opacity: useTransform(valueScrollProgress, [0, 1], [0, 0.3]) }}
            />
          </motion.div>

          {/* Content with parallax slide */}
          <motion.div style={{ x: smoothContentX }}>
            <motion.h2 
              className="text-2xl sm:text-3xl font-normal text-foreground font-serif leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={isValueInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", ...springConfig, delay: 0.1 }}
            >
              Get a Site That Actually Brings You Clients
            </motion.h2>
            <motion.p 
              className="mt-4 text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={isValueInView ? { opacity: 1, y: 0 } : {}}
              transition={{ type: "spring", ...springConfig, delay: 0.2 }}
            >
              A website isn&apos;t just a &quot;nice-to-have&quot;, it&apos;s a tool that can win or lose customers. When built right, it builds trust, guides action, and helps your business grow on autopilot.
            </motion.p>
            
            <ul className="mt-8 space-y-4">
              {[
                "Built to convert, not just look pretty",
                "Fast load times for better user experience",
                "Designed to build trust in seconds",
                "Structured to rank better on Google",
              ].map((item, index) => (
                <motion.li 
                  key={index}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isValueInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    type: "spring", 
                    stiffness: 100, 
                    damping: 15, 
                    delay: 0.3 + index * 0.1 
                  }}
                >
                  <motion.div 
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-border mt-0.5"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(180, 156, 197, 0.2)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Check className="h-3.5 w-3.5 text-foreground" />
                  </motion.div>
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
