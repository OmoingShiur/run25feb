"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

interface TimerProps {
  initialTime: number
  onTimerEnd: () => void
  isActive: boolean
  onToggleTimer: () => void
  onDurationChange: (newDuration: number) => void
}

export function Timer({ initialTime, onTimerEnd, isActive, onToggleTimer, onDurationChange }: TimerProps) {
  const [time, setTime] = useState(initialTime)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const timerEndRef = useRef(onTimerEnd)

  useEffect(() => {
    timerEndRef.current = onTimerEnd
  }, [onTimerEnd])

  useEffect(() => {
    setTime(initialTime)
  }, [initialTime])

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval)
            timerEndRef.current()
            return initialTime
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [isActive, time, initialTime])

  const handleTimeChange = useCallback(
    (newTime: number) => {
      if (isNaN(newTime) || newTime < 15) {
        setError("Time can't be less than 15 seconds")
        setTime(15)
        onDurationChange(15)
      } else {
        setError("")
        setTime(newTime)
        onDurationChange(newTime)
      }
      setIsEditing(false)
    },
    [onDurationChange],
  )

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  const handleDoubleClick = () => {
    if (!isActive) {
      setIsEditing(true)
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 0)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" onClick={onToggleTimer}>
          {isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        {isEditing ? (
          <input
            ref={inputRef}
            type="number"
            min="15"
            value={time}
            onChange={(e) => setTime(Math.max(15, Number.parseInt(e.target.value, 10)))}
            onBlur={(e) => handleTimeChange(Number.parseInt(e.target.value, 10))}
            onKeyDown={(e) =>
              e.key === "Enter" && handleTimeChange(Number.parseInt((e.target as HTMLInputElement).value, 10))
            }
            className="w-20 text-center text-2xl font-bold bg-transparent border-b border-white"
          />
        ) : (
          <div className="text-2xl font-bold cursor-pointer" onDoubleClick={handleDoubleClick}>
            {formatTime(time)}
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

