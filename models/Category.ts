import ICategory from "./Category.interface";
import IPost from "./Post.interface";
import Post from "./Post";
import ITag from "./Tag.interface";
import Tag from "./Tag"

class Category implements ICategory{
    id:string
    count: number | null
    slug: string
    name: string
    description: string | null
    icon?: any | undefined
    posts?: IPost[] | []
    tags: ITag[]

    constructor(category: any, icons?: any) {
        this.id = category.id
        this.count = category.count
        this.slug = category.slug
        this.name = category.name
        this.description = category.description
        this.icon = (icons && icons.length) ? icons.find((i: any) => (i.category_slug === category.slug)) : null
        this.posts =  []
        this.tags = []
    }

    setPosts(posts: any[]){
        this.posts = posts.length ? posts.map((c:any) => new Post(c)) : []
    }

    /**
     * Получаем все метки принадлежащие категории
     * new Set для того чтобы исключить повторение меток
     * @param tags
     */
    setTags(tags: any){
        let unique = new Set

        tags.nodes[0].posts.nodes.forEach((p:any) => {
            p.tags.nodes.forEach((t:any) => unique.add(JSON.stringify(t)))
        })

        // @ts-ignore
        unique.forEach(u => this.tags.push(new Tag(JSON.parse(u))))
    }
}

export default Category
