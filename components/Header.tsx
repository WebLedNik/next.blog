import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import Searcher from "./Searcher";
import Icon from "@mdi/react";
import {mdiAccountOutline, mdiChevronDown, mdiExitRun, mdiMenu} from "@mdi/js";
import {useDispatch} from "react-redux";
import {PopupActionTypes} from "../store/types/popup";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useRouter} from "next/router";
import '../firebase/init'
import {getAuth, signOut} from "firebase/auth";
import {UserActionTypes} from "../store/types/user";
import {getInitials} from "../lib/user-initials";
import {fetchLogout} from "../lib/auth";

interface IProps {
    clickOnMenu(): void
}

interface IPropsUserLogin {

}

interface IPropsUserMenu {

}


const UserMenu: React.FC<IPropsUserMenu> = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const auth = getAuth()
    const user = useTypedSelector(state => state.user)
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null)

    const handleClickIcon = () => {
        setShowMenu(true)
    }

    const handleBlurMenu = () => {
        setShowMenu(false)
    }

    const handleClickLogout = async () => {
        try {
            await signOut(auth)
            dispatch({type: UserActionTypes.CLEAR_USER})
        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        if (showMenu) {
            menuRef.current?.focus()
        }
    }, [showMenu])

    useEffect(() => {
        setShowMenu(false)
    }, [router])

    return (
        <>
            <div className={'header__user-profile'}>
                <Link href={'/'}>
                    <a style={{display: 'flex', alignItems: 'center'}}>
                        {user.avatar?.url ? <img className={'header__user-avatar'} src={user.avatar?.url}/> :
                            <div className={'header__user-avatar avatar'}>
                                <span>{getInitials(user.name!)}</span>
                            </div>}
                    </a>
                </Link>
                <div className={'header__user-icon'} onClick={() => handleClickIcon()}>
                    <Icon path={mdiChevronDown} size={1}/>
                </div>
            </div>
            {showMenu ?
                (<div tabIndex={-1} onBlur={() => handleBlurMenu()} ref={menuRef} className={'header__user-menu'}>
                    <ul className={'header__user-list'}>
                        <Link href={'/'}>
                            <li className={'header__user-item'}>
                                <a className={'header__user-link'}>
                                    {user.avatar?.url ?
                                        <img className={'header__user-avatar--menu'} src={user.avatar?.url}/> :
                                        <div className={'header__user-avatar--menu avatar'}>
                                            <span style={{fontSize:'16px'}}>{getInitials(user.name!)}</span>
                                        </div>}
                                    <span className={'text-body-2'}>{user.name}</span>
                                </a>
                            </li>
                        </Link>
                        <li onClick={() => handleClickLogout()} className={'header__user-item'}>
                            <div className={'header__user-logout'}>
                                <Icon path={mdiExitRun} size={0.8}/>
                                <span className={'text-body-2'}>Выход</span>
                            </div>
                        </li>
                    </ul>
                </div>) : null}

        </>
    )
}

const UserLogin: React.FC<IPropsUserLogin> = () => {
    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch({type: PopupActionTypes.SET_SHOW_AUTH, payload: true})
    }

    return (
        <div onClick={() => handleClick()} className={'header__user-login'}>
            <Icon path={mdiAccountOutline} size={1.2}/>
            <span>Войти</span>
        </div>
    )
}

const Header: React.FC<IProps> = ({clickOnMenu}) => {
    const user = useTypedSelector(state => state.user)

    return (
        <header id="header" className={'header'}>
            <div className={`header__row container`}>
                <div onClick={() => clickOnMenu()} className={'header__menu'}>
                    <Icon path={mdiMenu} size={1}/>
                </div>
                <div className={`header__logo`}>
                    <Link href={'/'}>
                        <a>
                            <span>Meliora</span>
                        </a>
                    </Link>
                </div>
                <div className={'header__searcher'}>
                    <Searcher/>
                </div>
                <div className={'header__spacer'}/>
                <div className={'header__user'}>
                    {user.id ? <UserMenu/> : <UserLogin/>}
                </div>
            </div>
        </header>
    )
}

export default Header

