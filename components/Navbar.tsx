import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css"
import Searcher from "./Searcher";

const Navbar = () => {
    return (
        <nav className={`${styles.nav}`}>
            <ul className={styles.nav__menu}>
                <li className={styles.nav__item}>
                    <Link href={'/'}>
                        <a className={`${styles.nav__link} text-body-1`}>Home</a>
                    </Link>
                </li>
                <li className={styles.nav__item}>
                    <Link href={'/blog'}>
                        <a className={`${styles.nav__link} text-body-1`}>Blog</a>
                    </Link>
                </li>
                <li className={styles.nav__item}>
                    <Link href={'/about'}>
                        <a className={`${styles.nav__link} text-body-1`}>About us</a>
                    </Link>
                </li>
                <li className={styles.nav__item}>
                    <Link href={'/more'}>
                        <a className={`${styles.nav__link} text-body-1`}>More</a>
                    </Link>
                </li>
            </ul>
            <div className={styles.nav__searcher}>
                <Searcher />
            </div>
        </nav>
    )
}

export default Navbar
