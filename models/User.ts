import IUser from './User.interface'
import IAvatar from "./Avatar.interface";
import Avatar from "./Avatar";

class User implements IUser{
    id:string | null
    name:string | null
    email:string | null
    slug:string | null
    firstName?:string | null
    lastName?:string | null
    avatar: IAvatar | null
    emailVerified:boolean | null

    constructor(user: any) {
        this.id = user.id
        this.name = user.name
        this.slug = user.slug
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.email = user.email
        this.emailVerified = user.emailVerified
        this.avatar = user.avatar ? new Avatar(user.avatar) : null
    }
}

export default User
