"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Terminal } from "lucide-react"
import { motion, AnimatePresence, useInView, useScroll, useTransform, useSpring } from "framer-motion"
import Image from "next/image"

const springConfig = { stiffness: 100, damping: 30, mass: 0.5 }

const testimonials = [
  {
    quote: "I really enjoyed working with you. You were very productive and efficient and a good listener to all of my needs for the website you created for me. I really appreciate how quickly you were able to make the website and add complex additions to it.",
    name: "Nico",
    role: "Car Detailing Owner",
    image: "/images/testimonial-1.jpg",
    logs: [
      { label: "Delivery Time", value: "48hrs" },
      { label: "Revisions", value: "2" },
      { label: "Status", value: "Deployed" },
    ]
  },
  {
    quote: "Before Meresimplicity, getting my Pty Ltd registered felt like navigating a maze. Their CIPC integration had me operational in 48 hours with all compliance boxes ticked.",
    name: "Thabo M.",
    role: "Tech Startup Founder",
    image: "/images/testimonial-2.jpg",
    logs: [
      { label: "Registration Time", value: "48hrs" },
      { label: "Compliance Rate", value: "100%" },
      { label: "Status", value: "Operational" },
    ]
  },
  {
    quote: "The Python automations they built eliminated 20+ hours of manual work per week. My team now focuses on growth instead of repetitive admin tasks.",
    name: "Naledi K.",
    role: "E-commerce Business Owner",
    image: "/images/testimonial-3.jpg",
    logs: [
      { label: "Hours Saved/Week", value: "20+" },
      { label: "Task Automation", value: "95%" },
      { label: "Status", value: "Optimized" },
    ]
  },
  {
    quote: "I needed a website that actually converts - not just looks pretty. Meresimplicity delivered a Framer site that increased my leads by 340% in the first month.",
    name: "Sipho D.",
    role: "Consulting Agency CEO",
    image: "/images/testimonial-4.jpg",
    logs: [
      { label: "Throughput Increase", value: "+340%" },
      { label: "System Friction", value: "0%" },
      { label: "Status", value: "Optimized" },
    ]
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showLogs, setShowLogs] = useState(false)
  const [direction, setDirection] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Scroll-based transforms
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  })

  const smoothProgress = useSpring(scrollYProgress, springConfig)
  const cardScale = useTransform(smoothProgress, [0, 1], [0.9, 1])
  const cardY = useTransform(smoothProgress, [0, 1], [50, 0])
  const smoothScale = useSpring(cardScale, springConfig)
  const smoothY = useSpring(cardY, springConfig)

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('testimonials')
      if (section) {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
          setTimeout(() => setShowLogs(true), 500)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          const url = new URL(window.location.href)
          if (url.hash === '#testimonials') {
            setCurrentIndex(3)
            setShowLogs(true)
          }
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  }

  return (
    <section ref={ref} id="testimonials" className="py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", ...springConfig }}
            className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground mb-6"
          >
            Recent Reviews
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ type: "spring", ...springConfig, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-normal text-foreground font-serif text-balance"
          >
            Check Out Our Recent Reviews
          </motion.h2>
        </div>
        
        {/* Testimonial Carousel with scroll transform */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ scale: smoothScale, y: smoothY }}
          className="relative"
        >
          <motion.div 
            className="rounded-2xl bg-foreground text-background p-8 lg:p-12"
            whileHover={{ boxShadow: "0px 20px 60px rgba(0,0,0,0.3)" }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Large Quote Mark */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
            >
              <svg className="h-12 w-12 text-background/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </motion.div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { type: "spring", stiffness: 300, damping: 30 },
                }}
                className="text-center"
              >
                <blockquote className="text-lg lg:text-xl font-normal leading-relaxed mb-8 max-w-3xl mx-auto">
                  {testimonials[currentIndex].quote}
                </blockquote>
                
                <motion.div 
                  className="flex items-center justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
                >
                  <motion.div 
                    className="relative h-12 w-12 rounded-full overflow-hidden bg-background/20"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                  <div className="text-left">
                    <p className="font-semibold">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-background/70">{testimonials[currentIndex].role}</p>
                  </div>
                </motion.div>

                {/* System Log - Engineering Twist */}
                <AnimatePresence>
                  {showLogs && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 20, height: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                      className="mt-8 mx-auto max-w-md"
                    >
                      <motion.div 
                        className="rounded-lg bg-[#0f1419] border border-[#22C55E]/30 overflow-hidden"
                        whileHover={{ borderColor: "rgba(34, 197, 94, 0.6)" }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Log Header */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] border-b border-[#22C55E]/20">
                          <Terminal className="h-3 w-3 text-[#22C55E]" />
                          <span className="text-[10px] font-mono text-[#22C55E]">SYSTEM_LOG</span>
                        </div>
                        {/* Log Content */}
                        <div className="p-4 space-y-2">
                          {testimonials[currentIndex].logs.map((log, i) => (
                            <motion.div
                              key={log.label}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                type: "spring", 
                                stiffness: 200, 
                                damping: 15, 
                                delay: 0.3 + i * 0.1 
                              }}
                              className="flex items-center justify-between text-xs font-mono"
                            >
                              <span className="text-gray-500">[LOG]: {log.label}:</span>
                              <motion.span 
                                className="text-[#22C55E]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 + i * 0.1 }}
                              >
                                {log.value}
                              </motion.span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 lg:left-8">
              <motion.button
                onClick={prevTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                whileHover={{ scale: 1.1, x: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-8">
              <motion.button
                onClick={nextTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
                whileHover={{ scale: 1.1, x: 2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-background w-6" : "bg-background/30 w-2"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
