import { connect } from 'react-redux';
import { setDAG, setProperties } from '../actions/DesignerActions';
import FlowDesignerComponent from '../components/FlowDesignerComponent';
import { IAppReducerState } from '../models/IAppReducerState';

const mapStateToProps = (state: IAppReducerState) => ({
    dag: state.flowDesignerState.dag,
    properties: state.flowDesignerState.flow.jobProperties,
});

const mapDispatchToProps = {
    setDAG,
    setProperties,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowDesignerComponent);