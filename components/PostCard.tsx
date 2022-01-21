import React from "react";
import Icon from "@mdi/react";
import {mdiMessageOutline} from "@mdi/js";
import Link from "next/link";
import IPost from "../models/Post.interface";
import Image from "next/image";

interface IProps {
    post: IPost
    hiddenAuthor?: boolean
}

const PostCard: React.FC<IProps> = ({post, hiddenAuthor}) => {
    return (
        <div className={`post_card box-shadow`}>
            <div className={`post_card__subheader`}>
                {hiddenAuthor ? null : (<div className='post_card__category'>
                    <Link href={'/' + post.categories[0].slug}>
                        <a className={`text-body-2`}>
                            {post.categories[0].icon.src ?
                                <Image className='nav__icon' src={post.categories[0].icon.src} alt="" width={24}
                                       height={24}/> : null}
                            <span>{post.categories[0].name}</span>
                        </a>
                    </Link>
                </div>)}
                <Link href={'/'}>
                    <a className={`post_card__author text-body-2`}>{post.author.name}</a>
                </Link>
                <span className={'text-caption'}>{post.getDate()}</span>
            </div>
            <div className={`post_card__content`}>
                <Link href={'/' + post.categories[0].slug + '/' + post.slug}>
                    <a style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}/>
                </Link>
                <div className={`post_card__title`}>
                    <span className={'text-h2'}>{post.title}</span>
                </div>
                {post.excerpt ? <div className={`post_card__subtitle text-body-2`}
                                     dangerouslySetInnerHTML={{__html: post.excerpt}}/> : null}
                {post.preview_image?.src ?
                    (<figure className='post_card__image'>
                        <img src={post.preview_image?.src} alt={post.preview_image?.alt}/>
                    </figure>) : null}
            </div>
            <div className={`post_card__actions`}>
                <ul className='post_card__controls'>
                    <li>
                        <Link href={'/' + post.categories[0].slug + '/' + post.slug + '?comments'}>
                            <a>
                                <Icon className='post_card__icon' path={mdiMessageOutline} size={.9}/>
                                <span>{post.commentCount}</span>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PostCard
