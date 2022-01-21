import React from "react";
import {GetServerSideProps, NextPage} from "next";
import {getAllCategories, getCategoryUseSlug, getTagsOfCategory} from "../../lib/api";
import Category from "../../components/Category";

interface IProps {
    categories: any
    tags: any
}

const CategoryPage: NextPage<IProps> = ({categories, tags}) => {
    return (
       <Category categories={categories} tags={tags} />
    )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    if (!query?.posts) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const categories = (await getCategoryUseSlug(query?.posts)).categories
    const tags = (await getTagsOfCategory(query?.posts)).categories
    const allCategories = await getAllCategories()

    return {
        props: {allCategories, categories, tags}
    }
}

export default CategoryPage
