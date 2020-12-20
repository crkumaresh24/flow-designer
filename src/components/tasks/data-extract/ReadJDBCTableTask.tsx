import { Collapse, Form, Input, Select } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../Task';

const { Panel } = Collapse;

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
                {
                    name: ['numPartitions'],
                    value: props.task.request.numPartitions,
                },
                {
                    name: ['partitionColumn'],
                    value: props.task.request.partitionColumn,
                },
                {
                    name: ['lowerBound'],
                    value: props.task.request.lowerBound,
                },
                {
                    name: ['upperBound'],
                    value: props.task.request.upperBound,
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
            <Collapse>
                <Panel header="Partitioned Read (Advanced) " key="1">
                    <Form.Item name="numPartitions" label="Number of Partitions">
                        <Input />
                    </Form.Item>
                    <Form.Item name="partitionColumn" label="Partition Column">
                        <Input />
                    </Form.Item>
                    <Form.Item name="lowerBound" label="Lower Bound">
                        <Input />
                    </Form.Item>
                    <Form.Item name="upperBound" label="Upper Bound">
                        <Input />
                    </Form.Item>
                </Panel>
            </Collapse>,
        </Form>
    );
};

export default ReadJDBCTableTask;
