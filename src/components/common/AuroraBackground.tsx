import { motion } from "framer-motion"

export function AuroraBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-50 pointer-events-none">
      <motion.div
        animate={{
          x: ["0%", "20%", "-20%", "0%"],
          y: ["0%", "10%", "-10%", "0%"],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute -top-[20%] -left-[10%] h-[60%] w-[50%] rounded-full bg-blue-300/40 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: ["0%", "-30%", "10%", "0%"],
          y: ["0%", "-20%", "20%", "0%"],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute top-[20%] -right-[10%] h-[70%] w-[60%] rounded-full bg-purple-300/40 blur-[120px]"
      />
      
      <motion.div
        animate={{
          x: ["0%", "40%", "-10%", "0%"],
          y: ["0%", "30%", "-20%", "0%"],
          scale: [1, 0.9, 1.2, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className="absolute -bottom-[20%] left-[20%] h-[60%] w-[50%] rounded-full bg-teal-200/40 blur-[120px]"
      />
    </div>
  )
}

