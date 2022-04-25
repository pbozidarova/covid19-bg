export const htmlSelectors = {
    body: () => document.querySelector('body'),

    myChart: () => document.getElementById('myChart').getContext('2d'),

    resourceKey: () => document.querySelector('input[name="resourceKey"]:checked'),
    resourceKeysAll: () => document.querySelectorAll('input[name="resourceKey"]'),
    resourceKeyChecked: () => document.querySelectorAll('input[name="resourceKey"]:checked'),
    requiredLabels: () => document.querySelectorAll('input[name="resourceLabel"]:checked'),

    criteriaSection: () => document.getElementById('criteria'),
    datesSection: () => document.querySelector('.datesClass'),
    updateBtnSection: () => document.querySelector('.criteria-button-wrap'),
    graphSectionDOM: () => document.querySelector('.container'),

    resourceTitlesDOM: () => Array.from(document.querySelectorAll('h2')),

    selectedResourseDOM: () => document.querySelector('input[name="resource"]:checked'),
    selectedResourseTitleDom: () => document.querySelector('input[name="resource"]:checked').parentElement.parentElement.querySelector('h2'),
    notSelectedResoursesDOM: () => Array.from(document.querySelectorAll('input[name="resource"]:not(:checked)')).map(element => element.parentNode),

    chosenGeneralCriteria: () => document.querySelector('input[name="resourceKey"]:checked'),
    notChosenGeneralCriteria: () => document.querySelector('input[name="resourceKey"]:not(:checked)'),
    generalCriteria: () => document.querySelectorAll('input[name="resourceKey"]'),
    mainCriteriaDOM: () => document.querySelector('.main-criteria'),

    selectedDatasetsDOM: () => Array.from(document.querySelectorAll('input[name="dataset"]:checked')),
    datasetCriteriaDOM: () => document.querySelector('.dataset-criteria'),

    notifyDiv: () => document.getElementById('notify'),
    notifDates: () => document.getElementById('notif-dates'),
    notifStat: () => document.getElementById('notif-stat'),
    notifSec: () => document.getElementById('notif-sec'),

    sliderOneDOM: () => document.getElementById('slider-1'),
    sliderTwoDOM: () => document.getElementById('slider-2'),
    slidersDOM: () => document.querySelectorAll('input[type=range]'),

    displayValueOneDOM: () => document.getElementById("range1"),
    displayValueTwoDOM: () => document.getElementById("range2"),

    sliderTrackDOM: () => document.querySelector('.slider-track'),
    sliderContainerDOM: () => document.querySelector('.slider-container'),
    sliderValuesDOM: () => document.querySelector('.values'),

    // graphTypeOptions: () => document.getElementById('graphType'),
}