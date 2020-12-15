import { DeploymentUnitOutlined, DownloadOutlined, ImportOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Button, Modal, Space, Upload } from 'antd';
import { RcFile } from 'antd/lib/upload';
import { DirectedGraph } from 'graphology';
import React from 'react';

export interface MenusComponentProps {
    dag: DirectedGraph;
    setDAG: (dag: DirectedGraph) => void;
}

const MenusComponent = (props: MenusComponentProps): React.ReactElement => {
    return (
        <div>
            <a id="downloadAnchorElem" style={{ display: 'none' }} />
            <Space>
                <Upload multiple={false}
                    showUploadList={false}
                    beforeUpload={(file: RcFile) => {
                        file.text().then((content) => {
                            props.setDAG(DirectedGraph.from(JSON.parse(content)));
                        });
                        return false;
                    }}>
                    <Button type="primary" icon={<ImportOutlined />}>
                        Import
                </Button>
                </Upload>
                <Button
                    type="primary"
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
                >
                    View Plan
            </Button>
                <Button
                    type="primary"
                    icon={<PlayCircleOutlined />}
                    onClick={() => {
                        submitLivy();
                    }
                    }
                >
                    Run
            </Button>
                <Button
                    type="primary"
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
                >
                    Downnload
            </Button>
            </Space>
        </div>
    );
};

const submitLivy = () => {
    const JAR_ARTIFACTORY_URL = "http://localhost:8000";
    const LIVY_SYSTEM_URL = "http://localhost:8998/batches";
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
                "http://host.docker.internal:8000/runnerList.json",
                "http://host.docker.internal:8000/jdbctest.json",
            ],
        }),
    })
        .then((response) => response.text())
        .then((livy) => console.log(livy));
};

export default MenusComponent;
