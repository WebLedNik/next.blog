import React, {useEffect, useRef, useState} from "react";
import FormAddComment from "./FormAddComment";
import Comment from "./Comment";
import IComment from "../models/Comment.interface";

interface IProps {
    postId: number
    comments: IComment[]
    commentCount: number
}

const Comments: React.FC<IProps> = (prop) => {
    const [comments, setComments] = useState<IComment[]>(prop.comments)
    const [switcher, setSwitcher] = useState<boolean>(false)
    console.log(comments)
    console.log(prop.postId)
    const handleUpdateComments = () => {
        setSwitcher(!switcher)
    }


    useEffect(() => {
        setComments(prop.comments)
    }, [prop.comments])

    useEffect(() => {
        setComments(comments)
    }, [switcher])


    /**
     * Возвращает родительский комментарий со всеми дочерними комментариями
     * @param  c - информация по комментарию
     * @return ReactElement - React элемент с комментариями
     * @type {(c: IComment) => WrapperRepliesOfComment: ReactElement[]}
     */
    const setCommentsHtml = (c: IComment) => {

        const handleClickCollapse = (comment: IComment): void => {
            comment.collapse = !comment.collapse
            setSwitcher(!switcher)
        }

        if (!c.replies.length) {
            return (<Comment postId={prop.postId} updateComments={handleUpdateComments} key={c.id} comment={c}/>)
        } else {
            // @ts-ignore
            let commentElements: React.ReactElement[] = [<Comment postId={prop.postId} updateComments={handleUpdateComments} key={c.id} collapse={c.collapse}
                                                                  clickCollapse={handleClickCollapse} comment={c}/>]
            c.replies.forEach(comment => commentElements.push(setCommentsHtml(comment)))

            return (
                <div className={'comments__body'} key={c.id + 'W_2x4v+OLJ#i'}>
                    {commentElements[0]}
                    <div style={c.collapse ? {display: "none"} : {}} key={c.id + 'PfPy@DYy?4rw'}
                         className={'comments__replies'}>
                        {commentElements.map((commentElement, index) => index === 0 ? null : commentElement)}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className={'comments'}>
            <div className={'comments__title'}>
                <strong>Комментариев: {prop.commentCount ? prop.commentCount : '0'}</strong>
            </div>
            <div className={'comments__form'}>
                <FormAddComment comments={comments} postId={prop.postId} updateComments={handleUpdateComments} />
            </div>
            <div className={'comments__content'}>
                {comments.map((c) => setCommentsHtml(c))}
            </div>
        </div>
    )
}

export default Comments
