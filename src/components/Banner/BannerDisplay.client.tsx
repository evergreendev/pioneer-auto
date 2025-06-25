'use client'

import React, { useState } from 'react'
import { Banner } from '@/payload-types'
import { X } from 'lucide-react'
import RichTextClient from '@/components/RichText/index.client'

interface BannerDisplayProps {
  banner: Banner
}

export const BannerDisplay: React.FC<BannerDisplayProps> = ({ banner }) => {
  const [isVisible, setIsVisible] = useState(true)

  // If banner is dismissed, don't render anything
  if (!isVisible) {
    return null
  }

  // Default styles if not provided
  const backgroundColor = banner.backgroundColor || '#f0f0f0'
  const textColor = banner.textColor || '#000000'

  return (
    <div
      className="w-full py-2 px-4 flex justify-between items-center"
      style={{
        backgroundColor,
        color: textColor,
      }}
    >
      <div className="flex-1 text-center">
        {banner.message ? <RichTextClient content={banner.message}/> : null}
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="ml-4 p-1 rounded-full hover:bg-opacity-20 hover:bg-black transition-colors"
        aria-label="Close banner"
      >
        <X size={18} />
      </button>
    </div>
  )
}
