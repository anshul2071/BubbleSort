import React from 'react'
import { motion } from 'framer-motion'

export default function SortVisualizer({ array, highlight, viewMode }) {
  const max = Math.max(...array)
  const spring = { type: 'spring', stiffness: 200, damping: 20 }

  return (
    <div className="w-full h-64 bg-gray-100 p-5 rounded-lg shadow-inner flex items-end justify-center overflow-hidden">
      <div className="flex items-end justify-center w-full h-full">
        {array.map((value, idx) => {
          const isHi = highlight.includes(idx)
          if (viewMode === 'bars') {
            const heightPct = (value / max) * 100
            return (
              <motion.div
                key={idx}
                layout
                initial={{ height: 0 }}
                animate={{ height: `${heightPct}%` }}
                transition={spring}
                whileHover={{ scale: 1.05 }}
                className={`flex-1 mx-1 rounded-t-lg ${
                  isHi
                    ? 'bg-gradient-to-t from-red-400 to-red-600 shadow-lg'
                    : 'bg-gradient-to-t from-gray-700 to-gray-900'
                }`}
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full 
                             bg-white text-xs font-semibold text-gray-800 rounded px-1 shadow"
                >
                  {value}
                </motion.span>
              </motion.div>
            )
          } else {
            // Bubbles view
            const diameter = 20 + (value / max) * 40 // between 20px and 60px
            return (
              <motion.div
                key={idx}
                layout
                transition={spring}
                whileHover={{ scale: 1.1 }}
                className={`flex-none mx-2 rounded-full grid place-items-center ${
                  isHi
                    ? 'bg-red-500 shadow-lg'
                    : 'bg-gray-800 shadow'
                }`}
                style={{ width: diameter, height: diameter }}
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white text-xs font-bold"
                >
                  {value}
                </motion.span>
              </motion.div>
            )
          }
        })}
      </div>
    </div>
  )
}
