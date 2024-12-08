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
    fetch(`./data/mango_price_${selectedValue}.csv`)  // python是f'{}'  js是反引號`${}`  
      .then(response => response.text())   // 轉成文字檔
      .then(csvData => {
        // 將 CSV 轉換為 JSON
        const rows = csvData.trim().split('\n'); // 先以換行符分割每一行  ["date,price,volume", "2015-01,78.5,78.0", "2015-02,58.9,162.0"]
        const headers = rows[0].split(','); // 提取標題 ['date', 'price', 'volume']

        //slice跟python的 [1:]一樣  =>跟lambda很像 row是參數進去 直接回傳{}裡的東西
        const data = rows.slice(1).map(row => {
          const values = row.split(',');
          return {
            date: values[0],
            price: parseFloat(values[1]),
            volume: parseFloat(values[2]),
          };
        });


        // 更新圖表資料
        const prices = data.map(item => item.price);
        const volumes = data.map(item => item.volume);

        chart.series[0].setData(prices);  // 更新價格的資料
        chart.series[1].setData(volumes); // 更新交易量的資料
        chart.setTitle({ text: `資料集 ${selectedValue}` });  // 更新標題
      });

  });

  // 初始化時加載第一筆數據
  document.getElementById('dataSelector').dispatchEvent(new Event('change'));
})
