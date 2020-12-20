import { Form, Input, Switch } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../Task';

const TokenizerTask = (props: TasksProps): React.ReactElement => {
    return (
        <Form
            name="global_state"
            layout="vertical"
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
            fields={[
                {
                    name: ['pattern'],
                    value: props.task.request.pattern,
                },
                {
                    name: ['inputCol'],
                    value: props.task.request.inputCol,
                },
                {
                    name: ['outputCol'],
                    value: props.task.request.outputCol,
                },
                {
                    name: ['gaps'],
                    value: props.task.request.gaps || true,
                },
            ]}
        >
            <Form.Item name="pattern" label="Pattern" rules={[{ required: true, message: 'Pattern is required!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="inputCol"
                label="Input Column"
                rules={[{ required: true, message: 'Input column is required!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="outputCol"
                label="Output Column"
                rules={[{ required: true, message: 'Output column is required!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="gaps" label="Split Tokens">
                {!props.task.request.gaps && <Switch />}
                {props.task.request.gaps && <Switch defaultChecked />}
            </Form.Item>
        </Form>
    );
};

export default TokenizerTask;
