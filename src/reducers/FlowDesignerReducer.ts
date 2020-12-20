import { DirectedGraph } from 'graphology';
import { FETCH_FLOWS_ACTION, SET_DAG_ACTION, SET_FLOW_ACTION } from '../actions/DesignerActions';
import { ReduxAction } from '../helpers/ReduxHelpers';
import { IFlowDesignerState } from '../models/IFlowDesignerState';

const defaultApplicationState: IFlowDesignerState = {
    dag: new DirectedGraph(),
    flows: [],
    flow: {
        name: 'untitled*',
        dag: new DirectedGraph()
    }
};

const FlowDesignReducer = (state: IFlowDesignerState = defaultApplicationState, action: ReduxAction): IFlowDesignerState => {
    switch (action.type) {
        case SET_DAG_ACTION.request:
            const dagJSON = DirectedGraph.from(action.payload.dag.toJSON());
            return { ...state, dag: dagJSON };
        case SET_FLOW_ACTION.request:
            return { ...state, dag: action.payload.flow.dag, flow: action.payload.flow };
        case FETCH_FLOWS_ACTION.success:
            return { ...state, flows: action.payload.flows };
        default:
            return state;
    }
};

export default FlowDesignReducer;
