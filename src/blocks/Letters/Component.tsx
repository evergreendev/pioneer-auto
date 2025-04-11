// src/blocks/Letters/Component.tsx
import React from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import Letters from '@/blocks/Letters/Component.client'
import { Letter } from '@/payload-types'

export type LettersBlockProps = {
  blockType: 'lettersBlock'
  heading?: string
  displayType: 'count' | 'specific'
  lettersCount?: number
  selectedLetters?: {
    relationTo: 'letters'
    value: string
  }[]
  backgroundColor: 'white' | 'lightGray' | 'brandPrimary'
}


const fetchLetters = async (
  displayType: string,
  lettersCount: number,
  selectedLetters: Array<{ relationTo: string; value: string }> = [],
):Promise<(Letter)[]> => {
  const payload = await getPayload({ config })

  try {
    if (displayType === 'count') {
      const response = await payload.find({
        collection: 'letters',
        limit: lettersCount,
        sort: '-createdAt',
      })

      return response.docs || [];

    } else if (displayType === 'specific' && selectedLetters.length > 0) {
      const ids = selectedLetters.map((item) => item.value)
      const response = await payload.find({
        collection: 'letters',
        where: {
          id: {
            in: ids,
          },
        },
      })

      const orderedLetters: Letter[] = ids
        .map((id) => response.docs.find((doc) => doc.id === parseInt(id)))
        .filter((doc): doc is Letter => doc !== undefined)

      return orderedLetters || []
    }
    return []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export const LettersBlock: React.FC<LettersBlockProps> = async ({
                                                            heading,
                                                            displayType,
                                                            lettersCount = 3,
                                                            selectedLetters,
                                                            backgroundColor,
                                                          }) => {
  const letters = await fetchLetters(displayType, lettersCount, selectedLetters)

  const bgClass = {
    white: 'bg-white',
    lightGray: 'bg-gray-100',
    brandPrimary: 'bg-primary-50',
  }[backgroundColor]

  return (
    <div className={`py-12 ${bgClass}`}>
      <div className="container mx-auto px-4">
        {heading && <h2 className="text-3xl font-bold mb-8 text-center">{heading}</h2>}
        <Letters letters={letters}/>
      </div>
    </div>
  )
}

export default LettersBlock;
