import { connect } from 'react-redux';
import { setDAG, setFlow, fetchFlows } from '../actions/DesignerActions';
import { fetchProcesses } from '../actions/ProcessActions';
import MenusComponent from '../Menus';
import { IAppReducerState } from '../models/IAppReducerState';

const mapStateToProps = (state: IAppReducerState) => ({
    dag: state.flowDesignerState.dag,
    flow: state.flowDesignerState.flow,
    flows: state.flowDesignerState.flows
});

const mapDispatchToProps = {
    setDAG,
    setFlow,
    fetchFlows,
    fetchProcesses,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenusComponent);