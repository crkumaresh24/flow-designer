import { LAKE_SERVICE_URL } from "../../../globals";

export const listLakeFiles = (onSuccess: (json: any) => void) => {
    fetch(LAKE_SERVICE_URL + "/files")
        .then(response => response.json())
        .then(onSuccess);
}

export const listLakeTables = (onSuccess: (json: any) => void) => {
    fetch(LAKE_SERVICE_URL + "/tables")
        .then(response => response.json())
        .then(onSuccess);
}

export const listLakeModels = (onSuccess: (json: any) => void) => {
    fetch(LAKE_SERVICE_URL + "/models")
        .then(response => response.json())
        .then(onSuccess);
}