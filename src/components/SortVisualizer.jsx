// src/components/SortVisualizer.jsx
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SortVisualizer({ array, highlight, viewMode }) {
  const max = Math.max(...array)
  const spring = { type: 'spring', stiffness: 200, damping: 20 }

  return (
    <div className="w-full bg-gray-100 p-4 rounded-lg shadow-inner">
      <div className="flex flex-wrap md:flex-nowrap items-end gap-3 justify-center h-56">
        <AnimatePresence>
          {array.map((v, i) => {
            const isHi = highlight.includes(i)
            if (viewMode === 'bars') {
              const hPct = (v / max) * 100
              return (
                <motion.div
                  key={i}
                  layout
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: `${hPct}%`, opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={spring}
                  whileHover={{ scale: 1.05 }}
                  className={`relative flex-none w-8 sm:w-12 md:w-14 rounded-t-lg ${
                    isHi ? 'bg-red-500 shadow-lg' : 'bg-gray-700'
                  }`}
                  style={{ height: `${hPct}%` }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 bg-white px-1 rounded text-xs sm:text-sm shadow"
                  >
                    {v}
                  </motion.div>
                </motion.div>
              )
            } else {
              const size = 24 + (v / max) * 32
              return (
                <motion.div
                  key={i}
                  layout
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0 }}
                  transition={spring}
                  whileHover={{ scale: 1.1 }}
                  className={`flex-none rounded-full grid place-items-center ${
                    isHi ? 'bg-red-500 shadow-lg' : 'bg-gray-800 shadow'
                  }`}
                  style={{ width: size, height: size }}
                >
                  <span className="text-white text-xs sm:text-sm md:text-base font-bold">
                    {v}
                  </span>
                </motion.div>
              )
            }
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
