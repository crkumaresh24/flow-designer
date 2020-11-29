import { Form, Input, Select } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../../Task';

const ReadJDBCTableTask = (props: TasksProps): React.ReactElement => {
    return (
        <Form
            name="global_state"
            layout="vertical"
            fields={[
                {
                    name: ['driver'],
                    value: 'org.postgresql.Driver',
                },
                {
                    name: ['url'],
                    value: props.task.request.url || 'jdbc:postgresql://localhost/postgres',
                },
                {
                    name: ['user'],
                    value: props.task.request.user || 'postgres',
                },
                {
                    name: ['password'],
                    value: props.task.request.password || 'postgres',
                },
                {
                    name: ['dbtable'],
                    value: props.task.request.dbtable || 'public.resource.types',
                },
            ]}
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
        >
            <Form.Item name="driver" label="Vendor">
                <Select>
                    <Select.Option value="org.postgresql.Driver">PostgreSQL</Select.Option>
                    <Select.Option value="oracle">Oracle</Select.Option>
                    <Select.Option value="mysql">MySQL</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item name="url" label="URL" rules={[{ required: true, message: 'URL is required!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="user" label="Username" rules={[{ required: true, message: 'Username is required!' }]}>
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={[{ required: true, message: 'pssword is required!' }]}>
                <Input />
            </Form.Item>
            <Form.Item
                name="dbtable"
                label="Tablename"
                rules={[{ required: true, message: 'table name is required!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default ReadJDBCTableTask;
