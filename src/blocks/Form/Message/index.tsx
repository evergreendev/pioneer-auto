"use client"
import React from 'react'

import { Width } from '../Width'
import RichTextClient from '@/components/RichText/index.client'

export const Message: React.FC<{ message: Record<string, never> }> = ({ message }) => {
  return (
    <Width className="my-12" width="100">
      {message && <RichTextClient content={message} />}
    </Width>
  )
}
