import {NextApiRequest, NextApiResponse} from "next";
import {loginAdmin, loginUserWP} from "../../lib/api";
import packageInfo from "../../cookies.config.json"
import {createPayloadCookie} from "../../lib/cookies";

const cookies = packageInfo.cookies

interface IRequest {
    email: string
    password: string
    google?:boolean

    validate(): boolean
}

class Request implements IRequest {
    email: string
    password: string
    google?:boolean

    constructor(payload: any) {
        this.email = payload.email
        this.password = payload.password
        this.google = payload.google
    }

    validate() {
        return !!(this.email && this.password)
    }
}

const loginGoogle = async (res: NextApiResponse, email: string) => {
    const {login} = await loginUserWP(email + '--google', process.env.PASSWORD_FOR_USER_LOGIN_WITH_GOOGLE!)
    const payloadRefreshToken = createPayloadCookie(cookies.names.jwt_refresh, login.refreshToken, {domain: cookies.options.jwt_refresh.domain,  path: cookies.options.jwt_refresh.path, sameSite: 'strict', secure: cookies.options.jwt_refresh.secure, httpOnly: cookies.options.jwt_refresh.httpOnly,  maxAge: cookies.options.jwt_refresh.maxAge})

    res.setHeader('Set-Cookie', [payloadRefreshToken])
    res.json({authToken: login.authToken, user: login.user})
}

const loginDefault = async (res: NextApiResponse, email: string, password: string) => {
    const {login} = await loginUserWP(email,password)
    const payloadRefreshToken = createPayloadCookie(cookies.names.jwt_refresh, login.refreshToken, {domain: cookies.options.jwt_refresh.domain,  path: cookies.options.jwt_refresh.path, sameSite: 'strict', secure: cookies.options.jwt_refresh.secure, httpOnly: cookies.options.jwt_refresh.httpOnly,  maxAge: cookies.options.jwt_refresh.maxAge})

    res.setHeader('Set-Cookie', [payloadRefreshToken])
    res.json({authToken: login.authToken, user: login.user})
}

export default  async function handler(req: NextApiRequest, res: NextApiResponse){
    try {
        const request = new Request(req.body)

        if (!request.validate()) {
            return res.status(400).end()
        }

        if (req.method === 'POST') {
            if(request.google){
                await loginGoogle(res, request.email)
                return res.status(200).end()
            }

            await loginDefault(res, request.email, request.password)
            return res.status(200).end()
        }

    }catch (e) {
        console.log(e)
        res.status(500).end()
    }
}
