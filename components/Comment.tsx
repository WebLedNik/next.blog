import React, {Dispatch, useEffect, useRef, useState} from "react";
import styles from "../styles/Comment.module.css"
import IComment from "../models/Comment.interface";
import Link from "next/link";
import FormAddComment from "./FormAddComment";

interface IProps {
    postId: number
    comment: IComment
    collapse?: boolean
    clickCollapse?: Dispatch<any>
    updateComments(): void
}

const Comment: React.FC<IProps> = ({comment, collapse, clickCollapse, updateComments, postId}) => {
    const [reply, setReply] = useState<boolean>(false)
    const [focus, setFocus] = useState<boolean>(false)

    const handleClickReply = (): void => {
        setReply(!reply)
        setFocus(!focus)
    }

    return (
        <div className={styles.comment} style={collapse ? {marginBottom: "24px"} : {}}>
            {comment.root ? null : (<div className={styles.comment__arc}/>)}
            <div className={styles.comment__header}>
                {comment.author?.avatar?.url ? (<img className={styles.comment__avatar} src={comment.author.avatar.url} alt=""/>) : null}
                <div className={styles.comment__info}>
                    <Link href={'/'}>
                        <a className={`${styles.comment__author}`}>
                            <strong>{comment.author.name}</strong>
                        </a>
                    </Link>
                    <span className={`${styles.comment__date} text-caption`}>{comment.getDate()}</span>
                </div>

            </div>
            {comment.content ? <div className={`${styles.comment__body} text-body-2`}
                                    dangerouslySetInnerHTML={{__html: comment.content}}/> : null}
            {reply ?
                <div className={styles.comments__wrapper_reply}>
                    <FormAddComment commentId={comment.commentId} postId={postId} comments={comment.replies} updateComments={updateComments} focusFromParent={focus} handleClickReply={handleClickReply}/>
                </div> : null}
            <div className={`${styles.comment__actions}`}>
                {reply ? null : <span onClick={() => handleClickReply()}
                                        className={`text-caption ${styles.comment__reply}`}>Ответить</span>}
                {comment.replies.length && clickCollapse && !reply ?
                    (<span onClick={() => clickCollapse(comment)} className={`text-caption ${styles.comment__resize}`}>{collapse ? 'Развернуть' : 'Свернуть'}</span>) : null}
            </div>
        </div>
    )
}

export default Comment
