import {NextApiRequest, NextApiResponse} from "next";
import {createPayloadCookie} from "../../lib/cookies";
import packageInfo from "../../cookies.config.json"

const cookies = packageInfo.cookies

export default async function handler(req:NextApiRequest, res: NextApiResponse){
    try {
        const payloadDeleteRefreshToken = createPayloadCookie(cookies.names.jwt_refresh, '', {domain: cookies.options.delete_cookie.domain,  path: cookies.options.delete_cookie.path, sameSite: 'strict', secure: cookies.options.delete_cookie.secure, httpOnly: true,  maxAge: cookies.options.delete_cookie.maxAge})

        res.setHeader('Set-Cookie', [payloadDeleteRefreshToken])
        return res.status(200).end()
    }catch (e) {
        console.log(e)
        res.status(500).end()
    }
}
