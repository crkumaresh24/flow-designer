import { Form, Input } from 'antd';
import React from 'react';
import { TasksProps, onFieldsChange } from '../../Task';

const ReadTableTask = (props: TasksProps): React.ReactElement => {
    return (
        <Form
            name="global_state"
            layout="inline"
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
            fields={[
                {
                    name: ['tableId'],
                    value: props.task.request.tableId,
                },
            ]}
        >
            <Form.Item name="tableId" label="Table Id" rules={[{ required: true, message: 'Table ID is required!' }]}>
                <Input />
            </Form.Item>
        </Form>
    );
};

export default ReadTableTask;
