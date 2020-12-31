import { DeploymentUnitOutlined, DownloadOutlined, FolderOpenFilled, PlayCircleOutlined, SaveOutlined, ToolOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Modal, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { DirectedGraph } from 'graphology';
import React from 'react';
import FlowListComponent from './components/FlowsListComponent';
import { FLOWS_SERVICE_URL } from './globals';
import { IFlowMetadata } from './models/IFlowMetadata';

export interface MenusComponentProps {
    dag: DirectedGraph;
    flow: IFlowMetadata;
    flows: IFlowMetadata[];
    toggleOpenTools: () => void;
    setDAG: (dag: DirectedGraph) => void;
    setFlow: (flow: IFlowMetadata) => void;
    fetchFlows: (flow?: IFlowMetadata) => void;
    fetchProcesses: () => void;
}

const MenusComponent = (props: MenusComponentProps): React.ReactElement => {

    const [showSaveDialog, setShowSaveDialog] = React.useState<boolean>(false);
    const [saveName, setSaveName] = React.useState<string>();

    const showSaveModal = () => {
        setSaveName(undefined);
        setShowSaveDialog(true);
    };

    const handleSaveOk = () => {
        if (saveName && saveName.length > 0) {
            saveFlow(saveName, props.dag, (flow: IFlowMetadata) => {
                if (flow.dag) {
                    props.setFlow({
                        id: flow.id,
                        name: flow.name,
                        dag: DirectedGraph.from(flow.dag)
                    });
                }
                props.fetchFlows();
            });
        }
        setSaveName(undefined);
        setShowSaveDialog(false);
    };

    const handleSaveCancel = () => {
        setSaveName(undefined);
        setShowSaveDialog(false);
    };

    const [showListDialog, setShowListDialog] = React.useState<boolean>(false);

    const showListModal = () => {
        props.fetchFlows(props.flow);
        setSaveName(undefined);
        setShowListDialog(true);
    };

    const handleListOk = () => {
        if (saveName && saveName.length > 0) {
            props.setFlow({
                name: 'asdas',
                dag: new DirectedGraph()
            });
        }
        setSaveName(undefined);
        setShowListDialog(false);
    };

    const handleListCancel = () => {
        setSaveName(undefined);
        setShowListDialog(false);
    };

    const nodesLength = props.dag.nodes !== undefined ? props.dag.nodes().length : 0;

    React.useEffect(() => {
        props.fetchFlows();
    }, []);

    return (
        <div className="menu-bar">
            <Divider className="no-mar" />
            <a id="downloadAnchorElem" style={{ display: 'none' }} />
            <div className="flex flex-column">
                <Button className={"mar-left-8 pad-top-8 white mar-bottom-8"} type="link" icon={<ToolOutlined />} onClick={props.toggleOpenTools} />
                <Divider className="no-mar white" />
                <Button className={"mar-left-8 white mar-bottom-8"} type="link" icon={<FolderOpenFilled />} onClick={showListModal} />
                <Modal title="Flows" footer={null} visible={showListDialog} onOk={handleListOk} onCancel={handleListCancel}>
                    <FlowListComponent
                        flows={props.flows}
                        deleteFlow={(flow: IFlowMetadata) => {
                            flow.id && deleteFlow(flow.id, () => {
                                props.fetchFlows();
                            });
                        }}
                        openFlow={(flow) => {
                            handleListOk();
                            props.setFlow(flow)
                        }} />
                </Modal>
                <Divider className="no-mar white" />
                {props.flow.id === undefined && <Button disabled={nodesLength < 1} className={"white mar-8"} icon={<SaveOutlined />} type="link" onClick={showSaveModal} />}
                <Divider className="no-mar white" />
                {props.flow.id !== undefined && <Button disabled={nodesLength < 1} className={"white mar-8"} icon={<SaveOutlined />} type="link" onClick={() => {
                    props.flow.id !== undefined && updateFlow(props.flow.id, props.dag, (flow: IFlowMetadata) => {
                        if (flow.dag) {
                            props.setFlow({
                                id: flow.id,
                                name: flow.name,
                                dag: DirectedGraph.from(flow.dag)
                            });
                        }
                    });
                }} />}
                <Modal title="Save As" visible={showSaveDialog} onOk={handleSaveOk} onCancel={handleSaveCancel}>
                    <Input value={saveName} onChange={(e) => setSaveName(e.target.value)} placeholder="Flow Name" />
                </Modal>
                <Divider className="no-mar white" />
                <Button
                    disabled={nodesLength < 1}
                    type="link"
                    className={"white mar-8"}
                    icon={<DeploymentUnitOutlined />}
                    onClick={() =>
                        Modal.success({
                            content: (
                                <div>
                                    <pre>
                                        {props.dag &&
                                            JSON.stringify(props.dag.toJSON(), null, 1)}
                                    </pre>
                                </div>
                            ),
                            style: {
                                minWidth: '50%',
                                maxHeight: '80vh',
                            },
                        })
                    }
                />
                <Divider className="no-mar white" />
                <Button
                    disabled={nodesLength < 1}
                    type="link"
                    className={"white mar-8"}
                    icon={<PlayCircleOutlined />}
                    onClick={() => {
                        props.flow.id && runFlow(props.flow.id, () => {
                            props.fetchProcesses();
                        });
                    }
                    }
                />
                <Divider className="no-mar white" />
                <Upload multiple={false}
                    showUploadList={false}
                    beforeUpload={(file: RcFile) => {
                        file.text().then((content) => {
                            props.setDAG(DirectedGraph.from(JSON.parse(content)));
                        });
                        return false;
                    }}>
                    <Button type="link" className={"white mar-8"} icon={<UploadOutlined />} />
                </Upload>
                <Divider className="no-mar white" />
                <Button
                    disabled={nodesLength < 1}
                    type="link"
                    className={"white mar-8"}
                    icon={<DownloadOutlined />}
                    onClick={() => {
                        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(props.dag.toJSON(), null, 1));
                        const dlAnchorElem = document.getElementById('downloadAnchorElem');
                        if (dlAnchorElem) {
                            dlAnchorElem.setAttribute("href", dataStr);
                            dlAnchorElem.setAttribute("download", "flowPlan.json");
                            dlAnchorElem.click();
                        }
                    }
                    }
                />
            </div>
        </div >
    );
};

const saveFlow = (name: string, dag: DirectedGraph, onSuccess: (flow: IFlowMetadata) => void) => {
    fetch(FLOWS_SERVICE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            dag,
        })
    }).then(response => response.json()).then(json => {
        onSuccess(json);
    })
};

const updateFlow = (id: string, dag: DirectedGraph, onSuccess: (flow: IFlowMetadata) => void) => {
    fetch(FLOWS_SERVICE_URL + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dag.toJSON())
    }).then(response => response.json()).then(json => {
        onSuccess(json);
    })
};

const deleteFlow = (id: string, onSuccess: () => void) => {
    fetch(FLOWS_SERVICE_URL + "/" + id, {
        method: "DELETE",
    }).then(response => response.text()).then(json => {
        onSuccess();
    });
};

const runFlow = (flowId: string, onSuccess: () => void) => {
    fetch(FLOWS_SERVICE_URL + "/run/" + flowId, {
        method: "POST",
        headers: { "content-type": "application/json" },
    }).then(response => response.json()).then(json => onSuccess());
};

export default MenusComponent;
