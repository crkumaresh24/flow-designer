import { ConsoleSqlOutlined, ExpandAltOutlined, FilePptOutlined, TableOutlined } from "@ant-design/icons";
import React from "react";
import { TaskComponent } from "./Task";
import ParseFileTask from "./data-extract/ParseFileTask";
import ReadJDBCTableTask from "./data-extract/ReadJDBCTableTask";
import ReadTableTask from "./data-extract/ReadTableTask";
import CreateTableTask from "./data-load/CreateTableTask";
import WriteJDBCTableTask from "./data-load/WriteJDBCTableTask";
import StopWordsRemoverTask from "./data-transform/RemoveStopWordsTask";
import TokenizerTask from "./data-transform/TokenizeTask";
import ColumnFilterTask from "./data-transform/ColumnFilterTask";
import RowFilterTask from "./data-transform/RowFilterTask";
import WriteModelTask from "./data-load/WriteModelTask";
import LinearRegressionModelTask from "./ml-model/LinearRegressionModelTask";

export const registryComponents: Record<string, TaskComponent[]> = {
    "BASIC": [
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
    "EXTRACT": [
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
    "TRANSFORM": [
        {
            title: "TOKENIZER",
            type: "TOKENIZER_TASK",
            taskComponent: <span>T</span>,
            panelComponent: TokenizerTask,
            panelWidth: 560,
        },
        {
            title: "STOPWORDS_REMOVER",
            type: "STOPWORDS_REMOVER_TASK",
            taskComponent: <span>S</span>,
            panelComponent: StopWordsRemoverTask
        },
        {
            title: "COLUMN_FILTER",
            type: "COLUMN_FILTER_TASK",
            taskComponent: <span>F</span>,
            panelComponent: ColumnFilterTask
        },
        {
            title: "ROW_FILTER",
            type: "ROW_FILTER_TASK",
            taskComponent: <span>R</span>,
            panelComponent: RowFilterTask
        },
    ],
    "ML MODELS": [
        {
            title: "LINEAR_REGRESSION",
            type: "LINEAR_REGRESSION_TASK",
            taskComponent: <span>LI</span>,
            panelComponent: LinearRegressionModelTask
        },
    ],
    "LOAD": [
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
        {
            title: "WRITE_MODEL",
            type: "WRITE_MODEL_TASK",
            taskComponent: <span>M</span>,
            panelComponent: WriteModelTask,
            panelWidth: 560,
        },
    ]
}
