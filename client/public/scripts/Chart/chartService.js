export const dynamicChartsService = {
    chart(type) {
        return new Chart(myChart, {
            type: type, //bar, horizontal, pie, line, doughnut, radar, polarArea
            fill: true,
            data: {
                labels: [],
                datasets: []
            },
            options: {
                title: {
                    display: false,
                    text: 'No Title',
                    fontSize: 25
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontColor: '#000'
                    }
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        bottom: 0,
                        top: 0
                    }
                },
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day'
                        },
                        displayFormats: {
                            quarter: 'MMM YYYY'
                        }
                    }]
                },
                tooltips: {
                    enabled: true,
                    mode: 'index',
                    position: 'nearest',
                    //custom: customTooltips
                },
                plugins: {
                    colorschemes: {
                        scheme: 'tableau.Classic20'
                    }
                }
            }
        })
    },
}