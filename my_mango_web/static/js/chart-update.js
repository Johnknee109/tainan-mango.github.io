document.addEventListener('DOMContentLoaded', function () {
  // 初始化圖表
  let chart = Highcharts.chart('myAreaChart', {
    title: {
      text: '初始化資料',
      align: 'left'
    },
    yAxis: {
      title: {
        text: '數量'
      }
    },
    xAxis: {
      categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },
    series: [{
      name: '價格 (元/公斤)',
      data: []
    }, {
      name: '交易量 (公斤)',
      data: []
    }],
    credits: { text: '' }
  });

  // 綁定下拉式選單變更事件
  document.getElementById('dataSelector').addEventListener('change', function () {
    let selectedValue = this.value;

    // 使用 AJAX 請求新數據
    fetch(`/get_chart_data?dataset=${selectedValue}`)
      .then(response => response.json())
      .then(data => {
        // 更新圖表標題和數據
        chart.setTitle({ text: `資料集 ${selectedValue}` });
        chart.series[0].setData(data.price);
        chart.series[1].setData(data.volume);
      })
      .catch(error => console.error('Error:', error));
  });

  // 初始化時加載第一筆數據
  document.getElementById('dataSelector').dispatchEvent(new Event('change'));
});
