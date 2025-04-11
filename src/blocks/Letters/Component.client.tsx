"use client"
import React, { useState } from 'react'
import { Letter } from '@/payload-types'
import RichTextClient from '@/components/RichText/index.client'

const Letters = ({letters}:{letters:Letter[]}) => {
  const [selectedLetterId, setSelectedLetterId] = useState<number | null>(letters[0]?.id)

  const selectedLetter = letters.find((letter) => letter.id === selectedLetterId)


  if (letters.length === 0) {
    return <div className="py-10"></div>
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <div className="flex flex-col gap-2">
          {letters.map((letter) => (
            <button
              key={letter.id}
              onClick={() => setSelectedLetterId(letter.id)}
              className={`text-left px-4 py-3 rounded transition-colors ${
                selectedLetterId === letter.id
                  ? 'bg-brand-primary-500 text-white font-medium'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {letter.senderName}
            </button>
          ))}
        </div>
      </div>

      <div className="md:w-2/3">
        {selectedLetter && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold">{selectedLetter.senderName}</h3>
                {selectedLetter.date && (
                  <p className="text-gray-500">
                    {new Date(selectedLetter.date).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>

            {
              selectedLetter.content &&
              <div className="prose max-w-none">
                <RichTextClient content={selectedLetter.content} />
              </div>
            }
          </div>
        )}
      </div>
    </div>
  )
}

export default Letters;
