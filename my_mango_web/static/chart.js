// 初始化 Highcharts 圖表

function initializeChart(chartData) {
    Highcharts.chart('myAreaChart', {
        chart: {
            type: 'line',
            scrollablePlotArea: {
                minWidth: 700
            }
        },

        title: {
            text: 'Mango Price and Volume Over Time',
            align: 'left'
        },

        subtitle: {
            text: 'Source: Mango Dataset',
            align: 'left'
        },

        xAxis: {
            title: {
                text: 'Date'
            },
            categories: chartData.map(item => item[0]) // 使用 CSV 的第一列作為日期
        },

        yAxis: [{
            title: {
                text: 'Price (NT$)'
            }
        }, {
            title: {
                text: 'Volume'
            },
            opposite: true
        }],

        series: [{
            name: 'Price',
            yAxis: 0,
            data: chartData.map(item => item[1]) // 使用 CSV 的第二列作為價格
        }, {
            name: 'Volume',
            yAxis: 1,
            data: chartData.map(item => item[2]) // 使用 CSV 的第三列作為交易量
        }]
    });
}
