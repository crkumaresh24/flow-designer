import { all } from 'redux-saga/effects';
import { flowsActionWatcher } from './FlowSaga';

export default function* rootSaga() {
    yield all([
        flowsActionWatcher(),
    ]);
}