import { Form, Input } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../Task';

const ColumnFilterTask = (props: TasksProps): React.ReactElement => {
    return (
        <Form
            name="global_state"
            layout="vertical"
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
            fields={[
                {
                    name: ['columns'],
                    value: props.task.request.columns,
                },
            ]}
        >
            <Form.Item
                name="columns"
                label="Select Columns (comma separated)"
                rules={[{ required: true, message: 'Column name is required!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default ColumnFilterTask;
