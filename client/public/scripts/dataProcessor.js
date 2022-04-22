import { apiService } from "./Api/apiService.js";
import { chartVar } from "./buildLables.js";
import { isRegion } from "./tools.js";
import { htmlSelectors } from "./Dom/selectors.js";
import { regionInformation } from "./tools.js";
import { bg, eng } from "./Constants/lang.js";

const { displayValueOneDOM, displayValueTwoDOM, selectedResourseDOM } = htmlSelectors;
let lang = bg ? bg : eng;

export const dataProcessor = {
    async processAnUpdate() {
        let data = (await apiService.requestFromRemoteApi())['data'];
        const dataTypeIsStandard = data[0].filter(row => row.includes('Брой')).length === 0;

        let result;
        if (dataTypeIsStandard) {
            result = dataProcessor.buildDataForLabel(data);
        } else {
            result = dataProcessor.buildDataForLabelOptionTwo(data);
            let createdLabels = await apiService.createLabels({ datasetLabels: result.criteria, });
            console.log(createdLabels)
        }
        const { datasets, criteria } = result;

        console.log(datasets)
        datasets.forEach(apiService.createDataset);
        apiService.updateResourceRequestedOn();
    },

    buildDataForLabel(data) {
        let labels = data.shift();
        let arrayDatasetObjects = [];

        labels.forEach(label => {
            let labelIndex = labels.indexOf(label);

            let unsortedDatasetArray = [];
            data.forEach(row => {
                unsortedDatasetArray.push({ t: row[0], y: row[labelIndex] })
            })

            arrayDatasetObjects.push({
                label,
                data: unsortedDatasetArray
            });
        })

        console.log(arrayDatasetObjects)

        return { datasets: arrayDatasetObjects };
    },

    buildDataForLabelOptionTwo(dataset) {
        let columns = dataset.shift();

        let returningFullColumnValue = (columnTitleContaining) => columns.filter(label => label.includes(columnTitleContaining))[0];
        let indexOfLabel = (columnTitleContaining) => columns.indexOf(returningFullColumnValue(columnTitleContaining));

        let uniqueValuesInColumn = (data, columnTitleContaining) => data.map(row => row[indexOfLabel(columnTitleContaining)])
            .filter((row, index, array) => array.indexOf(row) === index);

        let result = [];
        let data = uniqueValuesInColumn(dataset, 'Дата').map(date => ({ t: date, y: 0 }));

        let uniqueLabels = this.uniqueDatasetLabels(columns, dataset)

        uniqueLabels.filter((row, index, array) => array.indexOf(row) === index && row != null)
            .forEach(label => {
                result.push({ label, data });
            });


        dataset.forEach(row => {
            let date = row[indexOfLabel('Дата')];
            let count = row[indexOfLabel('Брой')];

            row.shift()
            row.pop()

            parseInt(count) > 0 && row.forEach(lbl => {
                result.map(resultRow => {
                    if (resultRow.label === lbl) {
                        resultRow.data = resultRow.data.map(singleDayObj => singleDayObj.t === date
                            ? { ...singleDayObj, y: singleDayObj.y + parseInt(count) }
                            : singleDayObj
                        )
                    }
                    return resultRow
                })
            });
        });

        console.log(result);

        console.log(uniqueLabels)

        return { datasets: result, criteria: uniqueLabels };
    },

    uniqueDatasetLabels(columns, dataset) {

        let returningFullColumnValue = (columnTitleContaining) => columns.filter(label => label.includes(columnTitleContaining))[0];
        let indexOfLabel = (columnTitleContaining) => columns.indexOf(returningFullColumnValue(columnTitleContaining));

        let uniqueValuesInColumn = (data, columnTitleContaining) => data.map(row => row[indexOfLabel(columnTitleContaining)])
            .filter((row, index, array) => array.indexOf(row) === index);

        let uniqueDatasetLabels = [];

        columns.filter(col => col != 'Дата' && col != returningFullColumnValue('Брой'))
            .forEach(column => uniqueDatasetLabels = [...uniqueDatasetLabels, ...uniqueValuesInColumn(dataset, column)]);

        uniqueDatasetLabels = uniqueDatasetLabels.filter((row, index, array) => array.indexOf(row) === index)
            .filter(label => label != '-' && label != 'NULL' && label != 'undefined' && label != null);

        console.log(uniqueDatasetLabels);

        return uniqueDatasetLabels;
    },

    async loadDatasets(dataset, shouldAdd) {
        return selectedResourseDOM().alt == 'line'
            ? await this.buildLineDataProperties(dataset, shouldAdd)
            : await this.buildPieDataProperties(dataset, shouldAdd);
    },

    async buildLineDataProperties(dataset, shouldAdd) {
        const regionCode = dataset?.split('_')[0];
        const sickSpecifier = dataset?.split('_')[1];

        let label = isRegion(dataset)
            ? `${regionInformation[regionCode].nameBG} ${lang.utilityString[sickSpecifier]}`
            : dataset

        let criteriaDatasets = await apiService.getDataset({
            label: dataset,
            from: displayValueOneDOM().innerText,
            to: displayValueTwoDOM().innerText
        });

        let datasets = chartVar.data.datasets;
        let labels = chartVar.data.labels;
        if (shouldAdd) {
            labels = criteriaDatasets.map(row => row.markedondate)
            datasets.push({
                label: label,
                data: criteriaDatasets.map(row => ({ t: new Date(row.markedondate), y: parseInt(row.value) })),
                fill: false,
                borderWidth: 3,
                hoverBorderWidth: 3,
                hoverBorderColor: '#000'
            });
        } else {
            datasets = datasets.filter(dst => dst.label !== dataset)
        }

        return { labels, datasets };
    },

    async buildPieDataProperties(dataset, shouldAdd) {
        let criteriaDatasets = await apiService.getDataset({
            label: dataset,
            from: displayValueOneDOM().innerText,
            to: displayValueTwoDOM().innerText
        });

        let datasets = chartVar.data.datasets;
        let labels = chartVar.data.labels;

        if (shouldAdd) {
            labels.push(dataset)
            datasets.length === 0 && datasets.push({ data: [] })

            datasets[0].data
                .push(criteriaDatasets.map(val => parseInt(val.value)).reduce((prev, curr) => prev + curr, 0));
        } else {
            let indexOfDatasetToRemove = labels.indexOf(dataset);
            datasets[0].data.splice(indexOfDatasetToRemove, 1);
            labels = labels.filter(lbl => lbl != dataset)
        }

        return { labels, datasets };
    },
}