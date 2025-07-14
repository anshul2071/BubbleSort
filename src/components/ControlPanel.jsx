import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input }  from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { Label }  from '@/components/ui/label'

export default function ControlPanel({
  array,
  onArrayChange,
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
  onStepForward,
  onStepBack,
  onRandomize,
  comparisons,
  swaps,
  index = 0, // Add index prop with default value
  steps = [], // Add steps prop with default value
}) {
  const [txt, setTxt] = useState(array.join(','))

  const applyArray = () => {
    const nums = txt
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n))
    if (nums.length > 1) onArrayChange(nums)
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {/* Array Input */}
      <div>
        <Label>Array (comma-separated)</Label>
        <div className="flex gap-2 mt-1">
          <Input
            className="flex-1"
            value={txt}
            onChange={e => setTxt(e.target.value)}
          />
          <Button onClick={applyArray}>Apply</Button>
          <Button variant="outline" onClick={onRandomize}>
            Randomize
          </Button>
        </div>
      </div>

      {/* Speed */}
      <div className="space-y-1">
        <Label>Speed: <strong>{speed} ms</strong></Label>
        <Slider
          value={[speed]}
          min={50}
          max={1000}
          step={50}
          onValueChange={([v]) => onSpeedChange(v)}
        />
      </div>

      {/* View & Order Toggles */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={viewMode === 'bars' ? 'default' : 'outline'}
          onClick={() => onViewModeChange('bars')}
        >Bars</Button>
        <Button
          variant={viewMode === 'bubbles' ? 'default' : 'outline'}
          onClick={() => onViewModeChange('bubbles')}
        >Bubbles</Button>
        <Button
          variant={order === 'ascending' ? 'default' : 'outline'}
          onClick={() => onOrderChange('ascending')}
        >Ascending</Button>
        <Button
          variant={order === 'descending' ? 'default' : 'outline'}
          onClick={() => onOrderChange('descending')}
        >Descending</Button>
      </div>

      {/* Playback Controls */}
      <div className="flex gap-2">
        {playing
          ? <Button variant="destructive" onClick={onPause}>Pause</Button>
          : <Button onClick={onStart}>Start</Button>
        }
        <Button variant="outline" onClick={onReset}>Reset</Button>
        <Button variant="secondary" onClick={onStepBack} disabled={index === 0}>
          ◀ Step Back
        </Button>
        <Button variant="secondary" onClick={onStepForward} disabled={index >= steps.length}>
          Step ▶
        </Button>
      </div>

      {/* Stats */}
      <div className="flex space-x-6 text-gray-200">
        <div>🔍 Comparisons: <strong>{comparisons}</strong></div>
        <div>🔄 Swaps:        <strong>{swaps}</strong></div>
      </div>
    </div>
  )
}
