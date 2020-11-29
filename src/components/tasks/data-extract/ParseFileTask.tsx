import { Col, Form, Input, Row, Select, Switch } from 'antd';
import React from 'react';
import { FieldData, StoreValue, TasksProps } from '../../Task';

const ParseFileTask = (props: TasksProps): React.ReactElement => {
    return (
        <Form
            name="global_state"
            layout="vertical"
            onFieldsChange={(changedFields: FieldData[], allFields: FieldData[]) => {
                const req: StoreValue = {};
                allFields.forEach((fieldData: FieldData) => {
                    req[fieldData.name.toString()] = fieldData.value;
                });
                props.setTaskRequest({
                    fileId: req.fileId,
                    options: {
                        ...req,
                    },
                });
            }}
            fields={[
                {
                    name: ['fileId'],
                    value: props.task.request.fileId || undefined,
                },
                {
                    name: ['quote'],
                    value: (props.task.request.options && props.task.request.options.quote) || "'",
                },
                {
                    name: ['delimiter'],
                    value: (props.task.request.options && props.task.request.options.delimiter) || ',',
                },
                {
                    name: ['escape'],
                    value: (props.task.request.options && props.task.request.options.escape) || '\\',
                },
                {
                    name: ['comment'],
                    value: (props.task.request.options && props.task.request.options.comment) || '#',
                },
                {
                    name: ['nullValue'],
                    value: (props.task.request.options && props.task.request.options.nullValue) || undefined,
                },
                {
                    name: ['header'],
                    value: (props.task.request.options && props.task.request.options.header) || true,
                },
                {
                    name: ['inferSchema'],
                    value: (props.task.request.options && props.task.request.options.inferSchema) || true,
                },
                {
                    name: ['multiLine'],
                    value: (props.task.request.options && props.task.request.options.multiLine) || true,
                },
                {
                    name: ['encoding'],
                    value: (props.task.request.options && props.task.request.options.encoding) || 'UTF-8',
                },
                {
                    name: ['dateFormat'],
                    value: (props.task.request.options && props.task.request.options.dateFormat) || 'yyyy-MM-d',
                },
            ]}
        >
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        name="fileId"
                        label="File ID"
                        rules={[{ required: true, message: 'File ID is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={4}>
                    <Form.Item name="quote" label="Quote" rules={[{ required: true, message: 'File ID is required!' }]}>
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name="delimiter"
                        label="Delimiter"
                        rules={[{ required: true, message: 'File ID is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name="escape"
                        label="Escape"
                        rules={[{ required: true, message: 'File ID is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={4}>
                    <Form.Item
                        name="comment"
                        label="Comment"
                        rules={[{ required: true, message: 'File ID is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="nullValue"
                        label="Null Value"
                        rules={[{ required: true, message: 'File ID is required!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={6}>
                    <Form.Item name="header" label="Header">
                        <Switch defaultChecked />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="inferSchema" label="Infer Schema">
                        <Switch defaultChecked />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="multiLine" label="Multi Line">
                        <Switch defaultChecked />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item name="encoding" label="Encoding">
                        <Select>
                            <Select.Option value="UTF-8">UTF-8</Select.Option>
                            <Select.Option value="UTF-16">UTF-16</Select.Option>
                            <Select.Option value="UTF-32">UTF-32</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item name="dateFormat" label="Date Format">
                        <Select>
                            <Select.Option value="yyyy-MM-dd">yyyy-MM-dd</Select.Option>
                            <Select.Option value="MM/dd/yyyy">MM/dd/yyyy</Select.Option>
                            <Select.Option value="dd-MM-yyyy">dd-MM-yyyy</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
};

export default ParseFileTask;
