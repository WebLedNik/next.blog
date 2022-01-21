import {IPopupState, PopupAction, PopupActionTypes} from "../types/popup";


const initialState: IPopupState = {
    showAuth: false
}

export const popupReducer = (state = initialState, action: PopupAction): IPopupState => {
    switch (action.type){
        case PopupActionTypes.SET_SHOW_AUTH:
            return {...state, showAuth: action.payload}
        default:
            return state
    }
}
