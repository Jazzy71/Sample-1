import { useEffect } from "react"
import { motion, useSpring, useTransform } from "framer-motion"

interface AnimatedNumberProps {
  value: number
  formatFn?: (value: number) => string
  className?: string
}

export function AnimatedNumber({ value, formatFn, className }: AnimatedNumberProps) {
  const springValue = useSpring(0, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.5,
  })
  
  useEffect(() => {
    springValue.set(value)
  }, [springValue, value])

  const displayValue = useTransform(springValue, (current) => {
    return formatFn ? formatFn(current) : Math.round(current).toString()
  })

  return <motion.span className={className}>{displayValue}</motion.span>
}

