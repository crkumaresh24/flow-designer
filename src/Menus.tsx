import { DeploymentUnitOutlined, DownloadOutlined, ImportOutlined } from '@ant-design/icons';
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

export default MenusComponent;
