import React from "react";
import styles from '../../styles/Post.module.css'
import Link from "next/link";

const Post = () => {
    return(
        <article className={styles.post}>
            <div className={styles.post__subheader}>
                <span className={`text-caption`}>Название категории</span>
            </div>
            <div className={styles.post__title}>
                <span className={`text-h1`}>Название статьи</span>
            </div>
            <div className={styles.post__subtitle}>
                <span className={'text-caption'}>September 24.2020</span>
                <span className={styles.post__divider}/>
                <Link href={'/'}>
                    <a className={`${styles.post__author} text-caption`}>Имя автора</a>
                </Link>
            </div>
        </article>
    )
}

export default Post
