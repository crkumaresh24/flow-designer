/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Collapse } from 'antd';
import {
    SettingOutlined,
} from '@ant-design/icons';
import React from 'react';
import { ButtonShape } from 'antd/lib/button';
import { registryComponents } from './TaskRegistry';
import { TaskComponent } from './Task';

const { Panel } = Collapse;

const genExtra = () => (
    <SettingOutlined
        onClick={(event) => {
            event.stopPropagation();
        }}
    />
);

const FlowTasksComponent = (): React.ReactElement => {
    const taskDragStart = (event: any, taskType: string, taskPanelWidth?: number) => {
        event.dataTransfer?.setData('tasktype', taskType);
        event.dataTransfer?.setData('taskPanelWidth', taskPanelWidth || 480);
    };

    const getTask = (taskName: string, width: number, element: React.ReactElement, buttonShape?: ButtonShape) => {
        return (
            <div
                key={taskName}
                draggable={true}
                onDragOver={(e) => e.stopPropagation()}
                onDragStart={(e: any) => taskDragStart(e, taskName, width)}
            >
                {buttonShape && (
                    <Button className="mar-8" shape={buttonShape} type="primary">
                        {element}
                    </Button>
                )}
                {!buttonShape && (
                    <Button className="mar-8" type="primary">
                        {element}
                    </Button>
                )}
            </div>
        );
    };

    return (
        <div style={{ minWidth: 300, background: 'lightgray' }}>
            <Collapse>
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
