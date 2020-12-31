import { ActionTypes, ReduxAction, registerAction } from "../helpers/ReduxHelpers";

export const FETCH_PROCESSES: ActionTypes = registerAction('FETCH_PROCESSES');
export const DELETE_PROCESSES: ActionTypes = registerAction('DELETE_PROCESSES');

export const fetchProcesses = (): ReduxAction => ({
    type: FETCH_PROCESSES.request,
});

export const deleteProcesses = (processId: string): ReduxAction => ({
    type: DELETE_PROCESSES.request,
    payload: {
        processId
    }
});