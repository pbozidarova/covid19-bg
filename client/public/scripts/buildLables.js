import { agregateResourceData, resourceFactory } from "./Constants/resourceFactory.js";
import { htmlSelectors } from "./Dom/selectors.js";
import { regionInformation } from "./tools.js";
import { dynamicChartsService } from './Chart/chartService.js'
import { dataProcessor } from "./dataProcessor.js";
import { apiService } from './Api/apiService.js';
import { bg, eng } from "./Constants/lang.js";

export let chartVar = dynamicChartsService.chart('line');

const {
    mainCriteriaDOM,
    datasetCriteriaDOM,
    // graphTypeOptions,
    selectedDatasetsDOM,
    selectedResourseTitleDom,
    selectedResourseDOM, graphSectionDOM, notSelectedResoursesDOM, resourceTitlesDOM } = htmlSelectors;

let lang = bg ? bg : eng;

//Building the resource labels from the two main resource groups
Object.keys(resourceFactory).forEach(group => {
    let divElement = document.createElement("div");
    divElement.setAttribute("id", group);

    let titleElement = document.createElement("h2");
    titleElement.innerText = resourceFactory[group].title;
    divElement.appendChild(titleElement);
    mainCriteriaDOM().appendChild(divElement);

    resourceFactory[group].resources.forEach(resource => {
        let divOptionElement = document.createElement("div");
        let inputElement = createInputElement('resource', resource.id, resource.uri, resource.graphType)
        divOptionElement.appendChild(inputElement);
        divOptionElement.appendChild(createLabelElement(resource.id, resource.title));
        divElement.appendChild(divOptionElement);

        inputElement.addEventListener('click', async () => {
            // graphTypeOptions().value = resource.graphType

            chartVar.destroy()
            chartVar = dynamicChartsService.chart(resource.graphType);

            graphSectionDOM()?.classList.add('hidden')

            if (inputElement.checked) {
                graphSectionDOM()?.classList.remove('hidden')

                inputElement.parentNode.parentNode.className = 'centered';
                [...notSelectedResoursesDOM(), ...resourceTitlesDOM()].forEach(domElement => domElement.className = 'hidden');
                selectedResourseTitleDom().className = ''

                console.log("Please wait")

                if (await isTheDataDueForUpdate()) {
                    await dataProcessor.processAnUpdate();
                }
                await buildDatasetCheckboxes(resource);
                console.log("Completed")

            } else {
                datasetCriteriaDOM().textContent = '';
                inputElement.parentNode.parentNode.className = '';
                [...notSelectedResoursesDOM(), ...resourceTitlesDOM()].forEach(domElement => domElement.className = '');
            }
        });
    });
});

//Building the datasets based on the chosen resource
async function buildDatasetCheckboxes(resource) {
    let divDisplayClass = 'two-column-grid';
    datasetCriteriaDOM().classList.add(divDisplayClass);

    let checkboxes = resource.graphType === 'pie'
        ? (await apiService.getDatasetLabels())[0].map(val => val.label).sort()
        : agregateResourceData('labels', selectedResourseDOM().id)[0];

    checkboxes.forEach(dataset => {
        let inputElement = createInputElement('dataset', dataset, dataset);
        inputElement.addEventListener('click', async () => {
            const datasetDetails = selectedDatasetsDOM().length > 0 && await dataProcessor.loadDatasets(dataset, inputElement.checked);

            chartVar.data.labels = datasetDetails?.labels || [];
            chartVar.data.datasets = datasetDetails.datasets || []

            chartVar.update();
        });

        const regionCode = dataset.split('_')[0];
        const sickSpecifier = dataset.split('_')[1];

        let labelElement = resource.id !== 'byRegion'
            ? createLabelElement(dataset, dataset)
            : createLabelElement(dataset, `${regionInformation[regionCode].nameBG} ${lang.utilityString[sickSpecifier]}`);

        datasetCriteriaDOM().appendChild(inputElement);
        datasetCriteriaDOM().appendChild(labelElement);
    });
};

//Utility functions
function createInputElement(name, id, value, graphtype) {
    let element = document.createElement('input');

    element.setAttribute('type', 'checkbox');
    element.setAttribute('name', name);
    element.setAttribute('id', id);
    element.setAttribute('value', value);
    element.setAttribute('alt', graphtype);

    return element;
};

function createLabelElement(forValue, innerTextValue) {
    let element = document.createElement('label');

    element.setAttribute("for", forValue);
    element.innerText = innerTextValue;

    return element;
}

async function isTheDataDueForUpdate() {
    let lastUpdatedFetched = (await apiService.getResourceRequestedOn())?.updatedon;
    let lastUpdated = new Date(lastUpdatedFetched).toUTCString().slice(0, -13);
    let today = new Date().toUTCString().slice(0, -13);

    return !lastUpdated || lastUpdated !== today;
}