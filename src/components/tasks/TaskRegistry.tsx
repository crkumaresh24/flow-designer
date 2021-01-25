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
import WriteESTask from "./data-load/WriteESTask";
import KMeansClassificationModelTask from "./ml-model/KMeansClassificationModelTask";
import WriteLibSVMTask from "./data-load/WriteLibSVMTask";

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
    "DATA SOURCES": [
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
            panelComponent: ReadJDBCTableTask,
            defaultValue: {
                "driver": "org.postgresql.Driver",
                "url": "jdbc:postgresql://localhost/postgres",
                "user": "postgres",
                "password": "postgres",
                "dbtable": "postgres"
            }
        },
    ],
    "NLP TRANSFORM": [
        {
            title: "TOKENIZER",
            type: "TOKENIZER_TASK",
            taskComponent: <span>TK</span>,
            panelComponent: TokenizerTask,
            panelWidth: 560,
        },
        {
            title: "STOPWORDS_REMOVER",
            type: "STOPWORDS_REMOVER_TASK",
            taskComponent: <span>SR</span>,
            panelComponent: StopWordsRemoverTask
        },
        {
            title: "COLUMN_FILTER",
            type: "COLUMN_FILTER_TASK",
            taskComponent: <span>CF</span>,
            panelComponent: ColumnFilterTask
        },
        {
            title: "ROW_FILTER",
            type: "ROW_FILTER_TASK",
            taskComponent: <span>RF</span>,
            panelComponent: RowFilterTask
        },
        {
            title: "UNION",
            type: "UNION_TASK",
            taskComponent: <span>UN</span>,
        },
    ],
    "REGRESSION MODELS": [
        {
            title: "LINEAR_REGRESSION",
            type: "LINEAR_REGRESSION_TASK",
            taskComponent: <span>LI</span>,
            panelComponent: LinearRegressionModelTask
        },
    ],
    "CLASSIFICATION MODELS": [
        {
            title: "K_MEANS",
            type: "K_MEANS_TASK",
            taskComponent: <span>K-M</span>,
            panelComponent: KMeansClassificationModelTask
        },
    ],
    "DATA TARGETS": [
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
            defaultValue: {
                "driver": "org.postgresql.Driver",
                "url": "jdbc:postgresql://localhost/postgres",
                "user": "postgres",
                "password": "postgres",
                "dbtable": "postgres"
            }
        },
        {
            title: "WRITE_LIBSVM",
            type: "WRITE_LIBSVM_TASK",
            taskComponent: <span>LSVM</span>,
            panelComponent: WriteLibSVMTask,
            panelWidth: 560,
        },
        {
            title: "WRITE_MODEL",
            type: "WRITE_MODEL_TASK",
            taskComponent: <span>ML</span>,
            panelComponent: WriteModelTask,
            panelWidth: 560,
        },
        {
            title: "WRITE_ES",
            type: "WRITE_ES_TASK",
            taskComponent: <span>ES</span>,
            panelComponent: WriteESTask,
            panelWidth: 560,
            defaultValue: {
                "es_nodes": "localhost:9200",
                "es_nodes_wan_only": true,
                "mode": "overwrite"
            }
        },
    ]
}
