import IAuthor from "./Author.interface";

interface IComment{
    id:string
    readonly _date:string
    content: string
    author: IAuthor
    replies:any[]
    root:boolean
    collapse?:boolean
    parentId: number
    commentId: number
    getDate(): string
    setCollapse(): void
}

export default IComment
