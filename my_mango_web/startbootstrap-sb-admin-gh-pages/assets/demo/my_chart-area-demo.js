// 使用 Highcharts 創建圖表
document.addEventListener('DOMContentLoaded', function () {
    Highcharts.chart('myAreaChart', {
        chart: {
            type: 'line' // 指定圖表類型
        },
        title: {
            text: 'Sessions over Time' // 圖表標題
        },
        xAxis: {
            categories: ["Mar 1", "Mar 2", "Mar 3", "Mar 4", "Mar 5", "Mar 6", "Mar 7", "Mar 8", "Mar 9", "Mar 10", "Mar 11", "Mar 12", "Mar 13"],
            title: {
                text: 'Date' // X軸標題
            }
        },
        yAxis: {
            title: {
                text: 'Sessions' // Y軸標題
            },
            min: 0,
            max: 40000
        },
        tooltip: {
            shared: true,
            valueSuffix: ' sessions' // 提示框後綴
        },
        series: [{
            name: 'Sessions',
            data: [10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159, 32651, 31984, 38451],
            color: 'rgba(2,117,216,1)',
            lineWidth: 2,
            marker: {
                radius: 5,
                symbol: 'circle'
            },
            fillOpacity: 0.1
        }],
        exporting: {
            enabled: true, // 啟用匯出功能
            buttons: {
                contextButton: {
                    menuItems: [
                        'downloadPNG', // 匯出為 PNG
                        'downloadJPEG', // 匯出為 JPEG
                        'downloadPDF', // 匯出為 PDF
                        'downloadSVG', // 匯出為 SVG
                        'separator', // 分隔線
                        'downloadCSV', // 匯出為 CSV
                        'downloadXLS' // 匯出為 Excel
                    ]
                }
            }
        },
        credits: {
            enabled: false // 隱藏 Highcharts 的版權標籤
        }
    });
});
