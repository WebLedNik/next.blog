import type {GetServerSideProps, NextPage} from 'next'
import styles from '../styles/NewPost.module.css'
import PostCard from "../components/PostCard";
import {getAllCategories, getNewPosts} from "../lib/api";
import IPost from "../models/Post.interface";
import Post from "../models/Post";
import {iconsCategory as icons} from "../store";
import {useState} from "react";

interface IProps {
    allPosts: any
}

const NewPosts: NextPage<IProps> = ({allPosts}) => {
    const [posts, setPosts] = useState<IPost[]>(allPosts.posts.nodes.map((p: any) => new Post(p, icons)))

    return (
        <article className={styles.new}>
            {posts.map((p) => {
                return (
                    <section key={p.id} className={styles.new__section}>
                        <PostCard post={p}/>
                    </section>
                )
            })}
        </article>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const allPosts = await getNewPosts()
    const allCategories = await getAllCategories()
    return {
        props: {allPosts, allCategories}
    }
}

export default NewPosts
