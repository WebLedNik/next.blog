import IAvatar from "./Avatar.interface";

class Avatar implements IAvatar{
    url: string | null

    constructor(avatar: any) {
        this.url = avatar.url
    }
}

export default Avatar
