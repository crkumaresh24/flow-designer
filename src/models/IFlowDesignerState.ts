import { DirectedGraph } from 'graphology';
import { IFlowMetadata } from './IFlowMetadata';

export interface IFlowDesignerState {
    dag: DirectedGraph;
    flow: IFlowMetadata;
}