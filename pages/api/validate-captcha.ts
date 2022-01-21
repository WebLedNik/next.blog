import {NextApiRequest, NextApiResponse} from "next";
import "../../firebase/init"
import {fetchValidateReCaptcha} from "../../lib/api";


interface IRequestVerifyCaptcha{
    captchaCode:string

    validate(): boolean
}

class RequestVerifyCaptcha implements IRequestVerifyCaptcha {
    captchaCode:string

    constructor(payload: any) {
        this.captchaCode = payload.captchaCode
    }

    validate() {
        return !!(this.captchaCode)
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const request = new RequestVerifyCaptcha(req.body)

        if (!request.validate()) {
            return res.status(400).end()
        }

        if (req.method === 'POST') {
            const success = await fetchValidateReCaptcha(request.captchaCode)

            if (!success) {
                return res.status(400).end()
            }

            return res.status(200).end()
        }

        res.status(200).end()
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}
