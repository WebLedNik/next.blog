import React from 'react'
import Image from "next/image";
import Link from "next/link";
import Chip from "./Chip";
import PostCard from "./PostCard";
import {useRouter} from "next/router";
import Category from "../models/Category";
import {iconsCategory as icons} from "../store";
import ICategory from "../models/Category.interface";

interface IProps {
    categories: any
    tags?: any
}

interface IPropsHeader{
    category: ICategory
}

interface IPropsContent{
    category: ICategory
}

const Header: React.FC<IPropsHeader> = ({category}) => {
    const router = useRouter()

    return (
        <section className={'category__header'}>
            <div className={'category__ads'}>
                <img src={category.icon.bg.src!} alt=""/>
            </div>
            <div className={'category__info'}>
                <div className={`category__avatar`}>
                    <Image src={category.icon.src!} width={112} height={112}/>
                </div>
                <span className={`category__title text-h1`}>{category.name}</span>
                <span className={`category__description text-body-1`}>{category.description}</span>
            </div>
        </section>
    )
}

const Content: React.FC<IPropsContent> = ({category}) => {
    const router = useRouter()

    return(
        <div className={'category__content'}>
            <div className={'category__control'}>
                {category.tags.length ?
                    (<ul className={'category__tags'}>
                        {category.tags.map(t => (
                            <li key={t.id}>
                                <Link href={'/' + category.slug + '/hashtag/' + t.name}>
                                    <a>
                                        <Chip title={'#' + t.name} active={router.query.name === t.name} />
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>)
                    : null}

            </div>
            {category.posts?.length ? (category.posts.map((p) => {
                return (
                    <div key={p.id} className={'category__post'}>
                        <PostCard hiddenAuthor={true} post={p}/>
                    </div>
                )
            })) : null
            }
        </div>
    )
}

const CategoryComponent: React.FC<IProps> = ({categories, tags}) => {
    const category = new Category(categories.nodes[0], icons)
    category.setPosts(categories.nodes[0].posts.nodes)
    category.setTags(tags)

    return (
        <article className={'category'}>
            <Header category={category} />
            <section className={'category__body'}>
                <Content category={category} />
                <div className={'category__more'}></div>
            </section>
        </article>
    )
}

export default CategoryComponent
