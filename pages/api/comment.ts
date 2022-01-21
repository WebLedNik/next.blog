import {NextApiRequest, NextApiResponse} from "next";
import {createComment} from "../../lib/api";



interface IRequestQuery {
    commentOn: number
    parent: number
    content: string

    validate(): boolean
}

class RequestQuery implements IRequestQuery {
    commentOn: number
    parent: number
    content: string

    constructor(payload: any) {
        this.commentOn = payload.commentOn
        this.parent = payload.parent
        this.content = payload.content
    }

    validate() {
        return !!(this.commentOn && this.content)
    }
}

const get = async (parent: number, commentOn: number, content: string, authToken: string) => {
    return await createComment(parent, commentOn, content, authToken)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const request = new RequestQuery(req.body)
        const authToken = req.headers.authorization?.split(' ')[1]

        if (!request.validate() || !authToken) {
            return res.status(400).end()
        }

        switch (req.method) {
            case 'GET':
                return res.status(200).end()
            case 'POST':
                const comment = await get(request.parent, request.commentOn, request.content, authToken)

                 if (!comment){
                     return  res.status(403).end()
                 }

                res.json(comment)
                return res.status(200).end()
            default:
                return res.status(200).end()
        }


    } catch (e) {
        console.log(e)
        return res.status(500).end()
    }
}
