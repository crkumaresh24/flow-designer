/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { IDataFlowTask } from '../../models/IFlowMetadata';
import { registryComponents } from './TaskRegistry';

export declare type InternalNamePath = (string | number)[];
export declare type NamePath = string | number | InternalNamePath;
export declare type StoreValue = any;
export interface Store {
    [name: string]: StoreValue;
}
export interface Meta {
    touched: boolean;
    validating: boolean;
    errors: string[];
    name: InternalNamePath;
}
export interface InternalFieldData extends Meta {
    value: StoreValue;
}
/**
 * Used by `setFields` config
 */
export interface FieldData extends Partial<Omit<InternalFieldData, 'name'>> {
    name: NamePath;
}

export interface TaskComponent {
    title: string;
    type: string;
    taskComponent: React.ReactElement,
    panelComponent?: any | undefined,
    panelWidth?: number
}

export interface TasksProps {
    task: IDataFlowTask;
    setTaskRequest: (request: any, refreshOuts?: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const onFieldsChange = (_changedFields: any, allFields: any, props: TasksProps): void => {
    const req: any = {};
    allFields.forEach((fieldData: FieldData) => {
        if (fieldData.value && fieldData.value.length > 0) {
            req[fieldData.name.toString()] = fieldData.value;
        } else {
            req[fieldData.name.toString()] = undefined;
        }
    });
    props.setTaskRequest(req);
};

const Tasks = (props: TasksProps): React.ReactElement => {
    const TagName = getTask(props.task.type);
    if (TagName) {
        return (
            <TagName
                setTaskRequest={props.setTaskRequest}
                task={{ ...props.task, request: props.task.request || {} }}
            />
        );
    } else {
        return <div>{'Please design this task'}</div>;
    }
};

const getTask = (taskType: string): any => {
    let panelComponent = undefined;
    Object.keys(registryComponents).forEach((category: string) => {
        registryComponents[category].forEach((task: TaskComponent) => {
            if (task.type === taskType) {
                panelComponent = task.panelComponent;
            }
        });
    });
    return panelComponent;
}

export default Tasks;
