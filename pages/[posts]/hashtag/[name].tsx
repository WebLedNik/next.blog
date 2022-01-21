import React from "react";
import {GetServerSideProps, NextPage} from "next";
import {getAllCategories, getCategoryUseSlug, getCategoryUseSlugAndTagName, getTagsOfCategory} from "../../../lib/api";
import Category from "../../../components/Category";

interface IProps {
    categories: any
    tags: any
}

const HashtagPage: NextPage<IProps> = ({categories, tags}) => {
    return (
        <Category categories={categories} tags={tags} />
    )
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
    if (!query?.posts || !query?.name) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const categories = (await getCategoryUseSlugAndTagName(query?.posts, query?.name)).categories
    const tags = (await getTagsOfCategory(query?.posts)).categories
    const allCategories = await getAllCategories()

    return {
        props: {allCategories,categories, tags}
    }
}

export default HashtagPage
