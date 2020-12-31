import { connect } from 'react-redux';
import { setDAG } from '../actions/DesignerActions';
import FlowDesignerComponent from '../components/FlowDesignerComponent';
import { IAppReducerState } from '../models/IAppReducerState';

const mapStateToProps = (state: IAppReducerState) => ({
    dag: state.flowDesignerState.dag,
});

const mapDispatchToProps = {
    setDAG,
};

export default connect(mapStateToProps, mapDispatchToProps)(FlowDesignerComponent);