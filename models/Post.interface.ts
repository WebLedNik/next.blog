import IAuthor from "./Author.interface";
import IImage from "./Image.interface";
import IComment from "./Comment.interface";
import ICategory from "./Category.interface";
import ITag from "./Tag.interface";

interface IPost{
    id:string,
    title:string,
    slug:string,
    _date:string,
    excerpt:string,
    author: IAuthor,
    content?: string
    commentCount: number
    postId: number
    preview_image?:IImage
    comments: IComment[]
    categories: ICategory[]
    tags: ITag[]
    getDate():string
}

export default IPost
