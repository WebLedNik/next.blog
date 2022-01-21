import {
    queryGetAllCategories,
    queryGetCategoryUseSlug,
    queryGetCategoryUseSlugAndTagName,
    queryGetMorePostsUseTagsSlug,
    queryGetNewPosts,
    queryGetPopularPosts,
    queryGetPostUseSlug,
    queryGetTagsOfCategory, queryGetUser
} from "../graphql/queries";
import {
    mutationCreateComment,
    mutationCreateUser,
    mutationLoginAdmin, mutationLoginUser, mutationRefreshAuthToken,
    mutationRegisterUser
} from "../graphql/mutations";

const API: string = process.env.WP_API_URL!

export async function fetchValidateReCaptcha<T>(captcha: string): Promise<T>{
    const headers = {"Content-Type": "application/x-www-form-urlencoded"}

    const res = await fetch('https://www.google.com/recaptcha/api/siteverify',
        {
            headers,
            method: "POST",
            body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`
        }
    );

    const json = await res.json()

    return json.success
}

async function fetchApi<T>(API: string, query: string, variables?: any): Promise<T> {
    let headers

    if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN){
        headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
        }
    }else{
       headers  = {'Content-Type': 'application/json'}
    }


    const res = await fetch(API, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables
        })
    })

    const json = await res.json()

    if (json.errors) {
        console.log('Error fetchApi', json.errors)
        throw new Error('Failed to fetchApi')
    }

    return json.data
}

async function fetchApiAuth<T>(API: string, query: string, authToken: string, variables?: any): Promise<T> {
    console.log(authToken)
    let headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }

    const res = await fetch(API, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables
        })
    })

    const json = await res.json()

    console.log(json)

    if (json.errors) {
        console.log('Error fetchApi', json.errors)
        throw new Error('Failed to fetchApi')
    }

    return json.data
}

async function fetchApiNotAuth<T>(API: string, query: string, variables?: any): Promise<T> {
    let headers = {'Content-Type': 'application/json'}

    const res = await fetch(API, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            query,
            variables
        })
    })

    const json = await res.json()

    if (json.errors) {
        console.log('Error fetchApi', json.errors)
        throw new Error('Failed to fetchApi')
    }

    return json.data
}


export const getPopularPosts = async (): Promise<any> => {
    try {
        let date = new Date()
        let day = (date.getDate()) - 3 //Популярные за последние 3 дня
        let month = (date.getMonth() === 12 ? 0 : date.getMonth()) + 1
        let year = date.getFullYear()

        const query = queryGetPopularPosts

        const variables = {
            day,
            month,
            year
        }

        return await fetchApi(API, query, variables)
    } catch (e) {
        console.log(e)
    }
}

export const getNewPosts = async (): Promise<any> => {
    try {
        const query = queryGetNewPosts

        return await fetchApi(API, query)
    } catch (e) {
        console.log(e)
    }
}

export const getPostUseSlug = async (slug: string | string[]): Promise<any> => {
    try {
        const query = queryGetPostUseSlug

        const variables = {
            slug
        }

        return await fetchApi(API, query, variables)
    } catch (e) {
        console.log(e)
    }
}

export const getAllCategories = async (): Promise<any> => {
    try {
        const query = queryGetAllCategories

        return await fetchApi(API, query)
    } catch (e) {
        console.log(e)
    }
}

export const getCategoryUseSlug = async (slug: string | string[]): Promise<any> => {
    try {
        const query = queryGetCategoryUseSlug

        const variables = {
            slug
        }

        return await fetchApi(API, query, variables)
    } catch (e) {
        console.log(e)
    }
}

export const getCategoryUseSlugAndTagName = async (slug: string | string[], tagName: string | string[]): Promise<any> => {
    try {
        const query = queryGetCategoryUseSlugAndTagName

        const variables = {
            slug,
            tagName
        }

        return await fetchApi(API, query, variables)
    } catch (e) {
        console.log(e)
    }
}

export const getTagsOfCategory = async (slug: string | string[]): Promise<any> => {
    try {
        const query = queryGetTagsOfCategory


        const variables = {
            slug
        }

        return await fetchApi(API, query, variables)
    } catch (e) {
        console.log(e)
    }
}

export const getMorePostsUseTagsSlug = async (slugs: string[], api: string): Promise<any> => {
    try {
        const query = queryGetMorePostsUseTagsSlug

        const variables = {
            slugs
        }

        return await fetchApi(api, query, variables)
    } catch (e) {
        console.log(e)
    }
}

export const createUser = async (email:string, name: string, password:string): Promise<any> => {
    try {
        const mutation = mutationCreateUser

        const variables = {
            email,
            name,
            password
        }

        return await fetchApi(API, mutation, variables)
    }catch (e) {
        console.log(e)
    }
}

export const loginAdmin = async (): Promise<any> => {
    try {
        const mutation = mutationLoginAdmin

        return await fetchApi(API, mutation)
    }catch (e) {
        console.log(e)
    }
}

export const getUser = async (login: string): Promise<any> => {
    try {
        const query = queryGetUser

        const variables = {
            login
        }

        return await fetchApi(API, query, variables)
    }catch (e) {
        console.log(e)
    }
}

export const createComment = async (parent: number, commentOn: number, content: string, authToken: string):Promise<any> => {
    try {
        const mutation = mutationCreateComment

        const variables = {
            parent,
            commentOn,
            content
        }

        return await fetchApiAuth(API, mutation, authToken, variables)
    }catch (e) {
        console.log(e)
    }
}

export const registerUserWP = async (email:string, username: string, password:string, displayName: string): Promise<any> => {
    try {

        const mutation = mutationRegisterUser

        const variables = {
            email,
            username,
            password,
            displayName
        }

        return await fetchApiNotAuth(API, mutation, variables)
    }catch (e) {
        console.log(e)
    }
}

export const loginUserWP = async (name: string, password:string): Promise<any> => {
    try {

        const mutation = mutationLoginUser

        const variables = {
            name,
            password
        }

        return await fetchApiNotAuth(API, mutation, variables)
    }catch (e) {
        console.log(e)
    }
}

export const refreshAuthTokenWP = async (refreshToken: string): Promise<any> => {
    try {

        const mutation = mutationRefreshAuthToken

        const variables = {
            refreshToken,
        }

        return await fetchApiNotAuth(API, mutation, variables)
    }catch (e) {
        console.log(e)
        return e
    }
}
