import { all } from 'redux-saga/effects';
import { flowsActionWatcher } from './FlowSaga';
import { processesActionWatcher } from './ProcessSaga';

export default function* rootSaga() {
    yield all([
        flowsActionWatcher(),
        processesActionWatcher(),
    ]);
}