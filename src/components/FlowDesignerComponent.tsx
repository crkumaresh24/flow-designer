/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Menu, Dropdown, Button, Drawer } from 'antd';
import { DownOutlined, DeleteFilled } from '@ant-design/icons';
import { create_UUID } from '../helpers/ReduxHelpers';
import { DirectedGraph } from 'graphology';
import { IDataFlowConnector, IDataFlowTask } from '../models/IFlowMetadata';
import Task from './Task';

export interface DataFlowDesignerComponentProps {
    dag: DirectedGraph;
    setDAG: (dag: DirectedGraph) => void;
}

const FlowDesignerComponent = (props: DataFlowDesignerComponentProps): React.ReactElement => {
    const [openTask, setOpenTask] = React.useState<string>();
    const connectorDistance = 80;
    const taskElements: any = {};
    const taskRequests: any = {};
    const taskRequestsTraker: any = {};

    const onDrop = (event: any) => {
        const target = event.target || event.srcElement;
        const rect = target.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const taskId: string = event.dataTransfer.getData('taskId');
        const type: string = event.dataTransfer.getData('taskType');
        const taskPanelWidth: string = event.dataTransfer.getData('taskPanelWidth');

        if (type === 'CONNECTOR') {
            const source = create_UUID();
            const target = create_UUID();

            props.dag.addNode(source);
            props.dag.addNode(target);

            if (taskId !== undefined && taskId.length > 0) {
                props.dag.dropEdge(taskId);
            }

            const edge = create_UUID();

            props.dag.addDirectedEdgeWithKey(edge, source, target, {
                source,
                target,
                lx: offsetX,
                ly: offsetY,
                rx: offsetX + connectorDistance,
                ry: offsetY,
                startTask: undefined,
                endTask: undefined,
            });
        } else if (type.indexOf('CONNECTOR') < 0) {
            if (taskId === undefined || taskId.length === 0) {
                const newUUID = create_UUID();
                props.dag.addNode(newUUID, {
                    type,
                    title: type,
                    id: newUUID,
                    in1: undefined,
                    in1Schema: undefined,
                    in2: undefined,
                    status: undefined,
                    out1: undefined,
                    request: {},
                    onSave: () => {
                        alert(type);
                    },
                    uiConfig: {
                        offsetX,
                        offsetY,
                        taskPanelWidth,
                    },
                });
            } else {
                const nodeAttributes = props.dag.getNodeAttributes(taskId);
                const taskElement: any = taskElements[taskId];
                props.dag.mergeNodeAttributes(taskId, {
                    uiConfig: {
                        ...nodeAttributes.uiConfig,
                        offsetX,
                        offsetY,
                    },
                });
                props.dag.edges().forEach((edge: any) => {
                    const edgeAttributes = props.dag.getEdgeAttributes(edge);
                    if (edgeAttributes.startTask === taskId) {
                        let xOffSet = 0;
                        let yOffset = 0;
                        if (nodeAttributes.type === 'START_TASK' || nodeAttributes.type === 'STOP_TASK') {
                            xOffSet = 16;
                            yOffset = 0;
                        } else {
                            xOffSet = taskElement?.current.clientWidth + 64;
                            yOffset = 18;
                        }

                        props.dag.mergeEdgeAttributes(edge, {
                            ...edgeAttributes,
                            lx: nodeAttributes.uiConfig.offsetX + xOffSet,
                            ly: nodeAttributes.uiConfig.offsetY + yOffset,
                        });
                    }
                    if (edgeAttributes.endTask === taskId) {
                        let xOffSet = 0;
                        let yOffset = 0;
                        if (nodeAttributes.type === 'START_TASK' || nodeAttributes.type === 'STOP_TASK') {
                            xOffSet = 12;
                            yOffset = 0;
                        } else {
                            xOffSet = 16;
                            yOffset = 16;
                        }

                        props.dag.mergeEdgeAttributes(edge, {
                            ...edgeAttributes,
                            rx: nodeAttributes.uiConfig.offsetX + xOffSet,
                            ry: nodeAttributes.uiConfig.offsetY + yOffset,
                        });
                    }
                });
            }
        }

        props.setDAG(props.dag);
    };

    const bindStart = (event: any, task: IDataFlowTask, taskElement: any) => {
        const edgeKey: string = event.dataTransfer.getData('taskId');
        const type: string = event.dataTransfer.getData('taskType');
        if (type === 'START_CONNECTOR') {
            let xOffSet = 0;
            let yOffset = 0;
            if (task.type === 'START_TASK' || task.type === 'STOP_TASK') {
                xOffSet = 16;
                yOffset = 0;
            } else {
                xOffSet = taskElement.current.clientWidth + 30;
                yOffset = 18;
            }

            const source = task.id;
            const target = props.dag.getEdgeAttribute(edgeKey, 'target');
            const attributes = props.dag.getEdgeAttributes(edgeKey);
            props.dag.dropNode(props.dag.getEdgeAttribute(edgeKey, 'source'));
            try {
                props.dag.dropEdge(edgeKey);
            } catch (e) {
                console.log(e);
            }
            props.dag.addDirectedEdgeWithKey(edgeKey, source, target, {
                ...attributes,
                source,
                target,
                lx: task.uiConfig.offsetX + xOffSet,
                ly: task.uiConfig.offsetY + yOffset,
                startTask: task.id,
            });
        }

        props.setDAG(props.dag);
    };

    const bindEnd = (event: any, task: IDataFlowTask) => {
        const edgeKey: string = event.dataTransfer.getData('taskId');
        const type: string = event.dataTransfer.getData('taskType');

        if (type === 'STOP_CONNECTOR') {
            let xOffSet = 0;
            let yOffset = 0;
            if (task.type === 'START_TASK' || task.type === 'STOP_TASK') {
                xOffSet = 12;
                yOffset = 0;
            } else {
                xOffSet = 4;
                yOffset = 16;
            }

            const target = task.id;
            const source = props.dag.getEdgeAttribute(edgeKey, 'source');
            const attributes = props.dag.getEdgeAttributes(edgeKey);
            props.dag.dropNode(props.dag.getEdgeAttribute(edgeKey, 'target'));
            try {
                props.dag.dropEdge(edgeKey);
            } catch (e) {
                console.log(e);
            }
            props.dag.addDirectedEdgeWithKey(edgeKey, source, target, {
                ...attributes,
                source,
                target,
                rx: task.uiConfig.offsetX + xOffSet,
                ry: task.uiConfig.offsetY + yOffset,
                endTask: task.id,
            });
        }

        props.setDAG(props.dag);
    };

    const setTaskRequest = (task: IDataFlowTask, request: any) => {
        taskRequestsTraker[task.id] = false;
        props.dag.setNodeAttribute(task.id, 'request', request);
        props.setDAG(props.dag);
    };

    const deleteTask = (task: IDataFlowTask) => {
        props.dag.dropNode(task.id);
        props.dag.edges().forEach((edge) => {
            const attributes = props.dag.getEdgeAttributes(edge);
            const startTask = attributes.startTask;
            const endTask = attributes.endTask;
            if (startTask && startTask === task.id) {
                props.dag.dropEdge(edge);
            }
            if (endTask && endTask === task.id) {
                props.dag.dropEdge(edge);
            }
        });
        props.setDAG(props.dag);
    };

    const deleteConnector = (connector: IDataFlowConnector) => {
        props.dag.dropEdge(connector.id);
        props.setDAG(props.dag);
    };

    const getLength = (connector: IDataFlowConnector) => {
        return Math.sqrt(
            (connector.rx - connector.lx) * (connector.rx - connector.lx) +
            (connector.ry - connector.ly) * (connector.ry - connector.ly),
        );
    };

    const getConnectorX = (connector: IDataFlowConnector) => {
        return (connector.lx + connector.rx) / 2 - getLength(connector) / 2 + 16;
    };

    const getConnectorY = (connector: IDataFlowConnector) => {
        return (connector.ly + connector.ry) / 2 - 1 / 2 + 16;
    };

    const getAngle = (connector: IDataFlowConnector) => {
        return Math.atan2(connector.ly - connector.ry, connector.lx - connector.rx) * (180 / Math.PI);
    };

    props.dag.nodes().forEach((node: string) => {
        taskElements[node] = React.createRef();
    });

    return (
        <div className={'flex grow content-wrapper'}>
            {props.dag && (
                <div className={'overflow-container'}>
                    <div
                        onDragOver={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                        }}
                        onDrop={(e) => onDrop(e)}
                        className={'overflow-content'}
                    >
                        {props.dag.nodes().map((node: any) => {
                            const task = props.dag.getNodeAttributes(node) as IDataFlowTask;
                            if (task.type === 'START_TASK') {
                                return (
                                    <div
                                        draggable="true"
                                        onDragStart={(event: any) => {
                                            event.dataTransfer?.setData('taskId', task.id);
                                            event.dataTransfer?.setData('taskType', task.type);
                                        }}
                                        onDragOver={(e: any) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        onDrop={(e: any) => {
                                            if (
                                                e.dataTransfer?.getData('taskType') === 'START_TASK' ||
                                                e.dataTransfer?.getData('taskType') === 'STOP_TASK'
                                            ) {
                                                e.stopPropagation();
                                                e.preventDefault();
                                            } else {
                                                bindStart(e, task, taskElements[task.id]);
                                            }
                                        }}
                                        style={{
                                            position: 'absolute',
                                            left: task.uiConfig.offsetX + 'px',
                                            top: task.uiConfig.offsetY + 'px',
                                            display: 'flex',
                                            height: 56,
                                            width: 56,
                                            zIndex: 2,
                                        }}
                                    >
                                        <Dropdown
                                            trigger={['click']}
                                            key={task.id}
                                            overlay={
                                                <Menu
                                                    onClick={(e) => {
                                                        if (e.key === '1') {
                                                            deleteTask(task);
                                                        }
                                                    }}
                                                >
                                                    <Menu.Item key="1" icon={<DeleteFilled />}>
                                                        Delete
                                                        </Menu.Item>
                                                </Menu>
                                            }
                                        >
                                            <Button type="primary" shape="circle">
                                                S
                                                </Button>
                                        </Dropdown>
                                    </div>
                                );
                            } else if (task.type === 'STOP_TASK') {
                                return (
                                    <div
                                        draggable="true"
                                        onDragStart={(event) => {
                                            event.dataTransfer?.setData('taskId', task.id);
                                            event.dataTransfer?.setData('taskType', task.type);
                                        }}
                                        onDrop={(e) => {
                                            if (
                                                e.dataTransfer?.getData('taskType') === 'START_TASK' ||
                                                e.dataTransfer?.getData('taskType') === 'STOP_TASK'
                                            ) {
                                                e.stopPropagation();
                                                e.preventDefault();
                                            } else {
                                                bindEnd(e, task);
                                            }
                                        }}
                                        onDragOver={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        key={task.id}
                                        style={{
                                            position: 'absolute',
                                            left: task.uiConfig.offsetX + 'px',
                                            top: task.uiConfig.offsetY + 'px',
                                            display: 'flex',
                                            height: 56,
                                            width: 56,
                                            zIndex: 2,
                                        }}
                                    >
                                        <Dropdown
                                            key={task.id}
                                            trigger={['click']}
                                            overlay={
                                                <Menu
                                                    onClick={(e) => {
                                                        if (e.key === '1') {
                                                            deleteTask(task);
                                                        }
                                                    }}
                                                >
                                                    <Menu.Item key="1" icon={<DeleteFilled />}>
                                                        Delete
                                                        </Menu.Item>
                                                </Menu>
                                            }
                                        >
                                            <Button type="primary" shape="circle">
                                                E
                                                </Button>
                                        </Dropdown>
                                    </div>
                                );
                            } else if (task.type) {
                                return (
                                    <div
                                        className="flex center"
                                        draggable="true"
                                        onDragStart={(event) => {
                                            event.dataTransfer?.setData('taskId', task.id);
                                            event.dataTransfer?.setData('taskType', task.type);
                                        }}
                                        onDragOver={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        key={task.id}
                                        style={{
                                            position: 'absolute',
                                            left: task.uiConfig.offsetX + 'px',
                                            top: task.uiConfig.offsetY + 'px',
                                            zIndex: 2,
                                        }}
                                    >
                                        <div
                                            onDrop={(e) => {
                                                if (e.dataTransfer?.getData('taskType') === task.type) {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                } else {
                                                    bindEnd(e, task);
                                                }
                                            }}
                                            onDragOver={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                        >
                                            <Button type="primary" shape="circle">
                                                A
                                                </Button>
                                        </div>
                                        <div
                                            onDrop={(e: any) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                            style={{
                                                padding: 16,
                                            }}
                                            ref={taskElements[task.id]}
                                        >
                                            <Dropdown.Button
                                                icon={<DownOutlined />}
                                                trigger={['click']}
                                                overlay={
                                                    <Menu
                                                        onClick={(e) => {
                                                            if (e.key === '1') {
                                                                deleteTask(task);
                                                            }
                                                        }}
                                                    >
                                                        <Menu.Item key="1" icon={<DeleteFilled />}>
                                                            Delete
                                                            </Menu.Item>
                                                    </Menu>
                                                }
                                                onClick={() => setOpenTask(task.id)}
                                                type="primary"
                                            >
                                                {task.type.split('_TASK')[0]}
                                            </Dropdown.Button>
                                            <Drawer
                                                title={task.title}
                                                placement="right"
                                                closable={false}
                                                width={task.uiConfig.taskPanelWidth}
                                                visible={openTask === task.id}
                                                onClose={() => {
                                                    if (taskRequestsTraker[task.id]) {
                                                        setTaskRequest(task, taskRequests[task.id]);
                                                    }
                                                    setOpenTask(undefined);
                                                }}
                                            >
                                                <Task
                                                    setTaskRequest={(req) => {
                                                        taskRequests[task.id] = req;
                                                        taskRequestsTraker[task.id] = true;
                                                    }}
                                                    task={task}
                                                />
                                            </Drawer>
                                        </div>
                                        <div
                                            onDrop={(e) => {
                                                if (e.dataTransfer?.getData('taskType') === task.type) {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                } else {
                                                    bindStart(e, task, taskElements[task.id]);
                                                }
                                            }}
                                            id={task.id}
                                            onDragOver={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                        >
                                            <Button type="primary" shape="circle">
                                                B
                                                </Button>
                                        </div>
                                    </div>
                                );
                            } else {
                                return <></>;
                            }
                        })}

                        {props.dag.edges().map((edge) => {
                            const attributes = props.dag.getEdgeAttributes(edge);
                            const connector: IDataFlowConnector = {
                                id: edge,
                                radius: 8,
                                startTask: attributes.startTask,
                                endTask: attributes.endTask,
                                lx: attributes.lx,
                                ly: attributes.ly,
                                rx: attributes.rx,
                                ry: attributes.ry,
                            };
                            return (
                                <div key={connector.id}>
                                    {!connector.startTask && (
                                        <div
                                            draggable="true"
                                            onDragStart={(event) => {
                                                event.dataTransfer?.setData('taskId', connector.id);
                                                event.dataTransfer?.setData('taskType', 'START_CONNECTOR');
                                            }}
                                            onDragOver={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                            style={{
                                                position: 'absolute',
                                                left: connector.lx + 'px',
                                                top: connector.ly + 'px',
                                            }}
                                        >
                                            <div draggable={true}>
                                                <Button type="primary" shape="circle">
                                                    B
                                                    </Button>
                                            </div>
                                        </div>
                                    )}
                                    {!connector.endTask && (
                                        <div
                                            draggable="true"
                                            onDragStart={(event) => {
                                                event.dataTransfer?.setData('taskId', connector.id);
                                                event.dataTransfer?.setData('taskType', 'STOP_CONNECTOR');
                                            }}
                                            onDragOver={(e) => {
                                                e.stopPropagation();
                                                e.preventDefault();
                                            }}
                                            style={{
                                                position: 'absolute',
                                                left: connector.rx + 'px',
                                                top: connector.ry + 'px',
                                            }}
                                        >
                                            <div draggable={true}>
                                                <Button type="primary" shape="circle">
                                                    A
                                                    </Button>
                                            </div>
                                        </div>
                                    )}
                                    <div
                                        draggable="true"
                                        onDragStart={(event) => {
                                            event.dataTransfer?.setData('taskId', connector.id);
                                            event.dataTransfer?.setData('taskType', 'CONNECTOR');
                                        }}
                                        onDragOver={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                        }}
                                        style={{
                                            height: 1,
                                            backgroundColor: '#1890ff',
                                            cursor: 'pointer',
                                            width: getLength(connector) + 'px',
                                            lineHeight: 1,
                                            position: 'absolute',
                                            left: getConnectorX(connector) + 'px',
                                            top: getConnectorY(connector) + 'px',
                                            transform: 'rotate(' + getAngle(connector) + 'deg)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Dropdown
                                            key={connector.id}
                                            trigger={['click']}
                                            overlay={
                                                <Menu
                                                    onClick={(e) => {
                                                        if (e.key === '1') {
                                                            deleteConnector(connector);
                                                        }
                                                    }}
                                                >
                                                    <Menu.Item key="1" icon={<DeleteFilled />}>
                                                        Delete
                                                    </Menu.Item>
                                                </Menu>
                                            }
                                        >
                                            <DownOutlined style={{ color: '#1890ff' }} />
                                        </Dropdown>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlowDesignerComponent;
