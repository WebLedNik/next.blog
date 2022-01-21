import type {GetServerSideProps, NextPage} from 'next'
import styles from '../styles/PopularPosts.module.css'
import PostCard from "../components/PostCard";
import {getAllCategories, getPopularPosts} from "../lib/api";
import IPost from "../models/Post.interface";
import Post from "../models/Post";
import {iconsCategory as icons} from "../store";
import {useState} from "react";

interface IProps {
    allPosts: any
}

const PopularPosts: NextPage<IProps> = ({allPosts}) => {
    const [posts, setPosts] = useState<IPost[]>(allPosts.posts.nodes.map((p: any) => new Post(p, icons)))

    return (
        <article className={styles.popular}>
            {posts.map((p) => {
                return (
                    <section key={p.id} className={styles.popular__section}>
                        <PostCard post={p}/>
                    </section>
                )
            })}
        </article>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const allPosts = await getPopularPosts()
    const allCategories = await getAllCategories()
    return {
        props: {allPosts, allCategories}
    }
}

export default PopularPosts
