import { DirectedGraph } from 'graphology';
import { FETCH_FLOWS_ACTION, SET_DAG_ACTION, SET_FLOW_ACTION, SET_PROPERTIES_ACTION } from '../actions/DesignerActions';
import { ReduxAction } from '../helpers/ReduxHelpers';
import { IFlowDesignerState } from '../models/IFlowDesignerState';

const defaultApplicationState: IFlowDesignerState = {
    dag: new DirectedGraph(),
    flows: [],
    flow: {
        name: 'untitled*',
        dag: new DirectedGraph(),
        jobProperties: "{\n" +
            "\"spark.executor.instances\": \"1\",\n" +
            "\"spark.executor.memory\": \"1g\"\n" +
            "}",
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
        case SET_PROPERTIES_ACTION.request:
            return { ...state, flow: { ...state.flow, jobProperties: action.payload.properties } };
        default:
            return state;
    }
};

export default FlowDesignReducer;
