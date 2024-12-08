document.addEventListener('DOMContentLoaded', function () {
  // 初始化圖表
  let chart = Highcharts.chart('myBarChart', {
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
    series: [],  // 初始時不設置 series
    credits: { text: '' },
    legend: {
      enabled: true, // 啟用圖例
      itemStyle: {
        cursor: 'pointer'
      }
    }
  });

  // 儲存目前選中的legend狀態
  let selectedLegends = {};

  // 綁定下拉式選單變更事件
  document.getElementById('weather_dataSelector').addEventListener('change', function () {
    let selectedValue = this.value;

    // 使用 AJAX 請求新數據
    fetch(`/get_weather_chart_data?dataset=${selectedValue}`)
      .then(response => response.json())
      .then(data => {
        // 更新圖表標題
        chart.setTitle({ text: `資料集 ${selectedValue}` });

        // 清空現有的 series 和圖例
        chart.series.forEach(function(serie) {
          serie.remove();  // 移除所有系列
        });

        // 根據資料動態生成 series
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            // 為每一種類型的資料創建一個新的 series
            let series = chart.addSeries({
              name: key,  // 使用資料的鍵（如 price, volume, humidity）作為系列名稱
              data: data[key]  // 使用資料值作為 series 的數據
            });

            // 記錄每個 series 是否顯示在圖例中
            selectedLegends[key] = true; // 默認情況下全部顯示
          }
        }

        // 更新圖例顯示
        chart.series.forEach(function (serie) {
          // 根據 selectedLegends 設置是否顯示 series
          if (selectedLegends[serie.name] === false) {
            serie.setVisible(false); // 隱藏選中的系列
          }
        });

        // 確保圖例更新
        chart.legend.render();
      })
      .catch(error => console.error('Error:', error));
  });

  // 初始化時加載第一筆數據
  document.getElementById('weather_dataSelector').dispatchEvent(new Event('change'));

  // 監聽圖例點擊事件，保存選中的legend項目
  chart.legend.on('legendItemClick', function(event) {
    let seriesName = event.target.name;

    // 如果點擊的是顯示的圖例，則隱藏它
    if (event.target.visible) {
      selectedLegends[seriesName] = false; // 記錄這個系列應該隱藏
    } else {
      selectedLegends[seriesName] = true; // 記錄這個系列應該顯示
    }
  });
});
