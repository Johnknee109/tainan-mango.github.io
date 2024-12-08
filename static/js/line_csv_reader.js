// 點擊事件: 在圖表上繪製標籤
Highcharts.addEvent(Highcharts.Point, 'click', function () {
    if (this.series.options.className.indexOf('popup-on-click') !== -1) {
        const chart = this.series.chart;
        const text = `<b>${this.category}</b><br/>${this.y} ${this.series.name}`;
        const anchorX = this.plotX + this.series.xAxis.pos;
        const anchorY = this.plotY + this.series.yAxis.pos;
        const align = anchorX < chart.chartWidth - 200 ? 'left' : 'right';
        const x = align === 'left' ? anchorX + 10 : anchorX - 10;
        const y = anchorY - 30;

        if (!chart.sticky) {
            chart.sticky = chart.renderer
                .label(text, x, y, 'callout',  anchorX, anchorY)
                .attr({
                    align,
                    fill: 'rgba(0, 0, 0, 0.75)',
                    padding: 10,
                    zIndex: 7 // Above series, below tooltip
                })
                .css({
                    color: 'white'
                })
                .on('click', function () {
                    chart.sticky = chart.sticky.destroy();
                })
                .add();
        } else {
            chart.sticky
                .attr({ align, text })
                .animate({ anchorX, anchorY, x, y }, { duration: 250 });
        }
    }
});

// 配置 Highcharts 圖表
Highcharts.chart('myAreaChart', {
    chart: {
        type: 'line',
        scrollablePlotArea: {
            minWidth: 700
        }
    },

    data: {
        csvURL: '/mango_price.csv',  // 指向 Flask 提供的路由
        beforeParse: function (csv) {
            // 檢查 CSV 格式並做必要的格式化處理
            return csv.replace(/\n\n/g, '\n').replace(/\r/g, '');  // 處理換行符號，避免格式錯誤
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
        type: 'category'
    },

    yAxis: [{
        title: {
            text: 'Price (NT$)'
        }
    }, {
        title: {
            text: 'Volume'
        },
        opposite: true // 顯示在右側
    }],

    series: [{
        name: 'Price',
        yAxis: 0,
        className: 'popup-on-click',
        data: [] // 會從 CSV 填充
    }, {
        name: 'Volume',
        yAxis: 1,
        data: [] // 會從 CSV 填充
    }],

    plotOptions: {
        series: {
            cursor: 'pointer',
            marker: {
                lineWidth: 1
            }
        }
    }
});
