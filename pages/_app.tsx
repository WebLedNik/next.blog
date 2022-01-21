import '../styles/globals.css'
import type {AppProps} from 'next/app'
import Default from "../layouts/Default";
import {ThemeProvider} from "next-themes";
import React, {useEffect} from "react";
import {useRouter} from 'next/router';
import {Provider} from "react-redux";
import {store} from "../store";
import PopupAuth from "../components/PopupAuth";
import Auth from "../components/Auth";
// @ts-ignore
import NProgress from 'nprogress';
import AuthProvider from "../components/AuthProvider";


function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter()

    useEffect(() => {
        NProgress.configure({parent: '#header'});

        router.events.on("routeChangeStart", () => {
            NProgress.start();
        })
        router.events.on("routeChangeComplete", () => {
            NProgress.done();
        })
        router.events.on("routeChangeError", () => {
            NProgress.done();
        })

        return () => {
            router.events.off("routeChangeStart", () => {
                NProgress.start();
            })
            router.events.off("routeChangeComplete", () => {
                NProgress.done();
            })
            router.events.off("routeChangeError", () => {
                NProgress.done();
            })
        }
    })

    return (
        <Provider store={store}>
            <ThemeProvider>
                <AuthProvider>
                    <Default {...pageProps}>
                        <Component {...pageProps} />
                    </Default>
                    <div className={'popup-container'}>
                        <PopupAuth maxWidth={600}>
                            <Auth/>
                        </PopupAuth>
                    </div>
                </AuthProvider>
            </ThemeProvider>
        </Provider>
    )
}

export default MyApp
