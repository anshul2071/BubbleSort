// src/components/ControlPanel.jsx
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'

export default function ControlPanel({
  array,
  onArrayChange,
  onRandomize,
  speed,
  onSpeedChange,
  viewMode,
  onViewModeChange,
  order,
  onOrderChange,
  playing,
  onStart,
  onPause,
  onReset,
  comparisons,
  swaps
}) {
  const [txt, setTxt] = useState(array.join(','))

  useEffect(() => {
    setTxt(array.join(','))
  }, [array])

  const applyArray = () => {
    const nums = txt
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n))
    if (nums.length > 1) onArrayChange(nums)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
      {/* Data */}
      <div className="sm:col-span-2 space-y-2">
        <Label className="text-lg font-medium">Array Data</Label>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={txt}
            onChange={e => setTxt(e.target.value)}
            className="flex-1"
          />
          <Button className="w-full sm:w-32" onClick={applyArray}>
            Apply
          </Button>
          <Button
            variant="outline"
            className="w-full sm:w-32"
            onClick={onRandomize}
          >
            Randomize
          </Button>
        </div>
      </div>

      {/* Settings */}
      <div>
        <Label className="text-lg font-medium">Speed</Label>
        <div className="flex items-center gap-4 mt-1">
          <span className="font-semibold">{speed} ms</span>
          <Slider
            value={[speed]}
            min={50}
            max={1000}
            step={50}
            onValueChange={([v]) => onSpeedChange(v)}
            className="flex-1"
          />
        </div>
      </div>

      <div>
        <Label className="text-lg font-medium">View Mode</Label>
        <div className="flex gap-2 mt-2">
          <Button
            variant={viewMode === 'bars' ? 'default' : 'outline'}
            onClick={() => onViewModeChange('bars')}
            className="flex-1 sm:flex-auto"
          >
            Bars
          </Button>
          <Button
            variant={viewMode === 'bubbles' ? 'default' : 'outline'}
            onClick={() => onViewModeChange('bubbles')}
            className="flex-1 sm:flex-auto"
          >
            Bubbles
          </Button>
        </div>
      </div>

      <div>
        <Label className="text-lg font-medium">Order</Label>
        <div className="flex gap-2 mt-2">
          <Button
            variant={order === 'ascending' ? 'default' : 'outline'}
            onClick={() => onOrderChange('ascending')}
            className="flex-1 sm:flex-auto"
          >
            Ascending
          </Button>
          <Button
            variant={order === 'descending' ? 'default' : 'outline'}
            onClick={() => onOrderChange('descending')}
            className="flex-1 sm:flex-auto"
          >
            Descending
          </Button>
        </div>
      </div>

      {/* Controls */}
      <div className="sm:col-span-2 flex flex-wrap gap-3">
        {playing ? (
          <Button
            variant="destructive"
            onClick={onPause}
            className="flex-1 sm:w-32"
          >
            Pause
          </Button>
        ) : (
          <Button onClick={onStart} className="flex-1 sm:w-32">
            Start
          </Button>
        )}
        <Button variant="outline" onClick={onReset} className="flex-1 sm:w-32">
          Reset
        </Button>
      </div>

      {/* Stats */}
      <div className="sm:col-span-2 flex justify-between text-gray-600 text-sm">
        <div className="flex items-center gap-2">
          🔍 <span>Comparisons:</span> <strong>{comparisons}</strong>
        </div>
        <div className="flex items-center gap-2">
          🔄 <span>Swaps:</span> <strong>{swaps}</strong>
        </div>
      </div>
    </div>
  )
}
