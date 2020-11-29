/* eslint-disable @typescript-eslint/no-explicit-any */
import { DirectedGraph } from "graphology";

export interface IDataFlowTask {
    id: string;
    type: string;
    title: string;
    status: string | undefined;
    in1: string | undefined;
    out1: string | undefined;
    request: any;
    uiConfig: any;
}

export interface IDataFlowConnector {
    id: string;
    radius: number;
    startTask: string | undefined;
    endTask: string | undefined;
    lx: number;
    ly: number;
    rx: number;
    ry: number;
}

export interface IFlowMetadata {
    id?: number;
    dag: DirectedGraph;
    name: string;
}