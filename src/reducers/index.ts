import { combineReducers } from 'redux';
import FlowDesignerReducer from './FlowDesignerReducer';

export default combineReducers({
    flowDesignerState: FlowDesignerReducer,
});