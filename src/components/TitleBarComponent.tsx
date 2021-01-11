/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import { PlusOutlined, PoweroffOutlined, QuestionCircleOutlined, UserOutlined } from '@ant-design/icons';
import Title from 'antd/lib/typography/Title';
import { IFlowMetadata } from '../models/IFlowMetadata';
import { Button, Dropdown, Menu, Tooltip } from 'antd';
import { DirectedGraph } from 'graphology';
import ProcessContainer from '../containers/ProcessContainer';
import { SWAGGER_SERVICE_URL } from '../globals';

interface TitleBarComponentProps {
    flow: IFlowMetadata;
    keycloak: any;
    setFlow: (flow: IFlowMetadata) => void;
}

const TitleBarComponent = (props: TitleBarComponentProps): React.ReactElement => {
    return (<div className="flex title-bar">
        <div className="flex vcenter grow mar-left-16">
            <ProcessContainer />
            <Button icon={<PlusOutlined />}
                size="small"
                style={{
                    backgroundColor: !props.flow.id ? 'lightgray' : 'coral',
                    color: 'white',
                    border: 'unset'
                }}
                onClick={() => props.setFlow({
                    name: 'untitled*',
                    dag: new DirectedGraph(),
                })}
                disabled={!props.flow.id}
                className="mar-right-16">{"New"}</Button>
            <Title style={{ color: 'white', margin: 'unset' }} level={5}>
                {props.flow.name}
            </Title>
        </div>
        <div className="flex vcenter mar-right-16">
            <Tooltip title="Help - Documentation">
                <a rel="sd" target="_blank" href={SWAGGER_SERVICE_URL} className="white"><Button size="small" icon={<QuestionCircleOutlined />}></Button></a>
            </Tooltip>
            <Dropdown overlay={() => (<Menu onClick={
                (e) => {
                    if (e.key === "1") {
                        props.keycloak.logout();
                    }
                }
            }>
                <Menu.Item icon={<PoweroffOutlined />} key="1">Logout</Menu.Item>
            </Menu>)}>
                <Title style={{ color: 'white', margin: 'unset', marginLeft: 16 }} level={5}>
                    {props.keycloak.profile.firstName + " " + props.keycloak.profile.lastName}
                </Title>
            </Dropdown>
            <UserOutlined className="mar-left-8 mar-right-8 white" />
        </div>
    </div>)
}

export default TitleBarComponent;