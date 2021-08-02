import {ASYNC_SET_TOKEN, SET_TOKEN} from "./types";

export function setToken(token) {
    return {
        type: SET_TOKEN,
        payload: token
    }
}

export function asyncSetToken(data) {
    console.log('asyncSetToken')
    return {
        type: ASYNC_SET_TOKEN,
        payload: data
    }
}