import type {NextPage} from 'next'
import styles from '../styles/PopularArticles.module.css'
import PostCard from "../components/PostCard";

const PopularArticles: NextPage = () => {
    return (
       <article className={styles.popular}>
           <div className={styles.popular__title}>
               <span className={'text-h1'}>Recent Posts</span>
           </div>
           <section className={styles.popular__section}>
               <PostCard />
           </section>
           <section className={styles.popular__section}>
               <PostCard />
           </section>
           <section className={styles.popular__section}>
               <PostCard />
           </section>
           <section className={styles.popular__section}>
               <PostCard />
           </section>
           <section className={styles.popular__section}>
               <PostCard />
           </section>
       </article>
    )
}

export default PopularArticles
