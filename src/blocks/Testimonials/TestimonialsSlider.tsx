'use client'

import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './styles.css'
import { Testimonial } from '@/payload-types'
import RichTextClient from '@/components/RichText/index.client'

type TestimonialSliderProps = {
  testimonials: Testimonial[]
}

const TestimonialsSlider = ({ testimonials }: TestimonialSliderProps) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <Slider {...sliderSettings}>
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="mb-4">
              <RichTextClient content={testimonial.testimonial} />
            </div>
            <p className="font-bold text-lg text-center">— {testimonial.name}</p>
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default TestimonialsSlider
