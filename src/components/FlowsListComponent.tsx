import { List, Button, Space } from 'antd';
import React from 'react';
import { IFlowMetadata } from '../models/IFlowMetadata';
import { DeploymentUnitOutlined } from '@ant-design/icons';
import { DirectedGraph } from 'graphology';

export interface FlowsListComponentProps {
    openFlow: (flow: IFlowMetadata) => void;
    deleteFlow: (flow: IFlowMetadata) => void;
}

class FlowsListComponent extends React.Component<FlowsListComponentProps> {

    state = {
        data: [],
        loading: false,
        hasMore: true,
    };

    constructor(props: FlowsListComponentProps) {
        super(props);
    }

    componentDidMount() {
        this.fetchData(res => {
            this.setState({
                data: res,
            });
        });
    }

    fetchData = (callback: (list: IFlowMetadata[]) => any) => {
        fetch("http://localhost:9090/flow", {}).then(response => response.json()).then(list => callback(list))
    };

    render() {
        return (
            <List
                footer={null}
                dataSource={this.state.data}
                renderItem={(item: any) => (
                    <List.Item key={item.id}>
                        <List.Item.Meta
                            avatar={<DeploymentUnitOutlined />}
                            title={<a href="https://ant.design">{item.name}</a>}
                        />
                        <Space>
                            <Button onClick={() => {
                                this.props.openFlow({
                                    ...item,
                                    dag: DirectedGraph.from(item.dag)
                                });
                            }} type="primary">
                                Open
                            </Button>
                            <Button onClick={() => {
                                this.props.deleteFlow(item);
                            }} type="primary">
                                Delete
                            </Button>
                        </Space>
                    </List.Item>
                )}
            >
            </List>
        );
    }
}

export default FlowsListComponent;