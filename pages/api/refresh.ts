import {NextApiRequest, NextApiResponse} from "next";
import {createPayloadCookie} from "../../lib/cookies";
import packageInfo from "../../cookies.config.json"
import {refreshAuthTokenWP} from "../../lib/api";

const cookies = packageInfo.cookies


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const refreshToken = req.cookies.wp_refreshToken

        if (!refreshToken) {
            return res.status(401).end()
        }

        const {refreshJwtAuthToken} = await refreshAuthTokenWP(refreshToken)

        res.json({authToken: refreshJwtAuthToken.authToken})
        return res.status(200).end()
    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}
