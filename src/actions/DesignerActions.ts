import { DirectedGraph } from 'graphology';
import { ActionTypes, ReduxAction, registerAction } from '../helpers/ReduxHelpers';
import { IFlowMetadata } from '../models/IFlowMetadata';

export const SET_DAG_ACTION: ActionTypes = registerAction('SET_DAG');
export const FETCH_FLOWS_ACTION: ActionTypes = registerAction('FETCH_FLOWS');
export const SET_FLOW_ACTION: ActionTypes = registerAction('SET_FLOW');

export const setDAG = (dag: DirectedGraph): ReduxAction => ({
    type: SET_DAG_ACTION.request,
    payload: {
        dag,
    },
});

export const fetchFlows = (currentFlow?: IFlowMetadata): ReduxAction => ({
    type: FETCH_FLOWS_ACTION.request,
    payload: {
        currentFlow,
    }
});

export const setFlow = (flow: IFlowMetadata): ReduxAction => ({
    type: SET_FLOW_ACTION.request,
    payload: {
        flow,
    },
});