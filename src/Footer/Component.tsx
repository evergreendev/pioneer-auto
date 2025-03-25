import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Facebook, Instagram, Youtube } from 'lucide-react'

import type { Footer, SiteOption } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const siteOptions: SiteOption = (await getCachedGlobal('siteOptions', 1)()) as SiteOption
  const siteLogo = siteOptions.siteLogo

  const navItems = footer?.navItems || []

  return (
    <footer className="bg-brand-pink text-black">
      <div className="container prose-a:text-black py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        {typeof siteLogo !== 'number' && (
          <Link className="flex items-center" href="/">
            <Image src={siteLogo?.url || ''} alt="Description" width={200} height={200} />
          </Link>
        )}
        {siteOptions.contactInfo && <RichText enableGutter={false} className="prose ml-2" content={siteOptions.contactInfo} />}

        <div className="flex flex-row gap-4 items-center">
          <nav className="flex flex-row gap-4">
            <Link href="https://www.facebook.com/PioneerAutoShow"><Facebook/></Link>
            <Link href="https://www.instagram.com/pioneerautoshow/"><Instagram/></Link>
            <Link href="https://www.youtube.com/channel/UC1-5hxlGowRFMHr3AJSKv8Q"><Youtube/></Link>
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-black" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
