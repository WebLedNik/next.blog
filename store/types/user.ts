import IUser from "../../models/User.interface";
import IAvatar from "../../models/Avatar.interface";

export interface IUserState extends IUser{
}

export interface IUpdateUser{
    name?:string
    email?:string
    avatar?:IAvatar
}

export enum UserActionTypes{
    SET_USER = 'SET_USER',
    CLEAR_USER = 'CLEAR_USER',
    UPDATE_USER = 'UPDATE_USER'
}

export interface SetUserAction{
    type: UserActionTypes.SET_USER,
    payload: IUserState
}

export interface ClearUserAction{
    type: UserActionTypes.CLEAR_USER,
    payload?: IUserState
}

export interface UpdateUserAction{
    type: UserActionTypes.UPDATE_USER,
    payload: IUpdateUser
}

export type UserAction = SetUserAction | ClearUserAction | UpdateUserAction
