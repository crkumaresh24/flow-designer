import { DirectedGraph } from 'graphology';
import { SET_DAG_ACTION } from '../actions/DesignerActions';
import { ReduxAction } from '../helpers/ReduxHelpers';
import { IFlowDesignerState } from '../models/IFlowDesignerState';

const defaultApplicationState: IFlowDesignerState = {
    dag: new DirectedGraph(),
};

const FlowDesignReducer = (state: IFlowDesignerState = defaultApplicationState, action: ReduxAction): IFlowDesignerState => {
    switch (action.type) {
        case SET_DAG_ACTION.request:
            const dagJSON = DirectedGraph.from(action.payload.dag.toJSON());
            return { ...state, dag: dagJSON };
        default:
            return state;
    }
};

export default FlowDesignReducer;
