import { connect } from 'react-redux';
import TitleBarComponent from '../components/TitleBarComponent';
import { IAppReducerState } from '../models/IAppReducerState';
import { setFlow } from '../actions/DesignerActions';

const mapStateToProps = (state: IAppReducerState) => ({
    flow: state.flowDesignerState.flow,
});

const mapDispatchToProps = {
    setFlow
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleBarComponent);