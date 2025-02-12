import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Pure Bridal is Rapid City, South Dakota’s premier bridal boutique, offering an exquisite collection of wedding gowns that cater to every bride’s unique style and vision. With a carefully curated selection of designer dresses, exceptional customer service, and a warm, welcoming atmosphere, Pure Bridal ensures every bride’s shopping experience is as magical as the big day itself. Whether you\'re searching for a timeless, elegant look or a modern, fashion-forward gown, their expert consultants are dedicated to helping you find the perfect dress to say "I do" in.',
  images: [
    {
      url: process.env.NEXT_PUBLIC_SERVER_URL
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/Pure Bridal Logo Black & Dress-1.png`
        : '/Pure Bridal Logo Black & Dress-1.png',
    },
  ],
  siteName: 'Pure Bridal',
  title: 'Pure Bridal',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
