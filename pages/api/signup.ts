import {NextApiRequest, NextApiResponse} from "next";
import "../../firebase/init"
import {registerUserWP} from "../../lib/api";


interface IRequest {
    name: string
    email: string
    password: string
    google?:boolean

    validate(): boolean
}

class Request implements IRequest {
    name: string
    email: string
    password: string
    google?:boolean

    constructor(payload: any) {
        this.name = payload.name
        this.email = payload.email
        this.password = payload.password
        this.google = payload.google
    }

    validate() {
        return !!(this.name && this.email && this.password)
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const request = new Request(req.body)

        if (!request.validate()) {
            return res.status(400).end()
        }

        if (req.method === 'POST') {
            if (request.google){
                await registerUserWP(request.email, request.email+ '--google', process.env.PASSWORD_FOR_USER_LOGIN_WITH_GOOGLE!, request.name)
                return res.status(200).end()
            }

            await registerUserWP(request.email, request.email, request.password, request.name)
            return res.status(200).end()
        }

        res.status(200).end()
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}
