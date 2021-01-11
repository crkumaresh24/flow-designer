import { ReloadOutlined } from '@ant-design/icons';
import { Button, Form, Select } from 'antd';
import React from 'react';
import { TasksProps, onFieldsChange } from '../Task';
import { listLakeTables } from '../utils/FetchUtils';

const ReadTableTask = (props: TasksProps): React.ReactElement => {

    const [tables, setTables] = React.useState<string[]>();

    React.useEffect(() => {
        listLakeTables(setTables);
    }, []);

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
            <Form.Item name="tableName"
                label={<>
                    {"Table Name"}
                    <Button type="link" size="small" onClick={() => listLakeTables(setTables)} icon={<ReloadOutlined />}></Button>
                </>}
                rules={[{ required: true, message: 'Table Name is required!' }]}>
                <Select>
                    {
                        tables?.map(file => <Select.Option key={file} value={file}>{file}</Select.Option>)
                    }
                </Select>
            </Form.Item>
        </Form>
    );
};

export default ReadTableTask;
