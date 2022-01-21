import React, {useEffect, useRef, useState} from "react";
import styles from '../../styles/Post.module.css'
import Link from "next/link";
import {GetServerSideProps, NextPage} from "next";
import {getAllCategories, getMorePostsUseTagsSlug, getPostUseSlug} from "../../lib/api";
import IPost from "../../models/Post.interface";
import Post from "../../models/Post";
import Comments from "../../components/Comments";
import {useRouter} from "next/router";
import Icon from "@mdi/react";
import {mdiMessageOutline} from "@mdi/js";
import Image from "next/image";
import {api, iconsCategory as icons} from "../../store";
import PostCard from "../../components/PostCard";


interface IProps {
    post: any
}

interface IPropsMorePosts{
    post: IPost
}

const MorePosts: React.FC<IPropsMorePosts> = (prop) => {
    const router = useRouter()
    const [morePosts, setMorePosts] = useState<IPost[]>([])

    useEffect(() => {
        setMorePosts([])
        const handleScroll = async () => {
            try {
                let cursor = window.innerHeight + document.documentElement.scrollTop
                let border = document.documentElement.scrollHeight  //Граница после которой отправлется запрос на полученеи схожих статей

                if (cursor === border) {
                    const allPosts = await getMorePostsUseTagsSlug(prop.post.tags.map(p => p.name), api)
                    setMorePosts(allPosts.posts.nodes.filter((p:any) => p.id !== prop.post.id).map((p: any) => new Post(p, icons)))
                }
            } catch (e) {
                console.log("Error e ", e)
            }
        }

        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [prop.post])

    return(
        <section className={styles.post__posts}>
            {morePosts.map(p => (<div key={p.id}><PostCard post={p}/></div>))}
        </section>
    )
}

const PostPage: NextPage<IProps> = (prop) => {
    const router = useRouter()
    const refContent = useRef<HTMLDivElement>(null)
    const refComments = useRef<HTMLDivElement>(null)
    const [post, setPost] = useState<IPost>(new Post(prop.post, icons))

    if (router.query.comments !== undefined) {
        setTimeout(() => {
            refComments.current?.scrollIntoView({
                behavior: "smooth",
                block: 'start',
                inline: 'nearest',
            })
        }, 0)
    }

    useEffect(() => {
        setPost(new Post(prop.post, icons))
    }, [router.query.slug])

    //console.log('Post', post)

    return (
        <article className={styles.post}>
            <section ref={refContent} className={styles.post__content}>
                <div className={styles.post__subheader}>
                    <div className={styles.post__category}>
                        <Link href={'/' + post.categories[0].slug}>
                            <a className={`text-body-2`}>
                                {post.categories[0].icon.src ?
                                    <Image className={styles.nav__icon} src={post.categories[0].icon.src} alt=""
                                           width={24} height={24}/> : null}
                                <span>{post.categories[0].name}</span>
                            </a>
                        </Link>
                    </div>
                    <div className={styles.post__info}>
                        <Link href={'/'}>
                            <a className={`${styles.post__author} text-body-2`}>{post.author.name}</a>
                        </Link>
                        <span className={'text-caption'}>{post.getDate()}</span>
                    </div>
                </div>
                <div className={styles.post__title}>
                    <strong className={`text-h1`}>{post.title}</strong>
                </div>
                {post.excerpt ?
                    <div className={`${styles.post__subtitle} text-body-1`}
                         dangerouslySetInnerHTML={{__html: post.excerpt}}/> : null}

                <div className={`${styles.post__actions}`}>
                    <ul className={styles.post__controls}>
                        <li>
                            <Link href={'/[posts]/' + post.slug + '?comments'}>
                                <a>
                                    <Icon className={styles.post__message_icon} path={mdiMessageOutline} size={.9}/>
                                    <span>{post.commentCount}</span>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>

                {post.preview_image?.src ?
                    (<figure className={styles.post__preview_image}>
                        <img src={post.preview_image?.src} alt={post.preview_image?.alt}/>
                        {post.preview_image.caption ? <figcaption className={`text-body-2`}
                                                                  dangerouslySetInnerHTML={{__html: post.preview_image.caption}}/> : null}
                    </figure>) : null}
                <div className={styles.post__body} dangerouslySetInnerHTML={{__html: post.content || ""}}>
                </div>
            </section>
            <section ref={refComments} className={styles.post__comments}>
                <Comments postId={post.postId} comments={post.comments} commentCount={post.commentCount}/>
            </section>
            <MorePosts post={post} />
        </article>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if (!ctx.params?.slug) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const data = await getPostUseSlug(ctx.params?.slug)
    const allCategories = await getAllCategories()

    return {
        props: {
            post: data.postBy,
            allCategories
        }
    }
}

export default PostPage
