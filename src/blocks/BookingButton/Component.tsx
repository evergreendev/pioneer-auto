import React from 'react'

import type { Page } from '@/payload-types'

type Props = Extract<Page['layout'][0], { blockType: 'bookingButton' }>

const BookingButton: React.FC<
  Props & {
    id?: string
  }
> = () => {
  return (
    <div className="flex justify-center my-4">
      {/* FareHarbor book button for item #631480 */}
      <a 
        href="https://fareharbor.com/embeds/book/pioneerautoshow/items/631480/?full-items=yes&flow=1393408"
        className="inline-block px-6 py-3 bg-brand-primary-500 text-white font-medium text-lg rounded-lg hover:bg-brand-primary-600 transition-colors"
      >
        Book online now!
      </a>
    </div>
  )
}

export default BookingButton
