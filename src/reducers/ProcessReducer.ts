import { FETCH_PROCESSES } from '../actions/ProcessActions';
import { ReduxAction } from '../helpers/ReduxHelpers';
import { IProcessState } from '../models/IProcessState';

const defaultApplicationState: IProcessState = {
    processes: []
};

const ProcessReducer = (state: IProcessState = defaultApplicationState, action: ReduxAction): IProcessState => {
    switch (action.type) {
        case FETCH_PROCESSES.success:
            return { ...state, processes: action.payload.processes };
        default:
            return state;
    }
};

export default ProcessReducer;
