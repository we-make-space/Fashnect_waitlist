"use client"
import React, { useRef, useEffect, useState } from "react"
import { motion } from "motion/react"

const GLOW_FILTER_ID = "fashnect-text-glow"

const rainbowStops = (
  <>
    <stop offset="0%" stopColor="#eab308" />
    <stop offset="25%" stopColor="#ef4444" />
    <stop offset="50%" stopColor="#3b82f6" />
    <stop offset="75%" stopColor="#06b6d4" />
    <stop offset="100%" stopColor="#8b5cf6" />
  </>
)

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string
  duration?: number
}) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [cursor, setCursor] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" })

  useEffect(() => {
    if (hovered && svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      })
    }
  }, [cursor, hovered])

  const maskAnimate = hovered
    ? maskPosition
    : {
        cx: ["28%", "72%", "72%", "28%", "28%"],
        cy: ["42%", "42%", "58%", "58%", "42%"],
      }

  const maskTransition = hovered
    ? { duration: duration ?? 0.12, ease: "easeOut" as const }
    : { duration: 8, ease: "easeInOut" as const, repeat: Infinity }

  return (
    <motion.div
      className="relative z-40 w-full pointer-events-auto"
      initial={{ opacity: 0.35, filter: "blur(8px) brightness(0.85)" }}
      animate={{ opacity: 1, filter: "blur(0px) brightness(1)" }}
      transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <svg
        ref={svgRef}
        width="100%"
        viewBox="0 0 520 120"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        onMouseEnter={(e) => {
          setHovered(true)
          const svg = svgRef.current
          if (svg) {
            const r = svg.getBoundingClientRect()
            setMaskPosition({
              cx: `${((e.clientX - r.left) / r.width) * 100}%`,
              cy: `${((e.clientY - r.top) / r.height) * 100}%`,
            })
          }
        }}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
        className="select-none relative bottom-0 block w-full h-auto min-h-[3.5rem] sm:min-h-[4.25rem] md:min-h-[5.25rem] lg:min-h-[5.75rem] leading-[0.5]"
        aria-hidden
      >
        <defs>
          <filter
            id={GLOW_FILTER_ID}
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.4" result="blur2">
              <animate
                attributeName="stdDeviation"
                values="2.1;3.4;2.1"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </feGaussianBlur>
            <feColorMatrix
              in="blur2"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.95 0"
              result="strong"
            />
            <feMerge>
              <feMergeNode in="strong" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient
            id="textGradient"
            gradientUnits="userSpaceOnUse"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            {rainbowStops}
          </linearGradient>

          <motion.radialGradient
            id="revealMask"
            gradientUnits="userSpaceOnUse"
            r="22%"
            initial={{ cx: "50%", cy: "50%" }}
            animate={maskAnimate}
            transition={maskTransition}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>
          <mask id="textMask">
            <rect x="0" y="0" width="100%" height="100%" fill="url(#revealMask)" />
          </mask>
        </defs>

        <g filter={`url(#${GLOW_FILTER_ID})`}>
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth="0.35"
            textLength={480}
            lengthAdjust="spacing"
            className="fill-transparent stroke-[#a8a8a8] font-[Helvetica,Arial,sans-serif] text-5xl font-bold"
            animate={{ opacity: [0.38, 0.72, 0.38] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {text}
          </motion.text>
          <motion.text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            strokeWidth="0.35"
            textLength={480}
            lengthAdjust="spacing"
            className="fill-transparent stroke-[#d4d4d4] font-[Helvetica,Arial,sans-serif] text-5xl font-bold"
            initial={{ strokeDashoffset: 1000, strokeDasharray: 1000 }}
            animate={{
              strokeDashoffset: [1000, 0, 0, 1000],
              strokeDasharray: 1000,
            }}
            transition={{
              duration: 6,
              ease: "easeInOut",
              repeat: Infinity,
              times: [0, 0.32, 0.55, 1],
            }}
          >
            {text}
          </motion.text>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            stroke="url(#textGradient)"
            strokeWidth="0.35"
            textLength={480}
            lengthAdjust="spacing"
            mask="url(#textMask)"
            className="fill-transparent font-[Helvetica,Arial,sans-serif] text-5xl font-bold"
          >
            {text}
          </text>
        </g>
      </svg>
    </motion.div>
  )
}
