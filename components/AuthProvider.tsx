import React, {useEffect} from "react";
import "../firebase/init"
import {getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import {UserActionTypes} from "../store/types/user";
import {useDispatch} from "react-redux";
import IUser from "../models/User.interface";
import User from "../models/User";
import {useRouter} from "next/router";
import {fetchLogout, fetchRefresh, localStorageAuthKeys} from "../lib/auth";

const AuthProvider: React.FC = ({children}) => {
    const router = useRouter()
    const auth = getAuth()
    const dispatch = useDispatch()

    // const loginAdmin = async () => {
    //     await fetch('api/login', {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({})
    //     })
    // }


    useEffect(() => {
        let timerRefresh: ReturnType<typeof setTimeout>

        onAuthStateChanged(auth, async (user) => {
            if (user) {

                const payload: IUser = {
                    id: localStorage.getItem(localStorageAuthKeys.WP_UID) || user.uid,
                    idGoogle: user.uid,
                    avatar: {url: user.photoURL},
                    email: user.email,
                    emailVerified: user.emailVerified,
                    name: user.displayName,
                    slug: null
                }

                dispatch({type: UserActionTypes.SET_USER, payload})

                if (!localStorage.getItem(localStorageAuthKeys.WP_UID)){
                    return
                }

                const res = await fetchRefresh()

                if (res.error) {
                    await signOut(auth)
                }

                timerRefresh = setTimeout(async () => {
                    const res = await fetchRefresh()

                    if (res.error) {
                        await signOut(auth)
                    }
                }, 250 * 1000)
            } else {
                dispatch({type: UserActionTypes.CLEAR_USER})
                await fetchLogout()
            }
        });

        return () => {
            clearTimeout(timerRefresh)
        }
    }, [router])

    return (
        <>
            {children}
        </>
    )
}

export default AuthProvider
