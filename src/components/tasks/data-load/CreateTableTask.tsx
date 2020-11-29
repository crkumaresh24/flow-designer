import { Form, Input } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../../Task';

const CreateTableTask = (props: TasksProps): React.ReactElement => {
    return (
        <Form
            name="global_state"
            layout="vertical"
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
            fields={[
                {
                    name: ['tableName'],
                    value: props.task.request.tableName,
                },
            ]}
        >
            <Form.Item
                name="tableName"
                label="Table Name"
                rules={[{ required: true, message: 'Tablenname is required!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default CreateTableTask;
