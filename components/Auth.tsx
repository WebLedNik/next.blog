import React, {Dispatch, FormEvent, useEffect, useRef, useState} from "react";
import logoMail from "../public/images/social/mail.png"
import logoVk from "../public/images/social/vk.png"
import logoGoogle from "../public/images/social/google.png"
import Image from "next/image";
import Link from "next/link";
import Icon from "@mdi/react";
import {mdiChevronLeft, mdiLoading} from "@mdi/js";
import ReCAPTCHA from "react-google-recaptcha";
import {PopupActionTypes} from "../store/types/popup";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    updateProfile,
    createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "firebase/auth";
import {IStrengthInfo, PasswordStrengthTypes, strengthIndicator, strengthInfo} from "../lib/password-strength";
import {UserActionTypes} from "../store/types/user";
import {fetchLogin, fetchSignup} from "../lib/auth";

interface IProps {

}

interface IPropsLogin {
    setExAccount: Dispatch<boolean>
}

interface IPropsSignUp {
    setExAccount: Dispatch<boolean>
}

interface IPropsAuthSocial {
    setUseEmail: Dispatch<boolean>
}

interface IPropsSignUpUseEmail {
    login?: boolean
}

interface IPropsAuthInput {
    value: string
    name: string
    type: string
    placeholder: string
    autofocus?: boolean
    required?: boolean
    level?: IStrengthInfo
    login?: boolean
    invalid: boolean
    setInvalid: Dispatch<boolean>

    changeInput(name: string, value: string): void
}

interface IFromData {
    name: string
    email: string
    password: string
}

enum FormNames {
    name = 'name',
    email = 'email',
    password = 'password'
}

const AuthInput: React.FC<IPropsAuthInput> = ({
                                                  value,
                                                  name,
                                                  type,
                                                  placeholder,
                                                  autofocus,
                                                  changeInput,
                                                  required,
                                                  level,
                                                  login,
                                                  invalid,
                                                  setInvalid
                                              }) => {

    const handleFocusInput = () => {
        setInvalid(false)
    }

    return (
        <>
            <label
                style={(type === FormNames.password && !login) || (!login && name === FormNames.name && invalid) || (login && name === FormNames.email && invalid) ? {marginBottom: '0'} : {}}
                className={'auth__label'}>
                <input onFocus={() => handleFocusInput()}
                       className={invalid ? 'auth__input auth__input_error' : 'auth__input'}
                       onChange={(e => changeInput(name, e.target.value))} value={value}
                       type={type} name={name} placeholder={placeholder} autoFocus={autofocus} required={required}/>
            </label>
            {name === FormNames.password && !login ?
                (
                    <div className={'auth__hint'}>
                        <div className={'auth__password-strength'}>
                            <span className={'text-body-2'}>{level?.label}</span>
                            <div style={{backgroundColor: level?.color}} className={'auth__strength-color'}/>
                        </div>
                    </div>
                ) : null}
            {!login && name === FormNames.name && invalid ? (
                <div className={'auth__hint'}>
                    <div className={'auth__error'}>
                        <span className={'text-body-2'}>Пользователь уже зарегистрирован</span>
                    </div>
                </div>
            ) : null}

            {login && name === FormNames.email && invalid ? (
                <div className={'auth__hint'}>
                    <div className={'auth__error'}>
                        <span className={'text-body-2'}>Неверная почта или пароль</span>
                    </div>
                </div>
            ) : null}
        </>
    )
}

const AuthSocial: React.FC<IPropsAuthSocial> = ({setUseEmail}) => {
    const dispatch = useDispatch()
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const handleClickOnEmail = () => {
        setUseEmail(true)
    }

    const handleClickOnGoogle = async () => {
        try {
            auth.useDeviceLanguage();
            const {user} = await signInWithPopup(auth, provider)
            dispatch({type: PopupActionTypes.SET_SHOW_AUTH, payload: false})

            await fetchSignup({email: user.email!, displayName: user.displayName!, google: true})
            await fetchLogin({email: user.email!, google: true})

        }catch (e) {

        }

    }

    return (
        <div className={'auth__social'}>
            <div className={'social-container'}>
                <button onClick={() => handleClickOnEmail()}
                        className={'social-container__btn social-container__btn_fill'}>
                    <div className={'social-container__btn--wrapper'}>
                        <div className={'social__icon'}>
                            <Image src={logoMail} alt="" width={24}
                                   height={24}/>
                        </div>
                        <span>Почта</span>
                    </div>
                </button>
                <button className={'social-container__btn social-container__btn_fill'}>
                    <div className={'social-container__btn--wrapper'}>
                        <div className={'social__icon'}>
                            <Image src={logoVk} alt="" width={24}
                                   height={24}/>
                        </div>
                        <span>ВКонтакте</span>
                    </div>
                </button>
                <button onClick={() => handleClickOnGoogle()}
                        className={'social-container__btn social-container__btn_fill'}>
                    <div className={'social-container__btn--wrapper'}>
                        <div className={'social__icon'}>
                            <Image src={logoGoogle} alt="" width={24}
                                   height={24}/>
                        </div>
                        <span>Google</span>
                    </div>
                </button>
            </div>
        </div>
    )
}

const AuthForm: React.FC<IPropsSignUpUseEmail> = ({login}) => {
    const dispatch = useDispatch()
    const auth = getAuth();
    const [formData, setFormData] = useState<IFromData>({name: '', email: '', password: ''})
    const [disabled, setDisabled] = useState<boolean>(true)
    const [captchaCode, setCaptchaCode] = useState<string | null>(null)
    const [strength, setStrength] = useState<number>(0);
    const [invalid, setInvalid] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const [level, setLevel] = useState<IStrengthInfo>();
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const {showAuth} = useTypedSelector(state => state.popup)

    const handleChangeInput = (name: string, value: string): void => {
        switch (name) {
            case FormNames.name:
                return setFormData({...formData, name: value})
            case FormNames.email:
                return setFormData({...formData, email: value})
            case FormNames.password:
                setStrength(strengthIndicator(value));
                setLevel(strengthInfo(strength));
                return setFormData({...formData, password: value})
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        try {
            e.preventDefault()
            setLoading(true)

            if (!login) {
                if (!captchaCode) {
                    setLoading(false)
                    return
                }

                const resVerifyCaptcha = await fetch('/api/validate-captcha', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({captchaCode})
                })

                if (resVerifyCaptcha.status !== 200) {
                    setLoading(false)
                    setInvalid(true)
                    return
                }

                await createUserWithEmailAndPassword(auth, formData.email, formData.password)
                await updateProfile(auth.currentUser!, {displayName: formData.name})

                dispatch({type: UserActionTypes.UPDATE_USER, payload: {name: formData.name}})
                await fetchSignup({email: formData.email!, displayName: formData.name!, password: formData.password})
                await fetchLogin({email: formData.email!, password: formData.password})
            } else {
                await signInWithEmailAndPassword(auth, formData.email, formData.password)
                await fetchLogin({email: formData.email!, password: formData.password})
            }

            dispatch({type: PopupActionTypes.SET_SHOW_AUTH, payload: false})
        }catch (e){
            setLoading(false)
            setInvalid(true)
        }
    }

    const handleChangeReCaptcha = (code: any) => {
        setCaptchaCode(code)
    }

    const handleExpiredReCaptcha = () => {
        recaptchaRef.current?.reset()
    }

    useEffect(() => {
        if (login) {
            (formData.email && formData.password) ? setDisabled(false) : setDisabled(true)
        } else {
            (formData.name && formData.email && formData.password && captchaCode && level?.label !== PasswordStrengthTypes.Poor) ? setDisabled(false) : setDisabled(true)
        }
    }, [formData, captchaCode])

    useEffect(() => {
        return () => {
            recaptchaRef.current?.reset()
        }
    }, [showAuth])

    return (
        <div className={'auth__form'}>
            <form onSubmit={e => handleSubmit(e)} className={'auth__form--container'}>
                {login ? (
                    <AuthInput login={login} setInvalid={setInvalid} invalid={invalid} autofocus={true}
                               value={formData.email}
                               changeInput={handleChangeInput}
                               name={FormNames.email} type={'email'}
                               placeholder={'Почта'} required={true}/>
                ) : (
                    <>
                        <AuthInput login={login} setInvalid={setInvalid} invalid={invalid} value={formData.name}
                                   changeInput={handleChangeInput}
                                   name={FormNames.name}
                                   type={'text'}
                                   placeholder={'Имя и фамилия'} autofocus={true} required={true}/>
                        <AuthInput login={login} setInvalid={setInvalid} invalid={invalid} value={formData.email}
                                   changeInput={handleChangeInput}
                                   name={FormNames.email}
                                   type={'email'}
                                   placeholder={'Почта'} required={true}/>
                    </>
                )}
                <AuthInput setInvalid={setInvalid} invalid={invalid} login={login} level={level}
                           value={formData.password}
                           changeInput={handleChangeInput}
                           name={FormNames.password}
                           type={'password'} placeholder={'Пароль'} required={true}/>

                {login ? null : (<div style={{marginBottom: '16px'}}>
                    <ReCAPTCHA
                        sitekey={process.env.PUBLIC_RECAPTCHA_SITE_KEY!}
                        ref={recaptchaRef}
                        onChange={handleChangeReCaptcha}
                        onExpired={handleExpiredReCaptcha}
                    />
                </div>)}

                <button disabled={disabled} className={'auth__form-btn'}
                        type={'submit'}>
                    {loading ? <Icon path={mdiLoading} size={1} spin/> : null}
                    {login ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>
        </div>
    )
}

const SignUp: React.FC<IPropsSignUp> = ({setExAccount}) => {
    const [useEmail, setUseEmail] = useState<boolean>(false)
    const {showAuth} = useTypedSelector(state => state.popup)

    const handleClickLogin = () => {
        setExAccount(true)
    }

    const handleClickCb = () => {
        setUseEmail(false)
    }

    useEffect(() => {
        return () => {
            setUseEmail(false)
        }
    }, [showAuth])

    return (
        <div className={'auth__signup'}>
            <div style={!useEmail ? {marginBottom: '100px'} : {}} className={'auth__cb'}>
                {useEmail ? <button onClick={() => handleClickCb()}>
                    <Icon path={mdiChevronLeft} size={1}/>
                    <span>Назад</span>
                </button> : null}
            </div>
            <div className={'auth__title text-h2'}>Регистрация</div>
            {useEmail ? <AuthForm/> : <AuthSocial setUseEmail={setUseEmail}/>}
            <div className={'auth__footer'}>
                <button className={'auth__btn'}>
                    <span className={'text-body-2'}>Есть аккаунт?</span>
                    <strong onClick={() => handleClickLogin()}>Войти</strong>
                </button>
                <Link href={'/'}>
                    <a className={'auth__btn auth__btn--last'}>
                        <strong>Политика конфиденциальности</strong>
                    </a>
                </Link>
            </div>
        </div>
    )
}

const Login: React.FC<IPropsLogin> = ({setExAccount}) => {
    const [useEmail, setUseEmail] = useState<boolean>(false)
    const {showAuth} = useTypedSelector(state => state.popup)

    const handleClick = () => {
        setExAccount(false)
    }

    const handleClickCb = () => {
        setUseEmail(false)
    }

    useEffect(() => {
        return () => {
            setUseEmail(false)
        }
    }, [showAuth])

    return (
        <div className={'auth__login'}>
            <div style={!useEmail ? {marginBottom: '100px'} : {}} className={'auth__cb'}>
                {useEmail ? <button onClick={() => handleClickCb()}>
                    <Icon path={mdiChevronLeft} size={1}/>
                    <span>Назад</span>
                </button> : null}
            </div>
            <div className={'auth__title text-h2'}>Вход</div>
            {useEmail ? <AuthForm login={true}/> : <AuthSocial setUseEmail={setUseEmail}/>}
            <div className={'auth__footer'}>
                {useEmail ? <button className={'auth__btn'} style={{marginBottom: '8px'}}>
                    <strong>Забыли пароль?</strong>
                </button> : null}
                <button className={'auth__btn'}>
                    <strong onClick={() => handleClick()}>Регистрация</strong>
                </button>
                <Link href={'/'}>
                    <a className={'auth__btn auth__btn--last'}>
                    </a>
                </Link>
            </div>
        </div>
    )
}

const Auth: React.FC<IProps> = () => {
    const [exAccount, setExAccount] = useState<boolean>(false)
    const {showAuth} = useTypedSelector(state => state.popup)

    useEffect(() => {
        return () => {
            setExAccount(false)
        }
    }, [showAuth])

    return (
        <div className={'auth'}>
            {exAccount ? <Login setExAccount={setExAccount}/> : <SignUp setExAccount={setExAccount}/>}
        </div>
    )
}

export default Auth
