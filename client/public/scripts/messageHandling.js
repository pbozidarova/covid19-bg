const notifications = {
    fetchFromOpenDBError: "Данните от https://data.egov.bg/ в момента са недостъпни."
}

function handleError(err) {
    htmlSelectors.notifyDiv().innerText = notifications.fetchFromOpenDBError;
}
