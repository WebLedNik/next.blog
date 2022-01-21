export interface IPopupState{
    showAuth: boolean
}

export enum PopupActionTypes{
    SET_SHOW_AUTH = 'SET_SHOW',
}

export interface SetShowAuthAction{
    type: PopupActionTypes.SET_SHOW_AUTH
    payload: boolean
}

export type PopupAction = SetShowAuthAction
