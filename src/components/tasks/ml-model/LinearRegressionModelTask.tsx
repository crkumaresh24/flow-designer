import { Form, Input } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../Task';

const LinearRegressionModelTask = (props: TasksProps): React.ReactElement => {
    return (
        <Form
            name="global_state"
            layout="vertical"
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
            fields={[
                {
                    name: ['filter'],
                    value: props.task.request.filter,
                },
            ]}
        >
            <Form.Item
                name="filter"
                label="Where Clause"
                rules={[{ required: true, message: 'Where clause name is required!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default LinearRegressionModelTask;
