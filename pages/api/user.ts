import {NextApiRequest, NextApiResponse} from "next";
import {getUser} from "../../lib/api";

enum authTypes{
    DEFAULT = 'password',
    GOOGLE = 'google.com'
}

interface IRequestQuery {
    login: string
    type: string

    validate(): boolean
    getModifiedLogin():string
}

class RequestQuery implements IRequestQuery {
    login: string
    type: string

    constructor(payload: any) {
        this.login = payload.login
        this.type = payload.type
    }

    validate() {
        return !!(this.login)
    }

    getModifiedLogin(){
        switch (this.type){
            case authTypes.GOOGLE:
                return this.login+'--google'
            default:
                return this.login
        }
    }
}

const get = async (login:string) => {
    return await getUser(login)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const request = new RequestQuery(req.query)

        if (!request.validate()) {
            return res.status(400).end()
        }

        switch (req.method) {
            case 'GET':
                const user = await get(request.getModifiedLogin())
                res.json(user)
                return res.status(200).end()
            default:
                return res.status(200).end()
        }


    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}
