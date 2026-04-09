"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What exactly is the Digital Assembly Line?",
    answer: "The Digital Assembly Line is our four-stage process that takes businesses from raw concept to automated enterprise: Stage 1 (Legal Infrastructure via CIPC), Stage 2 (Digital Architecture via Framer), Stage 3 (AI Branding), and Stage 4 (Python & n8n Automation). Each stage is engineered using Industrial Engineering principles for maximum efficiency.",
  },
  {
    question: "How quickly can you register my Pty Ltd?",
    answer: "Through our direct CIPC BizPortal integration, we can facilitate same-day Pty Ltd registrations. This includes name reservation, company registration, and initial SARS tax compliance setup. Full operational compliance is typically achieved within 48-72 hours.",
  },
  {
    question: "What makes your Framer websites different?",
    answer: "We don't just build pretty websites - we engineer conversion-focused sales engines. Our sites feature -3% letter-spacing typography, bento-box UI patterns, mobile-first design, and are optimized for 95+ PageSpeed scores. Every element is designed to convert visitors into customers.",
  },
  {
    question: "What kind of automations can you build?",
    answer: "Using Python and n8n, we can automate virtually any repetitive business process: order processing, invoice generation, customer onboarding, email sequences, report generation, data syncing between platforms, and more. Our clients typically eliminate 90%+ of manual administrative tasks.",
  },
  {
    question: "Who is behind Meresimplicity?",
    answer: "Meresimplicity was founded by Modipa Kgothatso Bonny, an Industrial Engineering specialist and Python-certified developer. The firm operates on the principle that a business is a high-output machine that must be engineered for maximum efficiency and zero technical waste.",
  },
  {
    question: "Do I need all four stages?",
    answer: "Not necessarily. While the full Digital Assembly Line delivers the most comprehensive transformation, each stage can be implemented independently based on your current needs. Many clients start with one stage and add others as they scale.",
  },
]

export function FAQSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section ref={ref} id="faq" className="py-20 lg:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground mb-6"
          >
            FAQ
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-normal text-foreground font-serif text-balance"
          >
            Common questions answered
          </motion.h2>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-foreground hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
