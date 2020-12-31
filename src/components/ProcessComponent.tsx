import { StopOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { Badge, Button, Table } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React from 'react';
import { PROCESSES_SERVICE_URL } from '../globals';
import { IProcessMetadata } from '../models/IProcessMetadata';

interface ProcessComponentProps {
    processes: IProcessMetadata[];
    fetchProcesses: () => void;
    deleteProcesses: (processId: string) => void;
}

const ProcessComponent = (props: ProcessComponentProps): React.ReactElement => {

    const [openTools, setOpenTools] = React.useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = React.useState([]);
    const toggleOpenTools = () => setOpenTools(!openTools);

    const rowSelection = {
        onChange: (selectedRowKeys: any) => {
            setSelectedRowKeys(selectedRowKeys);
        },
    };

    const hasSelected = selectedRowKeys.length > 0;

    return (<div>
        <Button size="small"
            onClick={() => {
                props.fetchProcesses();
                toggleOpenTools();
            }}
            className="mar-right-16"
            icon={<Badge size="small" count={props.processes.length}><UnorderedListOutlined />
            </Badge>} />
        <Modal
            width={"70%"}
            footer={null}
            bodyStyle={{ padding: 'unset' }}
            title="Process Manager"
            visible={openTools}
            onCancel={toggleOpenTools}>
            <Button
                type="primary"
                onClick={() => {
                    selectedRowKeys.forEach(processId => {
                        props.deleteProcesses(processId);
                    })
                }}
                icon={<StopOutlined />}
                className="mar-8 mar-left-16"
                disabled={!hasSelected}>{"Kill & Clear"}</Button>
            <Table pagination={false} rowSelection={rowSelection} columns={[
                {
                    title: 'PID',
                    dataIndex: 'id',
                },
                {
                    title: 'Flow Name',
                    dataIndex: 'flowName',
                },
                {
                    title: 'Status',
                    dataIndex: 'status',
                },
                {
                    title: 'Log',
                    dataIndex: 'id',
                    // eslint-disable-next-line react/display-name
                    render: (id: string): React.ReactElement => {
                        // eslint-disable-next-line react/jsx-no-target-blank
                        return <a target="_blank" href={PROCESSES_SERVICE_URL + "/" + id + "/log"}>{"Log"}</a>
                    },
                }
            ]} dataSource={props.processes ? props.processes.map(process => ({
                ...process,
                key: process.id,
                flowName: process.flow.name
            })): []} />
        </Modal>
    </div>)
}

export default ProcessComponent;