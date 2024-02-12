// 'use client' // initially, built the navs using usePathName here - but to reduce client component, export it to a new component.

import Link from "next/link";
import Image from "next/image";
// import { usePathname } from "next/navigation";

import logoImage from '@/assets/logo.png'; // logo image
import classes from "@/components/main-header/main-header.module.css";
import MainHeaderBackgroud from "@/components/main-header/main-header-background";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <>
      <MainHeaderBackgroud />
      
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImage} alt="Logo" priority /> 
          NextFood Community
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}


/**
 * Image by NextJS
 * 1. import the whole object, like logoImage.
 * 2. Set priority attribute to tell the browser to load the image ASAP
 */