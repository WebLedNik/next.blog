import IPost from "./Post.interface";
import ITag from "./Tag.interface";

interface ICategory{
    id:string
    count: number | null
    slug: string
    name: string
    description: string | null
    icon?: any | undefined
    posts?: IPost[] | []
    tags: ITag[]
    setPosts(posts: any[]): void
    setTags(posts: IPost[]): void
}

export default ICategory
