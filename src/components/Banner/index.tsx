import React from 'react'
import { Banner as BannerType } from '@/payload-types'
import { getPayload } from 'payload'
import config from '@payload-config'
import { BannerDisplay } from './BannerDisplay.client'

export async function Banner() {
  // Get the current date in ISO format
  const currentDate = new Date().toISOString().split('T')[0]

  // Create payload instance
  const payload = await getPayload({ config })

  // Fetch active banners that haven't expired yet
  const banners = await payload.find({
    collection: 'banners',
    where: {
      and: [
        {
          isActive: {
            equals: true,
          },
        },
        {
          expirationDate: {
            greater_than_equal: currentDate,
          },
        },
      ],
    },
    limit: 1, // Only get the most recent banner
    sort: '-createdAt', // Sort by creation date, newest first
  })

  // If no active banners, return null
  if (banners.docs.length === 0) {
    return null
  }

  // Get the first active banner
  const banner = banners.docs[0] as BannerType

  // Pass the banner to the client component for display
  return <BannerDisplay banner={banner} />
}
