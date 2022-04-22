import { BASE_URL, PROXY_URL } from "../Constants/resourceFactory.js";
import { htmlSelectors } from '../Dom/selectors.js'

const { selectedResourseDOM } = htmlSelectors;

let requestBodyObj = (data) => ({
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        'resource_key': selectedResourseDOM().id,
        'resource_uri': selectedResourseDOM().value,
        ...data
    })
})

export const apiService = {
    requestFromRemoteApi: async () => await generalPostFunction(`${PROXY_URL}/${BASE_URL}/getResourceData`),
    getResourceRequestedOn: async () => await generalGetFunction(`/api/resource/requested?resource_key=${selectedResourseDOM().id}`),
    updateResourceRequestedOn: async () => await generalPostFunction(`/api/resource/requested`),
    createDataset: async (data) => await generalPostFunction(`/api/dataset`, data),
    getDataset: async (data) => await generalPostFunction(`/api/getdataset`, data),
    createLabels: async (data) => await generalPostFunction(`/api/dataset-labels`, data),
    getDatasetLabels: async () => await generalGetFunction(`/api/dataset-labels?resource_key=${selectedResourseDOM().id}`),
}

const generalPostFunction = async (url, data) => await fetch(url, requestBodyObj(data))
    .then(response => response.json())
    .catch(error => console.error(error));

const generalGetFunction = async (url) => await fetch(url)
    .then(response => response.json())
    .catch(error => console.error(error));

