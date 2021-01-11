import { ReloadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../Task';
import { listLakeFiles } from '../utils/FetchUtils';

const LinearRegressionModelTask = (props: TasksProps): React.ReactElement => {
    const [files, setFiles] = React.useState<string[]>();

    React.useEffect(() => {
        listLakeFiles(setFiles);
    }, []);

    return (
        <Form
            name="global_state"
            layout="vertical"
            onFieldsChange={(changedFields, allFields) => onFieldsChange(changedFields, allFields, props)}
            fields={[
                {
                    name: ['trainingFilePath'],
                    value: props.task.request.trainingFilePath,
                },
                {
                    name: ['maxIter'],
                    value: props.task.request.maxIter,
                },
                {
                    name: ['regParam'],
                    value: props.task.request.regParam,
                },
                {
                    name: ['elasticNetParam'],
                    value: props.task.request.elasticNetParam,
                },
            ]}
        >
            <Form.Item
                name="trainingFilePath"
                label={<>
                    {"Training Data"}
                    <Button type="link" size="small" onClick={() => listLakeFiles(setFiles)} icon={<ReloadOutlined />}></Button>
                </>
                }
                rules={[{ required: true, message: 'Training data is required!' }]}
            >
                <Select>
                    {
                        files?.map(file => <Select.Option key={file} value={file}>{file}</Select.Option>)
                    }
                </Select>
            </Form.Item>
            <Form.Item
                name="maxIter"
                label="Max Iteration"
                rules={[{ required: true, message: 'Max Iteration data is required!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="regParam"
                label="Reg Param"
                rules={[{ required: true, message: 'Reg Param is required!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="elasticNetParam"
                label="Elastic Net Param"
                rules={[{ required: true, message: 'Elastic Net Param is required!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default LinearRegressionModelTask;
