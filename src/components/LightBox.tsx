"use client"

import { Media } from '@/payload-types'
import Image from 'next/image'
import { useEffect } from 'react'

const LightBox = ({img, isOpen, closeFunction}:{img: number | Media | undefined , isOpen: boolean, closeFunction:(value:null)=>void}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeFunction(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeFunction])

  if (!img || typeof img === "number") return null;

  return isOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => closeFunction(null)}>
      <div className="relative bg-white p-4 rounded-lg shadow-lg">
        <Image src={img.url||""} alt={img.alt || ''} className="max-w-full max-h-screen" width={img.width || 0} height={img.height || 0} />
      </div>
    </div>
  )
}

export default LightBox;
