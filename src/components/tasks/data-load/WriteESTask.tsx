import { Col, Form, Input, Radio, Row, Switch } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../Task';

const WriteESTask = (props: TasksProps): React.ReactElement => {
    return (
        <Form
            name="global_state"
            layout="vertical"
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
            fields={[
                {
                    name: ['es_nodes'],
                    value: props.task.request.es_nodes,
                },
                {
                    name: ['indexName'],
                    value: props.task.request.indexName,
                },
                {
                    name: ['es_index_auto_create'],
                    value: props.task.request.es_index_auto_create,
                },
                {
                    name: ['es_nodes_wan_only'],
                    value: props.task.request.es_nodes_wan_only,
                },
                {
                    name: ['es_net_ssl'],
                    value: props.task.request.es_net_ssl,
                },
                {
                    name: ['mode'],
                    value: props.task.request.mode,
                },
            ]}
        >
            <Form.Item name="es_nodes" label="URL" rules={[{ required: true, message: 'URL is required!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="indexName"
                label="Index Name"
                rules={[{ required: true, message: 'Indexname is required!' }]}
            >
                <Input />
            </Form.Item>
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item name="es_index_auto_create" label="Auto Create Index">
                        <Switch defaultChecked={props.task.request.es_index_auto_create || false} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="es_net_ssl" label="SSL (HTTPS)">
                        <Switch defaultChecked={props.task.request.es_net_ssl || false} />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="es_nodes_wan_only" label="Nodes WAN Only">
                        <Switch defaultChecked={props.task.request.es_nodes_wan_only || false} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item name="mode" label="Write Mode" rules={[{ required: true }]}>
                <Radio.Group>
                    <Radio value={"overwrite"}>Overwrite</Radio>
                    <Radio value={"append"}>Append</Radio>
                    <Radio value={"error"}>Error_If_Exists</Radio>
                    <Radio value={"ignore"}>Ignore_If_Exists</Radio>
                </Radio.Group>
            </Form.Item>
        </Form>
    );
};

export default WriteESTask;
