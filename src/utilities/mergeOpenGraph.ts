import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Offering family fun since 1954, Pioneer Auto Show in Murdo SD is a quintessential South Dakota Attraction along Interstate 90 and Highway 83.',
  images: [
    {
      url: process.env.NEXT_PUBLIC_SERVER_URL
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/pioneer-auto-show-logo.png`
        : '/pioneer-auto-show-logo.png',
    },
  ],
  siteName: 'Pioneer Auto Show',
  title: 'Pioneer Auto Show | South Dakota Attraction | Murdo SD',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
