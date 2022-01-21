import React, {Dispatch, useEffect, useRef, useState} from "react";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {PopupActionTypes} from "../store/types/popup";
import Icon from "@mdi/react";
import Image from "next/image";
import bgAuth from "../public/images/bg/auth.png"
import {mdiClose} from "@mdi/js";
import {useRouter} from "next/router";

interface IProps {
    maxWidth: number
}

const PopupAuth: React.FC<IProps> = ({children, maxWidth}) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {showAuth} = useTypedSelector(state => state.popup)
    const windowRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (showAuth) {
            document.body.style.overflow = 'hidden'
            // document.body.style.paddingRight = '17px'
        }

        return () => {
            document.body.style.overflow = ''
            document.body.style.paddingRight = ''
        }
    }, [showAuth])

    useEffect(() => {
        dispatch({type: PopupActionTypes.SET_SHOW_AUTH, payload: false})
    }, [router])

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        // @ts-ignore
        if (!windowRef.current?.contains(e.target)) {
            dispatch({type: PopupActionTypes.SET_SHOW_AUTH, payload: false})
        }
    }

    const handleClickClose = () => {
        dispatch({type: PopupActionTypes.SET_SHOW_AUTH, payload: false})
    }

    return (
        <div onClick={(e) => handleClickOutside(e)}
             className={showAuth ? 'popup popup__overlay' : 'popup popup__overlay popup--disable'}>
            <div ref={windowRef} style={{maxWidth: maxWidth + 'px'}} className={'popup__window popup__window--auth'}>
                <Image className={'popup__cover'} src={bgAuth} width={'100%'} height={600}/>
                <div  className={'popup__content'}>
                    <div onClick={() => handleClickClose()} className={'popup__close'}>
                        <Icon path={mdiClose} size={1}/>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default PopupAuth
