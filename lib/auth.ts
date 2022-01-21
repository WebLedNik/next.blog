import '../firebase/init'

export enum localStorageAuthKeys {
    WP_UID = 'wp_uid',
    WP_AUTH_TOKEN = 'wp_authToken'
}

interface ISignUp {
    email: string,
    displayName: string,
    password?: string,
    google?: boolean
}

interface ILogin {
    email: string,
    password?: string,
    google?: boolean
}

export const fetchLogin = async (payload: ILogin): Promise<void> => {
    try {
        const res = await fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: payload.email,
                password: payload.google ? 'determined' : payload.password,
                google: payload.google
            })
        })

        const json = await res.json()

        localStorage.setItem(localStorageAuthKeys.WP_AUTH_TOKEN, json.authToken)
        localStorage.setItem(localStorageAuthKeys.WP_UID, json.user.id)
    } catch (e) {

    }
}

export const fetchSignup = async (payload: ISignUp): Promise<void> => {
    try {
        const res = await fetch('/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: payload.email,
                name: payload.displayName,
                password: payload.google ? 'determined' : payload.password,
                google: payload.google
            })
        })

        const json = await res.json()
        console.log('signup', json)
    } catch (e) {

    }
}

export const fetchLogout = async (): Promise<void> => {
    try {
        await fetch('/api/logout', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        localStorage.removeItem(localStorageAuthKeys.WP_AUTH_TOKEN)
        localStorage.removeItem(localStorageAuthKeys.WP_UID)
    } catch (e) {

    }
}

export const fetchRefresh = async (): Promise<any> => {
    try {
        const res = await fetch('/api/refresh', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if(res.status !== 200){
            return {error: true}
        }

        const json = await res.json()

        localStorage.setItem(localStorageAuthKeys.WP_AUTH_TOKEN, json.authToken)
        return {}
    } catch (e) {
        console.log(e)
    }
}


