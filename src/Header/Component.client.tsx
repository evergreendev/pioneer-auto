'use client'
import React, { useEffect, useState } from 'react'

import type { Header, Media } from '@/payload-types'

import { HeaderNav } from './Nav'
import { MobileNav } from '@/Header/Nav/MobileNav'
import { Menu,  XCircle} from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

interface HeaderClientProps {
  header: Header
  logo: Media
  lightLogo?: Media
  centerNav: boolean
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  header,
  logo,
  centerNav,
}) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setHasScrolled(true)
    } else {
      setHasScrolled(false)
    }
  }
  const pathname = usePathname();

  useEffect(() => {
    setMobileNavIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="bg-brand-neutral-800 text-white">
        <div className="container flex justify-between py-4 items-center">
          <Link href="/" className={`w-32 transition-all ${centerNav ? 'hidden' : ''}`}>
            <Image
              src={logo.url || ''}
              alt={logo.alt || 'Logo'}
              width={200}
              height={200}
              priority
              className="h-auto"
            />
          </Link>
          <div>
            <h2 className="font-display text-2xl">Today&#39;s Hours</h2>
            <p className="font-bold">Everyday: 9am - 3pm</p>{/*todo change this to dynamic*/}
            <p>(Weather permitting)</p>
          </div>
        </div>

      </div>

      <header
        className={`hidden md:block sticky transition-colors top-0 z-50 ${!centerNav || hasScrolled ? 'bg-brand-neutral-700 text-white border-b border-blue-950' : ''}`}
        {...(theme ? { 'data-theme': theme } : {})}
      >
        <div className="container relative z-20 py-2 flex justify-between text-3xl ">
          <HeaderNav header={header} centerNav={centerNav} />
        </div>
      </header>
      <header className={`md:hidden`}>
        <button
          onClick={() => setMobileNavIsOpen(!mobileNavIsOpen)}
          className="fixed z-50 top-4 right-4"
        >
          {mobileNavIsOpen ? (
            <XCircle className="w-5 text-primary" />
          ) : (
            <Menu className="w-5 text-primary" />
          )}
        </button>
        <div
          className={`fixed transition-transform inset-0 bg-brand-blue z-40 bg-opacity-95 ${mobileNavIsOpen ? '' : '-translate-x-full'}`}
        >
          <MobileNav header={header} />
        </div>
      </header>
    </>
  )
}
