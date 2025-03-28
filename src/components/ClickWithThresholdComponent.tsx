import React, { useState, useRef, ReactNode, MouseEvent, TouchEvent } from 'react'

interface ClickWithThresholdProps {
  onClick: (event: MouseEvent<HTMLDivElement>) => void
  threshold?: number
  children: ReactNode
}

const ClickWithThreshold: React.FC<ClickWithThresholdProps> = ({
  onClick,
  threshold = 5,
  children,
}) => {
  const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isMouseDown, setIsMouseDown] = useState(false)

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    startPosRef.current = { x: touch.clientX, y: touch.clientY };
    setIsMouseDown(true);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    if (!isMouseDown) return;

    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - startPosRef.current.x);
    const deltaY = Math.abs(touch.clientY - startPosRef.current.y);
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance <= threshold) {
      // Create a synthetic mouse event from the touch event
      const mouseEvent = {
        clientX: touch.clientX,
        clientY: touch.clientY,
        preventDefault: e.preventDefault,
        stopPropagation: e.stopPropagation,
      } as unknown as MouseEvent<HTMLDivElement>;

      onClick(mouseEvent);
    }

    setIsMouseDown(false);
  };


  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    // Store the starting position
    startPosRef.current = { x: e.clientX, y: e.clientY }
    setIsMouseDown(true)
  }

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown) return

    // Calculate distance moved
    const deltaX = Math.abs(e.clientX - startPosRef.current.x)
    const deltaY = Math.abs(e.clientY - startPosRef.current.y)
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    // Only trigger onClick if the mouse didn't move beyond the threshold
    if (distance <= threshold) {
      onClick(e)
    }

    setIsMouseDown(false)
  }

  const handleMouseLeave = () => {
    setIsMouseDown(false)
  }

  return (
    <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  )
}

export default ClickWithThreshold
