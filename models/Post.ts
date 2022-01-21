import IPost from "./Post.interface";
import IAuthor from "./Author.interface";
import Author from "./Author";
import moment from 'moment'
import 'moment/locale/ru'
import IImage from "./Image.interface";
import Image from "./Image";
import IComment from "./Comment.interface";
import Comment from "./Comment";
import ICategory from "./Category.interface";
import Category from "./Category";
import ITag from "./Tag.interface";
import Tag from "./Tag";

function setComments(comment: any){
    if(!comment.replies){
        return new Comment(comment)
    }

    if (!comment.replies.nodes.length){
        return new Comment(comment)
    }else{
        let parent = new Comment(comment)
        comment.replies.nodes.forEach((c:any) => parent.replies.push(setComments(c)))
        return parent
    }
}

class Post implements IPost {
    id: string
    title: string
    slug: string
    readonly _date: string
    excerpt: string
    author: IAuthor
    content?: string
    commentCount: number
    postId: number
    preview_image?:IImage
    comments: IComment[]
    categories: ICategory[]
    tags: ITag[]

    constructor(post: any, icons?: any) {
        this.id = post.id
        this.title = post.title
        this.slug = post.slug
        this._date = post.date
        this.excerpt = post.excerpt
        this.content = post.content
        this.commentCount = post.commentCount
        this.postId = post.postId
        this.preview_image = post.featuredImage ?  new Image(post.featuredImage) : undefined
        this.author = new Author(post.author.node)
        this.comments = post.comments ? post.comments.nodes.map((c:any) => setComments(c)) : []
        this.categories = post.categories.nodes.map((c:any) => new Category(c, icons))
        this.tags = post.tags ? post.tags.nodes.map((t:any) => new Tag(t)) : []
    }

    getDate(): string {
        return moment(this._date).locale("ru").fromNow()
    }
}

export default Post

