"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronLeft, ChevronRight, Terminal } from "lucide-react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import Image from "next/image"

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
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Check for hash to auto-show Sipho's review
  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('testimonials')
      if (section) {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2 && rect.bottom > 0) {
          // When in view, show the system logs after a delay
          setTimeout(() => setShowLogs(true), 500)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Jump to Sipho's review (index 3) when triggered by the throughput test
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          // Check if we should show Sipho's review
          const url = new URL(window.location.href)
          if (url.hash === '#testimonials') {
            setCurrentIndex(3) // Sipho D.'s review
            setShowLogs(true)
          }
        }
      })
    })

    observer.observe(document.body, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} id="testimonials" className="py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground mb-6"
          >
            Recent Reviews
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-normal text-foreground font-serif text-balance"
          >
            Check Out Our Recent Reviews
          </motion.h2>
        </div>
        
        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="rounded-2xl bg-foreground text-background p-8 lg:p-12">
            {/* Large Quote Mark */}
            <div className="flex justify-center mb-8">
              <svg className="h-12 w-12 text-background/30" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
              </svg>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <blockquote className="text-lg lg:text-xl font-normal leading-relaxed mb-8 max-w-3xl mx-auto">
                  {testimonials[currentIndex].quote}
                </blockquote>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="relative h-12 w-12 rounded-full overflow-hidden bg-background/20">
                    <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-background/70">{testimonials[currentIndex].role}</p>
                  </div>
                </div>

                {/* System Log - Engineering Twist */}
                <AnimatePresence>
                  {showLogs && (
                    <motion.div
                      initial={{ opacity: 0, y: 20, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: 20, height: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="mt-8 mx-auto max-w-md"
                    >
                      <div className="rounded-lg bg-[#0f1419] border border-[#22C55E]/30 overflow-hidden">
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
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="flex items-center justify-between text-xs font-mono"
                            >
                              <span className="text-gray-500">[LOG]: {log.label}:</span>
                              <span className="text-[#22C55E]">{log.value}</span>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <div className="absolute top-1/2 -translate-y-1/2 left-4 lg:left-8">
              <button
                onClick={prevTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-8">
              <button
                onClick={nextTestimonial}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 w-2 rounded-full transition-all ${
                    index === currentIndex ? "bg-background w-6" : "bg-background/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
