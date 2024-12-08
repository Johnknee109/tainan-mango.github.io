from flask import Flask, render_template, json, jsonify, request
import pandas as pd  # 使用 pandas 讀取 CSV
import os 

app = Flask(__name__)

@app.route('/')
def index():
    # 讀取 CSV 資料
    path = './data/mango_2015.csv'
    df = pd.read_csv(path)
    
    # 將 CSV 資料轉換為列表，每個元素都是 [日期, 價格, 交易量]
    year = os.path.basename(path).rsplit('_')[1].replace('.csv','')
    date = f'{year}'
    date = str(date)
    price = list(df['price'])
    volume = list(df['volume'])

    # 傳遞資料給前端
    return render_template('my_index_4.html', date=date, price=price, volume=volume )


# ajax的  芒果的
@app.route('/get_chart_data')
def get_chart_data():
    dataset = request.args.get('dataset')
    # print(dataset)
    if not dataset:
        return jsonify({"error": "No dataset specified"}), 400
    
    df = pd.read_csv(r'D:\mango_web\my_mango_web\static\mango_price.csv')

    
    data = {}
    
    # 先初始化 不然直接填值會有bug
    for i in range(2015,2024):
        data[str(i)] = {"price":[],"volume":[]}
    
    for _, row in df.iterrows():
        year = str(row['date']).split('-')[0]  # 提取年份
        if year == '2024':continue
        price = float(row['price'])  # 價格
        volume = float(row['volume'])  # 交易量
        
        data[year]["price"].append(price)
        data[year]["volume"].append(volume)
    

    if dataset not in data:
        return jsonify({"error": "Dataset not found"}), 404

    return jsonify(data[dataset])



# ajax的  天氣的
@app.route('/get_weather_chart_data')
def get_weather_chart_data():
    dataset = request.args.get('dataset')
    # print(dataset)
    if not dataset:
        return jsonify({"error": "No dataset specified"}), 400
    
    df = pd.read_csv(r'D:\mango_web\my_mango_web\static\臺南.csv')
    data = {}
    
    # 刪除不需要的欄位
    unimportant = ['index', 'StationName', 'Month', 'AirTemperature_MaximumDate', 
               'AirTemperature_MinimumDate', 'WindSpeed_MaximumDate', 
               'PeakGustSpeed_MaximumDate', 'RelativeHumidity_MinimumDate']
    df = df.drop(columns=unimportant)
    
    
    # 先初始化 不然直接填值會有bug
    for i in range(2015,2024):
        data[str(i)] = {}
        for name in df.columns:
            if name =='YearMonth':continue
            data[str(i)].update({name:[]})
    
    
    for _, row in df.iterrows():
        year = str(row['YearMonth']).split('-')[0]  # 提取年份
        if year == '2024':continue

        for name in df.columns:
            if name == 'YearMonth':continue
            data[year][name].append(row[name])
    

    if dataset not in data:
        return jsonify({"error": "Dataset not found"}), 404

    return jsonify(data[dataset])





if __name__ == '__main__':
    app.run(debug=True)
    # app.run(host='0.0.0.0', port=5000)
