import { Form, Input } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../Task';

const StopWordsRemoverTask = (props: TasksProps): React.ReactElement => {
    return (
        <Form
            name="global_state"
            layout="vertical"
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
            fields={[
                {
                    name: ['inputCol'],
                    value: props.task.request.inputCol,
                },
                {
                    name: ['outputCol'],
                    value: props.task.request.outputCol,
                },
            ]}
        >
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
        </Form>
    );
};

export default StopWordsRemoverTask;
