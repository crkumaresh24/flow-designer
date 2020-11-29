/* eslint-disable @typescript-eslint/no-explicit-any */
import { IAppReducerState } from "../models/IAppReducerState";

export interface ActionTypes {
    request: string;
    success: string;
    failed: string;
}

const registeredActions: { [name: string]: ActionTypes } = {};

export const registerAction = (action: string): ActionTypes => {
    registeredActions[action] = {
        request: action + '_REQUEST',
        success: action + '_SUCCESS',
        failed: action + '_FAILED',
    };
    return registeredActions[action];
};

export const getAction = (action: string): ActionTypes => {
    return registeredActions[action];
};

export interface ReduxAction {
    type: string;
    payload?: any;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createReducer = (initialState: IAppReducerState, handlers: any): any => {
    return function reducer(state = initialState, action: any) {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action);
        } else {
            return state;
        }
    };
};

export const create_UUID = (): string => {
    let dt = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        // eslint-disable-next-line no-mixed-operators
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
};
