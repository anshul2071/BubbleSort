import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import SortVisualizer from './SortVisualizer'
import ControlPanel from './ControlPanel'

export default function BubbleSortVisualizer() {
  const [array, setArray] = useState(
    () => Array.from({ length: 10 }, () => Math.floor(Math.random() * 50) + 1)
  )
  const [steps, setSteps] = useState([])
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState(300)
  const [viewMode, setViewMode] = useState('bubbles')
  const [order, setOrder] = useState('ascending')
  const [comparisons, setComparisons] = useState(0)
  const [swaps, setSwaps] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [sortedArray, setSortedArray] = useState([])
  const timerRef = useRef(null)

  const buildSteps = arr => {
    const a = [...arr]
    const rec = []
    const asc = order === 'ascending'
    for (let i = 0; i < a.length - 1; i++) {
      for (let j = 0; j < a.length - 1 - i; j++) {
        rec.push({ type: 'compare', i: j, j: j + 1 })
        if ((asc && a[j] > a[j + 1]) || (!asc && a[j] < a[j + 1])) {
          [a[j], a[j + 1]] = [a[j + 1], a[j]]
          rec.push({ type: 'swap', i: j, j: j + 1, array: [...a] })
        }
      }
    }
    return rec
  }

  useEffect(() => {
    if (!playing || index >= steps.length) return
    timerRef.current = setTimeout(() => setIndex(i => i + 1), speed)
    return () => clearTimeout(timerRef.current)
  }, [playing, index, speed, steps.length])

  useEffect(() => {
    if (index === 0) return
    const step = steps[index - 1]
    if (step.type === 'compare') setComparisons(c => c + 1)
    if (step.type === 'swap') setSwaps(s => s + 1)
    if (index >= steps.length) {
      setPlaying(false)
      setCompleted(true)
      // Set sorted array when done
      if (steps.length > 0) {
        const lastSwap = steps.filter(s => s.type === 'swap').pop()
        setSortedArray(lastSwap ? lastSwap.array : array.slice().sort((a, b) => order === 'ascending' ? a - b : b - a))
      } else {
        setSortedArray(array.slice().sort((a, b) => order === 'ascending' ? a - b : b - a))
      }
    }
  }, [index, steps, array, order])

  const start = () => {
    setSteps(buildSteps(array))
    setIndex(0)
    setComparisons(0)
    setSwaps(0)
    setCompleted(false)
    setPlaying(true)
  }

  const pause = () => {
    setPlaying(false)
    clearTimeout(timerRef.current)
  }

  const reset = () => {
    pause()
    setArray(Array.from({ length: array.length }, () => Math.floor(Math.random() * 50) + 1))
    setSteps([])
    setIndex(0)
    setComparisons(0)
    setSwaps(0)
    setCompleted(false)
  }

  const changeOrder = newOrder => {
    pause()
    setOrder(newOrder)
    setSteps([])
    setIndex(0)
    setComparisons(0)
    setSwaps(0)
    setCompleted(false)
  }

  const randomize = () => {
    pause()
    const newArr = Array.from({ length: array.length }, () => Math.floor(Math.random() * 50) + 1)
    setArray(newArr)
    setSteps([])
    setIndex(0)
    setComparisons(0)
    setSwaps(0)
    setCompleted(false)
  }

  const last = steps[index - 1]
  // Find the last swap before or at the current index
  const lastSwapStep = steps.slice(0, index).reverse().find(s => s.type === 'swap')
  const displayArray = completed
    ? sortedArray
    : lastSwapStep
      ? lastSwapStep.array
      : array
  const highlight = last?.type === 'compare' ? [last.i, last.j] : []

  return (
    <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center space-y-6">
      <h1 className="text-4xl font-bold text-white">Bubble Sort Visualizer</h1>
      <Card className="w-full max-w-4xl">
        <CardContent className="space-y-6">
          <SortVisualizer
            array={displayArray}
            highlight={highlight}
            viewMode={viewMode}
          />
          <ControlPanel
            array={array}
            onArrayChange={arr => { pause(); setArray(arr) }}
            speed={speed}
            onSpeedChange={setSpeed}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            order={order}
            onOrderChange={changeOrder}
            playing={playing}
            onStart={start}
            onPause={pause}
            onReset={reset}
            onRandomize={randomize}
            comparisons={comparisons}
            swaps={swaps}
          />
          {completed && (
            <Alert className="mt-4">
              <AlertTitle>🎉 Sorted!</AlertTitle>
              <AlertDescription>
                Array sorted in <strong>{order}</strong> order.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
