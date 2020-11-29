import { ConsoleSqlOutlined, ExpandAltOutlined, FilePptOutlined, TableOutlined } from "@ant-design/icons";
import React from "react";
import { TaskComponent } from "./Task";
import ParseFileTask from "./tasks/data-extract/ParseFileTask";
import ReadJDBCTableTask from "./tasks/data-extract/ReadJDBCTableTask";
import ReadTableTask from "./tasks/data-extract/ReadTableTask";
import CreateTableTask from "./tasks/data-load/CreateTableTask";
import WriteJDBCTableTask from "./tasks/data-load/WriteJDBCTableTask";
import StopWordsRemoverTask from "./tasks/data-transform/RemoveStopWordsTask";
import TokenizerTask from "./tasks/data-transform/TokenizeTask";

export const registryComponents: Record<string, TaskComponent[]> = {
    "Basic": [
        {
            title: "START",
            type: "START_TASK",
            taskComponent: <span>S</span>
        },
        {
            title: "STOP",
            type: "STOP_TASK",
            taskComponent: <span>E</span>
        },
        {
            title: "CONNECTOR",
            type: "CONNECTOR",
            taskComponent: <ExpandAltOutlined />
        }
    ],
    "Data Extract": [
        {
            title: "PARSE_FILE",
            type: "PARSE_FILE_TASK",
            taskComponent: <FilePptOutlined />,
            panelComponent: ParseFileTask,
            panelWidth: 560,
        },
        {
            title: "READ_TABLE",
            type: "READ_TABLE_TASK",
            taskComponent: <TableOutlined />,
            panelComponent: ReadTableTask
        },
        {
            title: "READ_JDBC_TABLE",
            type: "READ_JDBC_TABLE_TASK",
            taskComponent: <ConsoleSqlOutlined />,
            panelComponent: ReadJDBCTableTask
        },
    ],
    "Data Transform": [
        {
            title: "TOKENIZE",
            type: "TOKENIZE_TASK",
            taskComponent: <span>T</span>,
            panelComponent: TokenizerTask,
            panelWidth: 560,
        },
        {
            title: "REMOVE_STOP_WORDS",
            type: "REMOVE_STOP_WORDS_TASK",
            taskComponent: <span>S</span>,
            panelComponent: StopWordsRemoverTask
        },
    ],
    "Data Load": [
        {
            title: "CREATE_TABLE",
            type: "CREATE_TABLE_TASK",
            taskComponent: <TableOutlined />,
            panelComponent: CreateTableTask
        },
        {
            title: "WRITE_JDBC_TABLE",
            type: "WRITE_JDBC_TABLE_TASK",
            taskComponent: <ConsoleSqlOutlined />,
            panelComponent: WriteJDBCTableTask,
            panelWidth: 560,
        },
    ]
}
