"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 lg:pt-40 lg:pb-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Scarcity Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center justify-center"
          >
            <span className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground">
              Only Taking 3 clients per month
            </span>
          </motion.div>
          
          {/* Main Headline - Serif Font */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-balance text-4xl font-normal tracking-tight text-foreground sm:text-5xl lg:text-6xl leading-[1.1] font-serif"
          >
            Don&apos;t Just Design Growth.{" "}
            <span className="italic">Engineer It.</span>
          </motion.h1>
          
          {/* Subheadline */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto"
          >
            You&apos;ve invested too much into your business for your website to hold it back.
          </motion.p>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
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
            
            {/* Handwritten annotation */}
            <p className="text-base text-muted-foreground font-[family-name:var(--font-caveat)]">
              <span className="inline-flex items-center gap-1">
                <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                Link to book a call
              </span>
            </p>
          </motion.div>
        </div>

        {/* Value Proposition Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-24 grid gap-12 lg:grid-cols-2 items-center"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
            <Image
              src="/images/founder.jpg"
              alt="Get a Site That Actually Brings You Clients"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-normal text-foreground font-serif leading-tight">
              Get a Site That Actually Brings You Clients
            </h2>
            <p className="mt-4 text-muted-foreground">
              A website isn&apos;t just a &quot;nice-to-have&quot;, it&apos;s a tool that can win or lose customers. When built right, it builds trust, guides action, and helps your business grow on autopilot.
            </p>
            
            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border mt-0.5">
                  <Check className="h-3.5 w-3.5 text-foreground" />
                </div>
                <span className="text-foreground">Built to convert, not just look pretty</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border mt-0.5">
                  <Check className="h-3.5 w-3.5 text-foreground" />
                </div>
                <span className="text-foreground">Fast load times for better user experience</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border mt-0.5">
                  <Check className="h-3.5 w-3.5 text-foreground" />
                </div>
                <span className="text-foreground">Designed to build trust in seconds</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full border border-border mt-0.5">
                  <Check className="h-3.5 w-3.5 text-foreground" />
                </div>
                <span className="text-foreground">Structured to rank better on Google</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
