'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { ChevronUpCircle, ChevronDownCircle } from 'lucide-react'
import { Property } from 'csstype'
import Page = Property.Page

type Link = {
  type?: 'reference' | 'custom' | null
  newTab?: boolean | null
  reference?: {
    relationTo: 'pages'
    value: number | Page
  } | null
  url?: string | null
  label: string
}

const SubMenu = ({ subItems }: { subItems: { id: string; link: Link }[] }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-2xl uppercase"
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Collapse submenu' : 'Expand submenu'}
      >
        {isOpen ? <ChevronUpCircle /> : <ChevronDownCircle />}
      </button>
      {isOpen && (
        <ul className="absolute bg-brand-neutral-700 shadow-md right-0">
          {subItems.map((item) => (
            <li key={item.id} className="p-2">
              <CMSLink {...item.link} appearance="link" className="text-xl" />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

const NavItem = ({ link, subItems }: { link: Link; subItems?: {id:string,link:Link}[] }) => {
  return (
    <div className="flex gap-2">
      <CMSLink {...link} appearance="link" className="text-2xl uppercase" />
      {subItems && subItems.length > 0 &&
        <SubMenu subItems={subItems} />
      }
    </div>
  )
}

export const HeaderNav: React.FC<{ header: HeaderType; centerNav: boolean }> = ({ header }) => {
  const navItems = header?.navItems || []

  return (
    <nav className="flex gap-3 items-center mx-auto">
      {navItems.map(({ link, subItems }, i) => {
        // @ts-ignore
        return <NavItem key={i} link={link} subItems={subItems} />
      })}
      {/*      <Link href="/search">
        <span className="sr-only">Search</span>
        <SearchIcon className="w-5 text-primary" />
      </Link>*/}
    </nav>
  )
}
