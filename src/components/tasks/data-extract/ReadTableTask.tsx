import { Form, Input, Select } from 'antd';
import React from 'react';
import { BACKEND_URL } from '../../../globals';
import { TasksProps, onFieldsChange } from '../Task';

const ReadTableTask = (props: TasksProps): React.ReactElement => {
    const [buckets, setBuckets] = React.useState([]);

    React.useEffect(() => {
        fetch(BACKEND_URL + "/buckets")
            .then(response => response.json())
            .then(buckets => setBuckets(buckets));
    }, []);

    return (
        <Form
            name="global_state"
            layout="vertical"
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
            fields={[
                {
                    name: ['bucketName'],
                    value: props.task.request.bucketName,
                },
                {
                    name: ['tableName'],
                    value: props.task.request.tableName,
                },
            ]}
        >
            <Form.Item name="bucketName" label="Bucket" rules={[{ required: true, message: 'Bucket name is required!' }]}>
                <Select>
                    {
                        buckets && buckets.map(bucket => {
                            return (<Select.Option key={bucket} value={bucket}>{bucket}</Select.Option>)
                        })
                    }
                </Select>
            </Form.Item>
            <Form.Item name="tableName" label="Table Name" rules={[{ required: true, message: 'Table Name is required!' }]}>
                <Input />
            </Form.Item>
        </Form>
    );
};

export default ReadTableTask;
