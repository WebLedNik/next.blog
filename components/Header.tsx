import React from "react";
import styles from '../styles/Header.module.css'
import Navbar from "./Navbar";
import Link from "next/link";

const Header = () => {
    return (
        <header className={'header'}>
            <div className={`${styles.header__row} container`}>
                    <Link href={'/'}>
                        <a className={`${styles.header__logo}`}>
                            <span>Meliora</span>
                        </a>
                    </Link>
                <Navbar/>
            </div>
        </header>
    )
}

export default Header

