import IComment from "./Comment.interface";
import IAuthor from "./Author.interface";
import Author from "./Author";
import moment from "moment";
import 'moment/locale/ru'

class Comment implements IComment{
    id:string
    readonly _date:string
    author:IAuthor
    content:string
    root:boolean
    collapse?:boolean
    replies:any[]
    parentId: number
    commentId: number

    constructor(comment: any) {
        this.id = comment.id
        this._date = comment.date
        this.author =  new Author(comment.author.node)
        this.content = comment.content
        this.root = !comment.parentId
        this.replies = []
        this.parentId = comment.parentId
        this.commentId = comment.commentId
        this.collapse = false
    }

    getDate(): string {
        return moment(this._date).locale("ru").fromNow()
    }

    setCollapse(): void{
        this.collapse = !this.collapse
    }
}

export default Comment
