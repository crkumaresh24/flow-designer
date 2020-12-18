import { connect } from 'react-redux';
import { setDAG, setFlow } from '../actions/DesignerActions';
import MenusComponent from '../Menus';
import { IAppReducerState } from '../models/IAppReducerState';

const mapStateToProps = (state: IAppReducerState) => ({
    dag: state.flowDesignerState.dag,
    flow: state.flowDesignerState.flow,
});

const mapDispatchToProps = {
    setDAG,
    setFlow,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenusComponent);