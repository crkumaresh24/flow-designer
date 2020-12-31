import { DirectedGraph } from 'graphology';
import { put, takeLatest } from 'redux-saga/effects';
import { FETCH_FLOWS_ACTION } from '../actions/DesignerActions';
import { FLOWS_SERVICE_URL } from '../globals';
import { ReduxAction } from '../helpers/ReduxHelpers';
import { IFlowMetadata } from '../models/IFlowMetadata';

export function* flowsActionWatcher() {
    yield takeLatest(FETCH_FLOWS_ACTION.request, fetchDataFlows);
}

function* fetchDataFlows(action: ReduxAction) {
    const json = yield fetch(FLOWS_SERVICE_URL).then((response) => response.json());
    const flows = json.map((record: any) => ({
        id: record.id,
        name: record.name,
        dag: DirectedGraph.from(record.dag)
    })).filter((flow: IFlowMetadata) => action.payload.currentFlow ? flow.id !== action.payload.currentFlow.id : true);
    yield put({ type: FETCH_FLOWS_ACTION.success, payload: { flows } });
}