'use client'

import React, { useState, useEffect } from 'react'
import { Modal as ModalType } from '@/payload-types'
import { Media } from '@/components/Media'
import RichTextClient from '@/components/RichText/index.client'
import { X } from 'lucide-react'

export const ModalDisplay: React.FC<{ modal: ModalType }> = ({ modal }) => {
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    if (modal.enabled) {
      // Check if it's already been shown in this session
      const hasSeenModal = sessionStorage.getItem('hasSeenModal')
      if (!hasSeenModal) {
        setIsOpen(true)
        sessionStorage.setItem('hasSeenModal', 'true')
      }
    }
  }, [modal.enabled])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-6xl bg-white rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {modal.image && (
            <div className="w-full md:w-1/2 relative h-64 md:h-auto flex align-center justify-center">
              <Media
                resource={modal.image}
                imgClassName="absolute inset-0 w-full h-full object-cover"
                className="object-cover"
              />
            </div>
          )}
          <div className={`w-full ${modal.image ? 'md:w-1/2' : ''} p-8`}>
            <RichTextClient content={modal.text} enableGutter={false} />
            <div className="mt-8">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 px-6 bg-brand-primary-600 text-white font-bold rounded-md hover:bg-brand-primary-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
