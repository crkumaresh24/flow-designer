import { connect } from 'react-redux';
import { IAppReducerState } from '../models/IAppReducerState';
import { deleteProcesses, fetchProcesses } from '../actions/ProcessActions';
import ProcessComponent from '../components/ProcessComponent';

const mapStateToProps = (state: IAppReducerState) => ({
    processes: state.processState.processes
});

const mapDispatchToProps = {
    fetchProcesses: fetchProcesses,
    deleteProcesses: deleteProcesses,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProcessComponent);