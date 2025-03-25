'use client'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface HeroProps {
  images: { id?: string | null | undefined; image?: number | null | Media }[]
  logo?: number | null | Media
}

const Hero = ({ images }: HeroProps) => {
  const [currImage, setCurrImage] = useState(0)
  const imageMax = images.length - 1
  const intervalId = useRef<null | NodeJS.Timeout>(null)

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setCurrImage(currImage + 1 > imageMax ? 0 : currImage + 1)
    }, 4000)

    return () => clearInterval(intervalId.current || '')
  }, [currImage, imageMax])

  return (
    <div className="flex flex-wrap w-full">
      <div className="relative aspect-video max-h-[50vh] w-full overflow-hidden">
        {images.map((image, i) => {
          if (image.image && typeof image.image !== 'number')
            return (
              <div
                key={image.id}
                className={`absolute inset-0 duration-700 transition-opacity ${i === currImage ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
              >
                <Image
                  src={image.image.url || ''}
                  alt={image.image.alt || ''}
                  width={image.image.width || 0}
                  height={image.image.height || 0}
                  className={`z-10 absolute  h-full w-full  object-contain object-center`}
                />
                <Image
                  src={image.image.url || ''}
                  alt={image.image.alt || ''}
                  width={image.image.width || 0}
                  height={image.image.height || 0}
                  className={`z-0 absolute duration-700 h-full w-full transition-opacity object-cover object-center blur-md`}
                />
              </div>
            )
        })}
      </div>
    </div>
  )
}

export default Hero
