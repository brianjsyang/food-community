'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"

import classes from '@/components/main-header/nav-link.module.css'

export default function NavLink({ href, children }) {
  const path = usePathname();

  return (
    <Link 
      href={href} 
      className={`${classes.link} ${path.startsWith(href) ? classes.active : undefined}` }>
        {children}
    </Link>
  )
}

/**
 * Explorted this component to separte file to reduce the usage of 'use client'
 * Client Component are as tiny as possible
 */