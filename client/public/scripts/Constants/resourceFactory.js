export const BASE_URL = 'https://data.egov.bg/api';
//Access-Control-Allow-Origin error roundabout by CORS proxy
//https://stackoverflow.com/questions/43262121/trying-to-use-fetch-and-pass-in-mode-no-cors
export const PROXY_URL = 'https://afternoon-reaches-20175.herokuapp.com';
import { bg, eng } from "./lang.js";


let lang = bg ? bg : eng;

export const apiPath = {
    getDatasetDetails: 'getDatasetDetails',
    getResourceData: 'getResourceData',
    listDataOrganisations: 'listDataOrganisations',
    listDatasets: 'listDatasets',
}

export const agregateResourceData = (param, resourceId) => {
    let params = [];

    Object.keys(resourceFactory).forEach(group => {
        resourceFactory[group].resources
            .filter(resource => resource.id == resourceId)
            .forEach(resource => {
                params.push(resource[param]);
            });
    })

    return params;
}

export const resourceFactory = {
    "general": {
        title: lang.genTitle,
        resources: [
            { id: 'gen', uri: 'e59f95dd-afde-43af-83c8-ea2916badd19', graphType: 'line', title: lang.gen.title, labels: lang.gen.labels },
            { id: 'byAge', uri: '8f62cfcf-a979-46d4-8317-4e1ab9cbd6a8', graphType: 'line', title: lang.byAge.title, labels: lang.byAge.labels },
            { id: 'byRegion', uri: 'cb5d7df0-3066-4d7a-b4a1-ac26525e0f0c', graphType: 'line', title: lang.byRegion.title, labels: lang.byRegion.labels },
            { id: 'byTest', uri: '0ce4e9c3-5dfc-46e2-b4ab-42d840caab92', graphType: 'line', title: lang.byTest.title, labels: lang.byTest.labels },
            { id: 'deathByAge', uri: '18851aca-4c9d-410d-8211-0b725a70bcfd', graphType: 'pie', title: lang.deathByAge.title, labels: lang.deathByAge.labels }
        ],
    },

    "vaccinated": {
        title: lang.vaxTitle,
        resources: [
            { id: 'infectecVacinated', uri: 'e9f795a8-0146-4cf0-9bd1-c0ba3d9aa124', graphType: 'pie', title: lang.infectecVacinated.title, labels: lang.infectecVacinated.labels },
            { id: 'hospitalisedVacinated', uri: '6fb4bfb1-f586-45af-8dd2-3385499c3664 ', graphType: 'pie', title: lang.hospitalisedVacinated.title, labels: lang.hospitalisedVacinated.labels },
            { id: 'NCUVacinated', uri: '218d49de-88a8-472a-9bb2-b2a373bd7ab4 ', graphType: 'pie', title: lang.NCUVacinated.title, labels: lang.NCUVacinated.labels },
            { id: 'deathVacinated', uri: 'e6a72183-28e0-486a-b4e4-b5db8b60a900', graphType: 'pie', title: lang.deathVacinated.title, labels: lang.deathVacinated.labels }
        ]
    }
}