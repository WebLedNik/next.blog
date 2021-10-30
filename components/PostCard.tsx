import React from "react";
import styles from "../styles/PostCard.module.css"
import Icon from "@mdi/react";
import {mdiMessageOutline} from "@mdi/js";
import Link from "next/link";

const PostCard = () => {
    return (
        <div className={`${styles.post_card} box-shadow`}>
            <div className={`${styles.post_card__subheader}`}>
                <span className={'text-caption'}>September 24.2020</span>
                <span className={styles.post_card__divider}/>
                <Link href={'/'}>
                    <a className={`${styles.post_card__author} text-caption`}>Имя автора</a>
                </Link>
            </div>
            <div className={`${styles.post_card__content}`}>
                <Link href={'/posts/test'}>
                    <a style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}/>
                </Link>
                <div className={`${styles.post_card__title}`}>
                    <span className={'text-h2'}>Bad Design vs. Good Design: 5 Examples We can Learn From </span>
                </div>
                <div className={`${styles.post_card__subtitle}`}>
                    <span className={'text-body-2'}>Bad Design vs. Good Design: 5 Examples We can Learn From Bad Design vs. Good Design: 5 Examples We can Learn From Bad Design vs. Good Design: 5 Examples We can Learn From </span>
                </div>
            </div>
            <div className={`${styles.post_card__actions}`}>
                <ul className={styles.post_card__controls}>
                    <li>
                        <Link href={'/'}>
                            <a>
                                <Icon className={styles.post_card__icon} path={mdiMessageOutline} size={.8}/>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PostCard
