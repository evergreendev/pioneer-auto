import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Facebook, Instagram, Youtube } from 'lucide-react'

import type { Footer, SiteOption } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { RenderBlocks } from '@/blocks/RenderBlocks'

export async function Footer() {
  const footer: Footer = await getCachedGlobal('footer', 1)()
  const siteOptions: SiteOption = (await getCachedGlobal('siteOptions', 1)()) as SiteOption
  const siteLogo = siteOptions.siteLogo

  const navItems = footer?.navItems || []

  return (
    <footer className="bg-brand-neutral-700 text-white">
      <iframe
        title="google map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11502.125792240326!2d-100.71534303214514!3d43.88625867911392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x877f7f4d7d226861%3A0xcee8415795af2762!2sPioneer%20Auto%20Museum!5e0!3m2!1sen!2sus!4v1647298439646!5m2!1sen!2sus"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen={false}
        loading="lazy"
        data-gtm-yt-inspected-10="true"
      ></iframe>
      <div className="container prose-a:text-white py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-4">
          {typeof siteLogo !== 'number' && (
          <Link className="flex items-center" href="/">
            <Image src={siteLogo?.url || ''} alt="Description" width={200} height={200} />
          </Link>
        )}
          {navItems.map(({ link }, i) => {
            return <CMSLink className="text-xl" key={i} {...link} />
          })}
        </div>



        <div>
          {footer.content && (
            <RenderBlocks blocks={footer.content} />
          )}
        </div>
        <div className="flex flex-row gap-4 items-center">
          <nav className="flex flex-row gap-4 items-center">
            <Link href="https://www.facebook.com/PioneerAutoShow">
              <Facebook size="45px" />
            </Link>
            <Link href="https://www.instagram.com/pioneerautoshow/">
              <Instagram size="45px" />
            </Link>
            <Link href="https://www.youtube.com/channel/UC1-5hxlGowRFMHr3AJSKv8Q">
              <Youtube size="50px" />
            </Link>
            <Link href="https://www.tripadvisor.com/Attraction_Review-g54726-d277934-Reviews-Pioneer_Auto_Museum-Murdo_South_Dakota.html">
              <Image src="/tripadvisor.png" alt="Trip Advisor" width={60} height={60} />
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
