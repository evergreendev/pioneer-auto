'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { SearchIcon } from 'lucide-react'

export const MobileNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <nav className="flex flex-col gap-2 p-4">
      {navItems.map(({ link, subItems }, i) => {
        return (
          <div key={i}>
            <CMSLink {...link} appearance="link" className="text-2xl uppercase" />
            {subItems && subItems.length > 0 && (
              <div className="flex flex-col gap-2 ml-4">
                {subItems.map((item) => {
                  return <CMSLink key={item.id} appearance="link" size={'sm'} {...item.link} />
                })}
              </div>
            )}
          </div>
        )
      })}
      <Link href="/search">
        <span className="sr-only">Search</span>
        {/*<SearchIcon className="w-5 text-primary" />*/}
      </Link>
    </nav>
  )
}
