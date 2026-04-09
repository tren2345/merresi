"use client"

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react"
import { useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion"

interface ScrollContextType {
  scrollY: MotionValue<number>
  scrollYSmooth: MotionValue<number>
  scrollProgress: MotionValue<number>
  scrollDirection: "up" | "down"
  isScrolling: boolean
}

const ScrollContext = createContext<ScrollContextType | null>(null)

export function useScrollContext() {
  const context = useContext(ScrollContext)
  if (!context) {
    throw new Error("useScrollContext must be used within ScrollProvider")
  }
  return context
}

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down")
  const [isScrolling, setIsScrolling] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const scrollY = useMotionValue(0)
  
  // Smooth spring-based scroll value with custom physics
  const scrollYSmooth = useSpring(scrollY, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  })

  // Calculate total document scroll progress (0-1)
  const scrollProgress = useTransform(scrollY, (value) => {
    if (typeof window === "undefined") return 0
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    return docHeight > 0 ? value / docHeight : 0
  })

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY
    scrollY.set(currentScrollY)

    // Determine scroll direction
    if (currentScrollY > lastScrollY) {
      setScrollDirection("down")
    } else if (currentScrollY < lastScrollY) {
      setScrollDirection("up")
    }
    setLastScrollY(currentScrollY)
    setIsScrolling(true)
  }, [lastScrollY, scrollY])

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout

    const onScroll = () => {
      handleScroll()
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      clearTimeout(scrollTimeout)
    }
  }, [handleScroll])

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        scrollYSmooth,
        scrollProgress,
        scrollDirection,
        isScrolling,
      }}
    >
      {children}
    </ScrollContext.Provider>
  )
}
