import { IFlowDesignerState } from "./IFlowDesignerState";
import { IProcessState } from "./IProcessState";

export interface IAppReducerState {
    flowDesignerState: IFlowDesignerState;
    processState: IProcessState;
}