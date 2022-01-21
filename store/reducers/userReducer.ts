import {IUserState, UserAction, UserActionTypes} from "../types/user";

const initialState: IUserState = {
    id:null,
    idGoogle:null,
    name:null,
    email:null,
    slug:null,
    firstName:null,
    lastName:null,
    avatar: null,
    emailVerified:null
}

export const userReducer = (state = initialState, action:UserAction):IUserState =>{
    switch (action.type){
        case UserActionTypes.SET_USER:
            return {...state, ...action.payload}
        case UserActionTypes.CLEAR_USER:
            return {...state, ...initialState}
        case UserActionTypes.UPDATE_USER:
            return {...state, ...action.payload}
        default:
            return state
    }
}
