import ITag from "./Tag.interface";

class Tag implements ITag {
    id: string
    name: string

    constructor(tag:any) {
        this.id = tag.id
        this.name = tag.name
    }
}

export default Tag
