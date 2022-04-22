import { htmlSelectors } from './Dom/selectors.js';
import { chartVar } from './buildLables.js';
import { dataProcessor } from './dataProcessor.js';

const { slidersDOM,
    sliderOneDOM,
    sliderTwoDOM,
    sliderValuesDOM,
    sliderContainerDOM,
    sliderTrackDOM,
    displayValueOneDOM,
    displayValueTwoDOM,
    selectedDatasetsDOM } = htmlSelectors;

export default (() => {
    Array.from(slidersDOM()).map(slider => {
        slider.addEventListener('input', slide);
        slider.addEventListener('change', onDateChange);
        slider.max = sliderMaxValue();
    });

    sliderOneDOM().value = sliderMaxValue() - 30;
    sliderTwoDOM().value = sliderMaxValue();

    sliderTrackDOM().style.background = fillColor();
    displayValueOneDOM().textContent = displayDate(sliderOneDOM().value, 0, '06/06/2020');
    displayValueTwoDOM().textContent = displayDate(sliderTwoDOM().value, sliderMaxValue());
    sliderValuesDOM().style.left = calculateSliderValuesPosition();
})();

let minGap = 5;

async function slide(e) {
    if (sliderTwoDOM().value - sliderOneDOM().value <= minGap) {
        switch (e.target.id) {
            case 'slider-1':
                sliderOneDOM().value = parseInt(sliderTwoDOM().value) - minGap;
                break;
            case 'slider-2':
                sliderTwoDOM().value = sliderOneDOM().value + minGap;
                break;
        }
    }

    displayValueOneDOM().textContent = displayDate(sliderOneDOM().value, 0, '06/06/2020');
    displayValueTwoDOM().textContent = displayDate(sliderTwoDOM().value, sliderMaxValue());
    sliderTrackDOM().style.background = fillColor();
    sliderValuesDOM().style.left = calculateSliderValuesPosition();
}

async function onDateChange() {
    chartVar.data.labels = [];
    chartVar.data.datasets = [];

    Array.from(selectedDatasetsDOM()).map(selectedDataset => selectedDataset.value).forEach(async (dataset) => {
        const datasetDetails = await dataProcessor.loadDatasets(dataset, true);

        chartVar.data.labels = datasetDetails.labels;
        chartVar.data.datasets = datasetDetails.datasets;

        chartVar.update();
    })
}

function displayDate(addedDays, substractedDays, dateString) {
    let dateValue = isNaN(new Date(dateString)) ? new Date() : new Date(dateString);
    dateValue.setDate(dateValue.getDate() + parseInt(addedDays - substractedDays));

    return dateValue.toDateString();
}

function fillColor() {
    return `linear-gradient(to right, 
        #fff ${calculateSliderPercent(sliderOneDOM().value)}%, #219ebc ${calculateSliderPercent(sliderOneDOM().value)}%, 
        #219ebc ${calculateSliderPercent(sliderTwoDOM().value)}%, #fff ${calculateSliderPercent(sliderTwoDOM().value)}%)`
}

function calculateSliderValuesPosition() {
    return `${parseInt(calculateSliderPercent(sliderOneDOM().value)
        + parseInt(calculateSliderPercent(sliderTwoDOM().value - sliderOneDOM().value)) / 2)
        - parseInt(sliderValuesDOM().offsetWidth) / parseInt(sliderContainerDOM().offsetWidth) * 100 / 2
        }% `
}

function sliderMaxValue() {
    const day = 1000 * 60 * 60 * 24;

    return (turnDateIntoUtcFormat(new Date()) - turnDateIntoUtcFormat(new Date('06/06/2020'))) / day;
}

function calculateSliderPercent(sliderValue) {
    return (sliderValue / sliderMaxValue()) * 100;
}

function turnDateIntoUtcFormat(date) {
    return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}