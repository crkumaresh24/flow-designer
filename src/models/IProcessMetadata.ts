import { IFlowMetadata } from "./IFlowMetadata";

export interface IProcessMetadata {
    id: string;
    status: string;
    flow: IFlowMetadata;
}