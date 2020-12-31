import { Form, Input } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../Task';

const WriteModelTask = (props: TasksProps): React.ReactElement => {
    return (
        <Form
            name="global_state"
            layout="vertical"
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
            fields={[
                {
                    name: ['modelName'],
                    value: props.task.request.modelName,
                },
            ]}
        >
            <Form.Item
                name="modelName"
                label="Model Name"
                rules={[{ required: true, message: 'ModelName is required!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default WriteModelTask;
