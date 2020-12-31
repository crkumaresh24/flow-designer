/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Collapse, Tooltip } from 'antd';
import React from 'react';
import { ButtonShape } from 'antd/lib/button';
import { registryComponents } from './tasks/TaskRegistry';
import { TaskComponent } from './tasks/Task';

const { Panel } = Collapse;

const genExtra = () => (
    <div></div>
);

const FlowTasksComponent = (): React.ReactElement => {
    const taskDragStart = (event: any, taskType: string, taskPanelWidth?: number) => {
        event.dataTransfer?.setData('tasktype', taskType);
        event.dataTransfer?.setData('taskPanelWidth', taskPanelWidth || 480);
    };

    const getTask = (taskName: string, width: number, element: React.ReactElement, buttonShape?: ButtonShape) => {
        return (
            <Tooltip title={taskName.split("_TASK")[0]}>
                <div
                    key={taskName}
                    draggable={true}
                    onDragOver={(e) => e.stopPropagation()}
                    onDragStart={(e: any) => taskDragStart(e, taskName, width)}
                >
                    {buttonShape && (
                        <Button className="mar-8" shape={buttonShape} type="ghost">
                            {element}
                        </Button>
                    )}
                    {!buttonShape && (
                        <Button className="mar-8" type="ghost">
                            {element}
                        </Button>
                    )}
                </div>
            </Tooltip>
        );
    };

    return (
        <div className="tool-bar">
            <Collapse defaultActiveKey={["BASIC", "EXTRACT", "TRANSFORM", "ML MODELS", "LOAD"]}>
                {
                    Object.keys(registryComponents).map((category) => <Panel header={category} key={category} extra={genExtra()}>
                        <div className="flex">
                            {
                                registryComponents[category].map((task: TaskComponent) => { return getTask(task.type, task.panelWidth || 480, task.taskComponent) })
                            }
                        </div>
                    </Panel>)
                }
            </Collapse>
        </div>
    );
};

export default FlowTasksComponent;
