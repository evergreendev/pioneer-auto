'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import { Testimonial } from '@/payload-types'

// Dynamic import with no SSR inside the client component
const SliderComponent = dynamic(() => import('./TestimonialsSlider'), { 
  ssr: false 
})

type TestimonialsSliderWrapperProps = {
  testimonials: Testimonial[]
}

const TestimonialsSliderWrapper = ({ testimonials }: TestimonialsSliderWrapperProps) => {
  return <SliderComponent testimonials={testimonials} />
}

export default TestimonialsSliderWrapper
