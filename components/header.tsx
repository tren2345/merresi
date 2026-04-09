"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion"

const navigation = [
  { name: "Services", href: "#services" },
  { name: "Process", href: "#process" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQ", href: "#faq" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const scrollY = useMotionValue(0)
  const scrollYSmooth = useSpring(scrollY, { stiffness: 100, damping: 30 })
  
  // Header background opacity based on scroll
  const headerBgOpacity = useTransform(scrollYSmooth, [0, 100], [0.8, 0.95])
  const headerBlur = useTransform(scrollYSmooth, [0, 100], [8, 16])
  
  // Header Y position for hide/show effect
  const headerY = useSpring(0, { stiffness: 300, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      scrollY.set(currentScrollY)
      
      setIsScrolled(currentScrollY > 20)
      
      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true)
        headerY.set(-100)
      } else {
        setIsHidden(false)
        headerY.set(0)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY, scrollY, headerY])

  // Smooth scroll to section
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const targetId = href.replace("#", "")
    const element = document.getElementById(targetId)
    if (element) {
      const offsetTop = element.offsetTop - 80
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <motion.header
      style={{ y: headerY }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        style={{
          backgroundColor: `rgba(255, 255, 255, ${isScrolled ? 0.95 : 0.8})`,
          backdropFilter: `blur(${isScrolled ? 16 : 8}px)`,
        }}
        className="border-b border-border"
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-semibold text-foreground">
                Meresimplicity
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                  delay: index * 0.1,
                }}
              >
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="relative text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  {item.name}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-0.5 bg-[#B49CC5] rounded-full"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="hidden lg:flex lg:items-center lg:gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                asChild
                className="h-10 px-6 bg-foreground text-background hover:bg-foreground/90 rounded-full"
              >
                <Link href="https://cal.com/bonny-cfb1wp" target="_blank" rel="noopener noreferrer">
                  Book a Call
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            type="button"
            className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <span className="sr-only">Toggle menu</span>
            <AnimatePresence mode="wait">
              {mobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </nav>
      </motion.div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-4 space-y-4">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.05,
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="block text-base text-muted-foreground hover:text-foreground"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              >
                <Button
                  asChild
                  className="w-full h-10 bg-foreground text-background hover:bg-foreground/90 rounded-full"
                >
                  <Link href="https://cal.com/bonny-cfb1wp" target="_blank" rel="noopener noreferrer">
                    Book a Call
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
