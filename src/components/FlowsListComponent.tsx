import { List, Button, Space } from 'antd';
import React from 'react';
import { IFlowMetadata } from '../models/IFlowMetadata';
import { DeploymentUnitOutlined } from '@ant-design/icons';

export interface FlowsListComponentProps {
    flows: IFlowMetadata[];
    openFlow: (flow: IFlowMetadata) => void;
    deleteFlow: (flow: IFlowMetadata) => void;
}

const FlowListComponent = (props: FlowsListComponentProps): React.ReactElement => {
    return (<List
        dataSource={props.flows}
        renderItem={(item: IFlowMetadata) => (
            <List.Item key={item.id}>
                <List.Item.Meta
                    avatar={<DeploymentUnitOutlined />}
                    title={item.name}
                />
                <Space>
                    <Button onClick={() => {
                        props.openFlow(item);
                    }} type="primary">
                        Open
                    </Button>
                    <Button onClick={() => {
                        props.deleteFlow(item);
                    }} type="primary">
                        Delete
                    </Button>
                </Space>
            </List.Item>
        )}
    >
    </List>)
}

export default FlowListComponent;