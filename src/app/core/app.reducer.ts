import { createReducer, on } from "@ngrx/store";
import { clearAuth,  setToken,  setUser } from "./app.action";

export interface AppState {
    user: any;
    token: string | null;
}

export const initialState: AppState = {
    user: JSON.parse(localStorage.getItem('vahan_user') || 'null'),
    token: localStorage.getItem('vahan_token'),
}

export const appReducer = createReducer(initialState,
    on(setUser, (state, { user }) => {
        localStorage.setItem('vahan_user', JSON.stringify(user));
        return { ...state, user };
    }),
    on(setToken, (state, { token }) => {
        localStorage.setItem('vahan_token', token);
        return {...state, token }; 
    }),
    on(clearAuth, (state) => {
        localStorage.removeItem('vahan_user'); 
        localStorage.removeItem('vahan_token'); 
        return { ...state, user: null, token: null, }; 
      }),
)