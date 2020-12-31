import { put, takeLatest } from 'redux-saga/effects';
import { DELETE_PROCESSES, FETCH_PROCESSES } from '../actions/ProcessActions';
import { PROCESSES_SERVICE_URL } from '../globals';
import { ReduxAction } from '../helpers/ReduxHelpers';

export function* processesActionWatcher() {
    yield takeLatest(FETCH_PROCESSES.request, fetchProcesses);
    yield takeLatest(DELETE_PROCESSES.request, deleteProcesses);
}

function* fetchProcesses() {
    const json = yield fetch(PROCESSES_SERVICE_URL).then((response) => response.json());
    yield put({ type: FETCH_PROCESSES.success, payload: { processes: json } });
}

function* deleteProcesses(action: ReduxAction) {
    yield fetch(PROCESSES_SERVICE_URL + "/" + action.payload.processId, { method: "DELETE" }).then((response) => response.text());
    yield put({ type: FETCH_PROCESSES.request });
}