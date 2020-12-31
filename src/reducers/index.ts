import { combineReducers } from 'redux';
import FlowDesignerReducer from './FlowDesignerReducer';
import ProcessReducer from './ProcessReducer';

export default combineReducers({
    flowDesignerState: FlowDesignerReducer,
    processState: ProcessReducer,
});