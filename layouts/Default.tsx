import React, {useEffect, useState} from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Category from "../models/Category";
import {iconsCategory as icons} from "../store";
import {useRouter} from "next/router";
import ICategory from "../models/Category.interface";
import Head from "next/head";
import PopupAuth from "../components/PopupAuth";


interface IProps {
    children: React.ReactNode
    allCategories: any
}

const Default: React.FC<IProps> = ({children, allCategories}) => {
    let categories: ICategory[] | [] = []
    const router = useRouter()
    const [countNewPosts, setCountNewPosts] = useState<number>(0)
    const [showSidebar, setShowSidebar] = useState<boolean>(true)
    let count: number = 0

    if (allCategories) {
        categories = allCategories.categories.nodes.map((c: any) => new Category(c, icons))
    }

    categories.forEach((c: ICategory) => {
        if (c.count) {
            count += c.count
        }
    })

    const handleClickMenu = () => {
        setShowSidebar(!showSidebar)
    }

    useEffect(() => {
        if (router.pathname === '/new') {
            localStorage.setItem('posts_last_count', count + '')
        } else {
            localStorage.setItem('posts_new_count', count + '')
        }

        let lastCount: number = Number(localStorage.getItem('posts_last_count'))
        let newCount: number = Number(localStorage.getItem('posts_new_count'))
        let diff: number = newCount - lastCount

        setCountNewPosts(diff > 0 ? diff : 0)
    })

    return (
        <>
            <Head>
                <title>Blog</title>
                <link rel="stylesheet" type="text/css" href="/static/css/nprogress.css" />
            </Head>
            <div className={'page'}>
                <Header clickOnMenu={handleClickMenu} />
                <main id="main" className={'main'}>
                    <div className={'main__row'}>
                        <div className={showSidebar ? 'main__sidebar' : 'main__sidebar main__sidebar_hidden'}>
                            {categories.length ? <Navbar categories={categories} countNewPosts={countNewPosts}/> : null}
                        </div>
                        <div className={'main__article'}>{children}</div>
                        <div className={'main__ads'}></div>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Default
