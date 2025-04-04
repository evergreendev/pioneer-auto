"use client"
import { cn } from '@/utilities/cn'
import React from 'react'

import { serializeLexicalClient } from '@/components/RichText/serialize.client'

type Props = {
  className?: string
  content: Record<string, any>
  enableGutter?: boolean
  enableProse?: boolean
}

const RichTextClient: React.FC<Props> = ({
                                     className,
                                     content,
                                     enableGutter = true,
                                     enableProse = true,
                                   }) => {
  if (!content) {
    return null
  }

  return (
    <div
      className={cn(
        {
          'container ': enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose ': enableProse,
        },
        className,
      )}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === 'object' &&
        'root' in content &&
        serializeLexicalClient({ nodes: content?.root?.children })}
    </div>
  )
}

export default RichTextClient
