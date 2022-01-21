import React, {useEffect, useState} from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.css"
import {useRouter} from "next/router";
import Icon from "@mdi/react";
import {mdiClockOutline, mdiFire} from "@mdi/js";
import ICategory from "../models/Category.interface";
import Image from "next/image";

interface IProps {
    categories: ICategory[]
    countNewPosts: number
}

interface IPropsListItem {
    category: ICategory
}

const ListItem: React.FC<IPropsListItem> = ({category}) => {
    const router = useRouter()

    return (
        <li className={styles.nav__item}>
            <Link href={'/' + category.slug}>
                <a className={router.query.posts === `${category.slug}` ? `${styles.nav__link_active} text-body-1` : `${styles.nav__link} text-body-1`}>
                    {category.icon.src ? <Image className={styles.nav__icon} src={category.icon.src} alt="" width={24}
                                                height={24}/> : null}
                    <span>{category.name}</span>
                </a>
            </Link>
        </li>
    )
}

const Navbar: React.FC<IProps> = ({categories, countNewPosts}) => {
    const router = useRouter()

    return (
        <nav className={`${styles.nav}`}>
            <ul className={styles.nav__menu}>
                <li className={styles.nav__item}>
                    <Link href={'/'}>
                        <a className={router.pathname === '/' ? `${styles.nav__link_active} text-body-1` : `${styles.nav__link} text-body-1`}>
                            <Icon path={mdiFire} size={1}/>
                            <span>Популярное</span>
                        </a>
                    </Link>
                </li>
                <li className={styles.nav__item}>
                    <Link href={'/new'}>
                        <a className={router.pathname === '/new' ? `${styles.nav__link_active} text-body-1` : `${styles.nav__link} text-body-1`}>
                            <Icon path={mdiClockOutline} size={1}/>
                            <span>Свежее</span>
                                <div className={countNewPosts ? `${styles.nav__chip} ${styles.nav__chip_active}` : styles.nav__chip}>
                                    <span>{countNewPosts >= 100 ? '+99' : countNewPosts}</span>
                                </div>
                        </a>
                    </Link>
                </li>
                {categories.map(((c: ICategory) => <ListItem key={c.id} category={c}/>))}
            </ul>
        </nav>
    )
}

export default Navbar
