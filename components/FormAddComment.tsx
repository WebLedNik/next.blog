import React, {Dispatch, FormEvent, SetStateAction, useEffect, useRef, useState} from "react";
import TextareaAutosize from 'react-textarea-autosize';
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {PopupActionTypes} from "../store/types/popup";
import IComment from "../models/Comment.interface";
import {localStorageAuthKeys} from "../lib/auth";
import Comment from "../models/Comment";

interface IProps {
    comments: IComment[]
    postId: number
    commentId?: number
    focusFromParent?: boolean

    handleClickReply?(): void

    updateComments(): void
}

interface IFromData {
    text: string
}

const FormAddComment: React.FC<IProps> = ({focusFromParent, handleClickReply, updateComments, postId, comments, commentId}) => {
    const dispatch = useDispatch()
    const user = useTypedSelector(state => state.user)
    const [focus, setFocus] = useState(false)
    const [formData, setFormData] = useState<IFromData>({text: ''})
    let textarea: HTMLTextAreaElement | null

    useEffect(() => {
        if (focusFromParent && textarea) {
            textarea.focus()
            setFocus(true)
        }
    }, [])

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            const authToken = localStorage.getItem(localStorageAuthKeys.WP_AUTH_TOKEN)

            e.preventDefault()

            if (!user.id) {
                dispatch({type: PopupActionTypes.SET_SHOW_AUTH, payload: true})
                return
            }

            const res = (await fetch('/api/comment', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    commentOn: postId,
                    parent: commentId,
                    content: formData.text
                })
            }))

            const json = await res.json()

            const comment = new Comment(json.createComment.comment)
            comments.unshift(comment)
            updateComments()
            setFormData({...formData, text: ''})
        } catch (e) {
        }
    }

    const handleFocusTextarea = (e: React.FormEvent) => {
        setFocus(true)
    }

    const handleBlurTextarea = (e: React.FormEvent) => {
        setFocus(false)
        if (handleClickReply) {
            handleClickReply()
        }
    }

    const handleChangeTextarea = (text: string) => {
        setFormData({...formData, text})
    }

    const handleMousedownBtn = (e: FormEvent) => {
        e.preventDefault()
    }

    return (
        <form onSubmit={handleSubmit} className={'form-add-comment'}>
            <div className={'form-add-comment__textarea'}>
                <TextareaAutosize value={formData.text} onChange={e => handleChangeTextarea(e.target.value)}
                                  ref={(tag) => (textarea = tag)}
                                  style={focus ? {marginBottom: "8px"} : {}}
                                  minRows={focus ? 5 : 2} onBlur={(e) => handleBlurTextarea(e)}
                                  onFocus={(e) => handleFocusTextarea(e)} placeholder={'Написать комментарий...'}
                                  className={focus ? "textarea-default textarea-default_active" : `textarea-default`}/>
            </div>
            {focus ? (<div className={'form-add-comment__actions'}>
                <button onMouseDown={(e) => handleMousedownBtn(e)} disabled={!formData.text}
                        className={`form-add-comment__btn`} type={'submit'}>Отправить
                </button>
            </div>) : null}
        </form>
    )
}

export default FormAddComment
