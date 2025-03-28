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
        {typeof siteLogo !== 'number' && (
          <Link className="flex items-center" href="/">
            <Image src={siteLogo?.url || ''} alt="Description" width={200} height={200} />
          </Link>
        )}
        {siteOptions.contactInfo && (
          <RichText enableGutter={false} className="prose ml-2" content={siteOptions.contactInfo} />
        )}
        <div>
          <h2 className="text-3xl font-bold font-display">Hours</h2>
          <h2 className="text-xl font-semibold">March-May</h2>
          <p className="text-base">Everyday: 9am - 3pm</p>
          <p className="text-sm italic">(Weather permitting)</p>

          <a href="tel:6056692691" className="block text-base font-semibold hover:underline">
            (605) 669-2691
          </a>
          <a href="https://www.google.com/maps/dir/44.0696832,-103.2323072/Pioneer+Auto+Museum,+503+5th+St,+Murdo,+SD+57559/@43.9125794,-102.6291435,287119m/data=!3m2!1e3!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x877f7f4d7d226861:0xcee8415795af2762!2m2!1d-100.7066401!2d43.8863252?entry=ttu&g_ep=EgoyMDI1MDMyNS4xIKXMDSoJLDEwMjExNjM5SAFQAw%3D%3D" className="block text-base font-semibold hover:underline">503 5th St, Murdo, SD 57559</a>
        </div>
        <div>
          <h2 className="text-3xl font-bold font-display">Admission</h2>
          <p className="text-base">Adult: $14.00</p>
          <p className="text-base">Children (5-12): $7.50</p>
          <p className="text-base">Under 5: FREE</p>
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
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-black" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
