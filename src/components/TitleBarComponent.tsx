import React from 'react';
import { BranchesOutlined, PlusOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { IFlowMetadata } from '../models/IFlowMetadata';
import { Button } from 'antd';
import { DirectedGraph } from 'graphology';

interface TitleBarComponentProps {
    flow: IFlowMetadata;
    setFlow: (flow: IFlowMetadata) => void;
}

const TitleBarComponent = (props: TitleBarComponentProps): React.ReactElement => {
    return (<div className="flex title-bar">
        <div className="flex vcenter grow mar-left-16">
            <BranchesOutlined className="mar-right-8 white" />
            <Title style={{ color: 'white', margin: 'unset' }} level={5}>
                ML/AI - OPS Designer - {props.flow.name}
            </Title>
        </div>
        <div className="flex vcenter mar-right-16">
            <Button icon={<PlusOutlined />} 
            size="small"
            onClick={() => props.setFlow({
                name: 'untitled*',
                dag: new DirectedGraph()
            })}
                disabled={!props.flow.id}
                className="mar-right-16">{"New Flow"}</Button>
            <Title style={{ color: 'white', margin: 'unset', marginLeft: 16 }} level={5}>Kumaresh Ramakrishnan</Title>
            <UserOutlined className="mar-left-8 white" />
        </div>
    </div>)
}

export default TitleBarComponent;