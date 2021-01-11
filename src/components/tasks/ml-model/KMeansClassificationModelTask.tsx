import { Form, Input } from 'antd';
import React from 'react';
import { onFieldsChange, TasksProps } from '../Task';

const KMeansClassificationModelTask = (props: TasksProps): React.ReactElement => {
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
                    name: ['kValue'],
                    value: props.task.request.kValue,
                },
                {
                    name: ['seed'],
                    value: props.task.request.seed,
                },
            ]}
        >
            <Form.Item
                name="trainingFilePath"
                label="Training Data"
                rules={[{ required: true, message: 'Training data is required!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="kValue"
                label="K Value"
                rules={[{ required: true, message: 'K Means value is required!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="seed"
                label="Seed Value"
                rules={[{ required: true, message: 'Seed value is required!' }]}
            >
                <Input />
            </Form.Item>
        </Form>
    );
};

export default KMeansClassificationModelTask;
