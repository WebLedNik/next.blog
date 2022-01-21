import IAvatar from './Avatar.interface'

interface IUser {
    id: string | null
    idGoogle?: string | null
    name: string | null
    email: string | null
    slug: string | null
    firstName?: string | null
    lastName?: string | null
    emailVerified: boolean | null
    avatar: IAvatar | null
}

export default IUser
