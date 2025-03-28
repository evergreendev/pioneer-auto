'use client'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
import { Page } from '@/payload-types'
import LightBox from '@/components/LightBox'
import ClickWithThreshold from '@/components/ClickWithThresholdComponent'

type Props = Extract<Page['layout'][0], { blockType: 'imageSlider' }>

export const ImageSliderBlock: React.FC<Props> = (props) => {
  const [openImageId, setOpenImageId] = useState<string | null | undefined>(null)
  const { images } = props

  const [screenWidth, setScreenWidth] = useState(1000)

  useEffect(() => {
    setScreenWidth(window.innerWidth)
    console.log(window.screen.width)
  }, [])

  if (!images) return null

  const sliderSettings = {
    dots: true,
    arrows: false,
    autoplay: true,
    infinite: true,
    draggable: true,
    autoplaySpeed: 5000,
    speed: 700,
    slidesToShow: Math.min(Math.ceil(screenWidth / 600), images.length),
    adaptiveHeight: false,
    slidesToScroll: 1,
  }

  return (
    <div className="bg-brand-neutral-700">
      {openImageId && (
        <LightBox
          isOpen={!!openImageId}
          img={images.find((img) => img.id === openImageId)?.media}
          closeFunction={() => setOpenImageId(null)}
        />
      )}

      <Slider {...sliderSettings}>
        {images.map((img) => {
          if (!img.media || typeof img.media === 'number') return null
          return (
            <ClickWithThreshold key={img.id} onClick={() => setOpenImageId(img.id)} threshold={40}>
              <Image
                className="aspect-square object-cover object-center"
                src={img.media.url || ''}
                alt={img.media.alt || ''}
                width={img.media.width || 0}
                height={img.media.height || 0}
              />
            </ClickWithThreshold>
          )
        })}
      </Slider>
    </div>
  )
}
