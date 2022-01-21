import {combineReducers} from "redux";
import {popupReducer} from "./popupReducer";
import {userReducer} from "./userReducer";
import {composeWithDevTools} from 'redux-devtools-extension';

export const rootReducer = combineReducers({
        popup: popupReducer,
        user: userReducer
    },
// @ts-ignore
    composeWithDevTools())

export type RootState = ReturnType<typeof rootReducer>
