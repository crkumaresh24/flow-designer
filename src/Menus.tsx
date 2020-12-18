import { DeploymentUnitOutlined, DownloadOutlined, FolderOpenFilled, ImportOutlined, PlayCircleOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Space, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { DirectedGraph } from 'graphology';
import React from 'react';
import FlowsListComponent from './components/FlowsListComponent';
import { JAR_ARTIFACTORY_URL, LIVY_SYSTEM_URL } from './globals';
import { IFlowMetadata } from './models/IFlowMetadata';

export interface MenusComponentProps {
    dag: DirectedGraph;
    flow: IFlowMetadata;
    setDAG: (dag: DirectedGraph) => void;
    setFlow: (flow: IFlowMetadata) => void;
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
            saveFlow(saveName, props.dag, props.setFlow);
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

    const nodesLength = props.dag.nodes().length;

    return (
        <div>
            <a id="downloadAnchorElem" style={{ display: 'none' }} />
            <div className="flex flex-column">
                <Button className={"mar-left-8 mar-bottom-8"} type="link" icon={<FolderOpenFilled />} onClick={showListModal} />
                <Modal title="List" visible={showListDialog} onOk={handleListOk} onCancel={handleListCancel}>
                    <FlowsListComponent
                        deleteFlow={(flow: IFlowMetadata) => {
                            handleListOk();
                            flow.id && deleteFlow(flow.id);
                        }}
                        openFlow={(flow) => {
                            handleListOk();
                            props.setFlow(flow)
                        }} />
                </Modal>
                {props.flow.id === undefined && <Button className={"mar-8"} icon={<SaveOutlined />} type="link" onClick={showSaveModal} />}
                {props.flow.id !== undefined && <Button className={"mar-8"} icon={<SaveOutlined />} type="link" onClick={() => {
                    props.flow.id !== undefined && updateFlow(props.flow.id, props.dag, props.setFlow);
                }} />}
                <Modal title="Save As" visible={showSaveDialog} onOk={handleSaveOk} onCancel={handleSaveCancel}>
                    <Input value={saveName} onChange={(e) => setSaveName(e.target.value)} placeholder="Flow Name" />
                </Modal>
                <Button
                    disabled={nodesLength < 1}
                    type="link"
                    className={"mar-8"}
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
                <Button
                    disabled={nodesLength < 1}
                    type="link"
                    className={"mar-8"}
                    icon={<PlayCircleOutlined />}
                    onClick={() => {
                        submitLivy();
                    }
                    }
                />
                <Upload multiple={false}
                    showUploadList={false}
                    beforeUpload={(file: RcFile) => {
                        file.text().then((content) => {
                            props.setDAG(DirectedGraph.from(JSON.parse(content)));
                        });
                        return false;
                    }}>
                    <Button type="link" className={"mar-8"} icon={<ImportOutlined />} />
                </Upload>
                <Button
                    disabled={nodesLength < 1}
                    type="link"
                    className={"mar-8"}
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

const saveFlow = (name: string, dag: DirectedGraph, setFlow: (flow: IFlowMetadata) => void) => {
    fetch("http://localhost:9090/flow", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            dag,
        })
    }).then(response => response.json()).then(json => {
        setFlow({
            id: json.id,
            name: name,
            dag: DirectedGraph.from(json.dag)
        });
    })
};

const updateFlow = (id: string, dag: DirectedGraph, setFlow: (flow: IFlowMetadata) => void) => {
    fetch("http://localhost:9090/flow/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dag.toJSON())
    }).then(response => response.json()).then(json => {
        setFlow({
            id: json.id,
            name: name,
            dag: DirectedGraph.from(json.dag)
        });
    })
};

const deleteFlow = (id: string) => {
    fetch("http://localhost:9090/flow/" + id, {
        method: "DELETE",
    }).then(response => response.text()).then(json => {
        console.log(json);
    });
};

const submitLivy = () => {
    fetch(LIVY_SYSTEM_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        mode: "no-cors",
        body: JSON.stringify({
            file:
                JAR_ARTIFACTORY_URL + "/core-1.0-SNAPSHOT.jar",
            className: "com.stacksnow.flow.runner.spark.java.App",
            conf: {
                "spark.kubernetes.container.image": "apache-spark/spark:2.4.6",
                "spark.executor.instances": "2",
                // "spark.master": "local[*]",
                // "spark.master": "k8s://https://kubernetes.docker.internal:6443",
                "spark.kubernetes.authenticate.driver.serviceAccountName":
                    "spark",
                "spark.driver.extraClassPath":
                    JAR_ARTIFACTORY_URL + "/postgresql-42.2.9.jar",
                "spark.executor.extraClassPath":
                    JAR_ARTIFACTORY_URL + "/postgresql-42.2.9.jar",
            },
            jars: [
                JAR_ARTIFACTORY_URL + "/tasks-1.0-SNAPSHOT.jar",
                JAR_ARTIFACTORY_URL + "/gson-2.2.4.jar",
                JAR_ARTIFACTORY_URL + "/postgresql-42.2.9.jar",
                JAR_ARTIFACTORY_URL + "/jgrapht-core-1.0.1.jar",
            ],
            args: [
                JAR_ARTIFACTORY_URL + "/runnerList.json",
                JAR_ARTIFACTORY_URL + "/jdbctest.json",
            ],
        }),
    })
        .then((response) => response.text())
        .then((livy) => console.log(livy));
};

export default MenusComponent;
