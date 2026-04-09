"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useSpring, useTransform } from "framer-motion"
import { Building2, GitBranch, Framer, Bot, Code } from "lucide-react"

interface NodeData {
  id: string
  icon: React.ReactNode
  title: string
  label: string
  position: { x: number; y: number }
}

const nodes: NodeData[] = [
  {
    id: "trigger",
    icon: <Building2 className="h-6 w-6" />,
    title: "CIPC BizPortal",
    label: "Trigger",
    position: { x: 50, y: 8 },
  },
  {
    id: "branch",
    icon: <GitBranch className="h-6 w-6" />,
    title: "System Audit?",
    label: "Branch-1",
    position: { x: 50, y: 32 },
  },
  {
    id: "action-a",
    icon: <Framer className="h-6 w-6" />,
    title: "Digital Architecture",
    label: "#infrastructure",
    position: { x: 25, y: 56 },
  },
  {
    id: "action-b",
    icon: <Bot className="h-6 w-6" />,
    title: "Agentic Assets",
    label: "automation-2",
    position: { x: 75, y: 56 },
  },
  {
    id: "final",
    icon: <Code className="h-6 w-6" />,
    title: "Autonomous Ops",
    label: "logic-engine",
    position: { x: 50, y: 80 },
  },
]

function LogicNode({
  node,
  isActive,
  delay,
}: {
  node: NodeData
  isActive: boolean
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay,
      }}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${node.position.x}%`,
        top: `${node.position.y}%`,
      }}
    >
      <motion.div
        animate={{
          y: isActive ? -4 : 0,
          boxShadow: isActive
            ? "0px 8px 24px rgba(180, 156, 197, 0.25)"
            : "0px 4px 12px rgba(0,0,0,0.05)",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="relative flex flex-col items-center gap-2 rounded-[20px] bg-white px-6 py-4 min-w-[160px]"
      >
        {/* Icon container with glow effect */}
        <motion.div
          animate={{
            boxShadow: isActive
              ? "0 0 20px rgba(180, 156, 197, 0.5)"
              : "0 0 0px rgba(180, 156, 197, 0)",
          }}
          transition={{ duration: 0.3 }}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F8F6FA] text-[#6B5B7A]"
        >
          {node.icon}
        </motion.div>

        {/* Title */}
        <span className="font-semibold text-[#2D2438] text-sm">{node.title}</span>

        {/* Label pill */}
        <span className="rounded-full bg-[#F8F6FA] px-3 py-1 text-xs text-[#8B7A9E] font-medium">
          {node.label}
        </span>
      </motion.div>
    </motion.div>
  )
}

function ConnectorPaths({
  scrollProgress,
  activeNodeIndex,
}: {
  scrollProgress: number
  activeNodeIndex: number
}) {
  // Calculate path drawing progress based on scroll
  const path1Progress = Math.min(1, scrollProgress * 4) // Trigger to Branch
  const path2Progress = Math.max(0, Math.min(1, (scrollProgress - 0.25) * 4)) // Branch to Action A
  const path3Progress = Math.max(0, Math.min(1, (scrollProgress - 0.25) * 4)) // Branch to Action B
  const path4Progress = Math.max(0, Math.min(1, (scrollProgress - 0.5) * 4)) // Action A to Final
  const path5Progress = Math.max(0, Math.min(1, (scrollProgress - 0.5) * 4)) // Action B to Final

  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Gradient for the pulse effect */}
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B49CC5" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#B49CC5" stopOpacity="1" />
          <stop offset="100%" stopColor="#B49CC5" stopOpacity="0.2" />
        </linearGradient>

        {/* Filter for glow effect on pulse */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Path 1: Trigger to Branch (vertical) */}
      <path
        d="M 50 13 L 50 27"
        fill="none"
        stroke="#E5E0EB"
        strokeWidth="0.3"
        strokeLinecap="round"
      />
      <motion.path
        d="M 50 13 L 50 27"
        fill="none"
        stroke="#B49CC5"
        strokeWidth="0.3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: path1Progress }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Path 2: Branch to Action A (down-left with rounded corner) */}
      <path
        d="M 50 37 L 50 45 Q 50 48 47 48 L 28 48 Q 25 48 25 51 L 25 51"
        fill="none"
        stroke="#E5E0EB"
        strokeWidth="0.3"
        strokeLinecap="round"
      />
      <motion.path
        d="M 50 37 L 50 45 Q 50 48 47 48 L 28 48 Q 25 48 25 51 L 25 51"
        fill="none"
        stroke="#B49CC5"
        strokeWidth="0.3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: path2Progress }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* "Yes" pill on left branch */}
      {path2Progress > 0.3 && (
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <rect
            x="32"
            y="45"
            width="8"
            height="4"
            rx="2"
            fill="white"
            stroke="#B49CC5"
            strokeWidth="0.2"
          />
          <text
            x="36"
            y="47.8"
            textAnchor="middle"
            fontSize="2"
            fill="#6B5B7A"
            fontWeight="500"
          >
            Yes
          </text>
        </motion.g>
      )}

      {/* Path 3: Branch to Action B (down-right with rounded corner) */}
      <path
        d="M 50 37 L 50 45 Q 50 48 53 48 L 72 48 Q 75 48 75 51 L 75 51"
        fill="none"
        stroke="#E5E0EB"
        strokeWidth="0.3"
        strokeLinecap="round"
      />
      <motion.path
        d="M 50 37 L 50 45 Q 50 48 53 48 L 72 48 Q 75 48 75 51 L 75 51"
        fill="none"
        stroke="#B49CC5"
        strokeWidth="0.3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: path3Progress }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* "Process" pill on right branch */}
      {path3Progress > 0.3 && (
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <rect
            x="56"
            y="45"
            width="12"
            height="4"
            rx="2"
            fill="white"
            stroke="#B49CC5"
            strokeWidth="0.2"
          />
          <text
            x="62"
            y="47.8"
            textAnchor="middle"
            fontSize="2"
            fill="#6B5B7A"
            fontWeight="500"
          >
            Process
          </text>
        </motion.g>
      )}

      {/* Path 4: Action A to Final (down-right with rounded corner) */}
      <path
        d="M 25 61 L 25 68 Q 25 71 28 71 L 47 71 Q 50 71 50 74 L 50 75"
        fill="none"
        stroke="#E5E0EB"
        strokeWidth="0.3"
        strokeLinecap="round"
      />
      <motion.path
        d="M 25 61 L 25 68 Q 25 71 28 71 L 47 71 Q 50 71 50 74 L 50 75"
        fill="none"
        stroke="#B49CC5"
        strokeWidth="0.3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: path4Progress }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Path 5: Action B to Final (down-left with rounded corner) */}
      <path
        d="M 75 61 L 75 68 Q 75 71 72 71 L 53 71 Q 50 71 50 74 L 50 75"
        fill="none"
        stroke="#E5E0EB"
        strokeWidth="0.3"
        strokeLinecap="round"
      />
      <motion.path
        d="M 75 61 L 75 68 Q 75 71 72 71 L 53 71 Q 50 71 50 74 L 50 75"
        fill="none"
        stroke="#B49CC5"
        strokeWidth="0.3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: path5Progress }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* Animated pulse dots */}
      {activeNodeIndex >= 1 && (
        <motion.circle
          r="0.8"
          fill="#B49CC5"
          filter="url(#glow)"
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          style={{ offsetPath: "path('M 50 13 L 50 27')" }}
        />
      )}
      {activeNodeIndex >= 2 && (
        <>
          <motion.circle
            r="0.8"
            fill="#B49CC5"
            filter="url(#glow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.3 }}
            style={{
              offsetPath:
                "path('M 50 37 L 50 45 Q 50 48 47 48 L 28 48 Q 25 48 25 51 L 25 51')",
            }}
          />
          <motion.circle
            r="0.8"
            fill="#B49CC5"
            filter="url(#glow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.6 }}
            style={{
              offsetPath:
                "path('M 50 37 L 50 45 Q 50 48 53 48 L 72 48 Q 75 48 75 51 L 75 51')",
            }}
          />
        </>
      )}
      {activeNodeIndex >= 4 && (
        <>
          <motion.circle
            r="0.8"
            fill="#B49CC5"
            filter="url(#glow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.2 }}
            style={{
              offsetPath:
                "path('M 25 61 L 25 68 Q 25 71 28 71 L 47 71 Q 50 71 50 74 L 50 75')",
            }}
          />
          <motion.circle
            r="0.8"
            fill="#B49CC5"
            filter="url(#glow)"
            initial={{ offsetDistance: "0%" }}
            animate={{ offsetDistance: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
            style={{
              offsetPath:
                "path('M 75 61 L 75 68 Q 75 71 72 71 L 53 71 Q 50 71 50 74 L 50 75')",
            }}
          />
        </>
      )}
    </svg>
  )
}

export function LogicMapSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, margin: "-20%" })
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeNodeIndex, setActiveNodeIndex] = useState(-1)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionHeight = rect.height

      // Calculate progress: 0 when entering view, 1 when leaving
      const progress = Math.max(
        0,
        Math.min(1, (windowHeight - rect.top) / (windowHeight + sectionHeight))
      )

      setScrollProgress(progress)

      // Determine which node should be active based on progress
      if (progress < 0.2) setActiveNodeIndex(-1)
      else if (progress < 0.35) setActiveNodeIndex(0)
      else if (progress < 0.5) setActiveNodeIndex(1)
      else if (progress < 0.65) setActiveNodeIndex(2)
      else if (progress < 0.8) setActiveNodeIndex(3)
      else setActiveNodeIndex(4)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Dotted Grid Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, #E5E5E5 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-[#8B7A9E] uppercase tracking-wider">
            The Assembly Line
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-normal text-foreground font-serif">
            How We Engineer Your Growth
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Watch your business transformation flow through our systematic process
          </p>
        </motion.div>

        {/* Logic Node Map */}
        <div className="relative h-[600px] lg:h-[700px]">
          {/* SVG Connectors */}
          {isInView && (
            <ConnectorPaths
              scrollProgress={scrollProgress}
              activeNodeIndex={activeNodeIndex}
            />
          )}

          {/* Nodes */}
          {isInView &&
            nodes.map((node, index) => (
              <LogicNode
                key={node.id}
                node={node}
                isActive={activeNodeIndex >= index}
                delay={index * 0.15}
              />
            ))}
        </div>
      </div>
    </section>
  )
}
