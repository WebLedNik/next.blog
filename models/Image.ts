import IImage from "./Image.interface";

class Image implements IImage{
    src: string
    alt: string
    caption:string

    constructor(image: any) {
        this.src = image.node.mediaItemUrl ? image.node.mediaItemUrl : ""
        this.alt = image.node.altText ? image.node.altText : ""
        this.caption = image.node.caption ? image.node.caption : ""
    }
}

export default Image
