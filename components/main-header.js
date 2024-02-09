import Link from "next/link";
import classes from "@/components/main-header.module.css";

import logoImage from '@/assets/logo.png';

export default function MainHeader() {
  return (
    <header className={classes.header}>
      <Link className={classes.logo} href="/">
        <img src={logoImage.src} alt="Logo" />
        NextFood Community
      </Link>

      <nav className={classes.nav}>
        <ul>
          <li>
            <Link href="/meals">Browse Meals</Link>
          </li>
          <li>
            <Link href="/community">Community</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}