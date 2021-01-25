import { Form, Input } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../Task';

const WriteLibSVMTask = (props: TasksProps): React.ReactElement => {
    return (
        <Form
            name="global_state"
            layout="vertical"
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
            fields={[
                {
                    name: ['path'],
                    value: props.task.request.path,
                },
            ]}
        >
            <Form.Item
                name="path"
                label="Path"
                rules={[{ required: true, message: 'Path is required!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default WriteLibSVMTask;
