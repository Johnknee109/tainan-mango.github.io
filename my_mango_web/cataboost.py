import xgboost as xgb
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error
import pandas as pd


# 載入資料
weather_df = pd.read_csv(r'D:\mango_web\my_mango_web\data\臺南.csv')
mango_df = pd.read_csv(r'D:\mango_web\my_mango_web\data\mango_price.csv')

# 刪除不需要的欄位
unimportant = ['index', 'StationName', 'YearMonth', 'AirTemperature_MaximumDate', 
               'AirTemperature_MinimumDate', 'WindSpeed_MaximumDate', 
               'PeakGustSpeed_MaximumDate', 'RelativeHumidity_MinimumDate']
weather_df = weather_df.drop(columns=unimportant)
mango_df = mango_df.drop(columns=['date'])

# 合併資料
df = pd.concat([weather_df, mango_df], axis=1)

# 特徵和標籤
X = df.drop(columns=['price'])
Y = df['price']

# 資料分割
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.1,random_state=42)

# 初始化 XGBoost 回歸模型
# model = xgb.XGBRegressor(
#     n_estimators=100,      # 樹的數量 100
#     learning_rate=0.1,     # 學習率
#     max_depth=6,           # 樹的深度 6
#     objective='reg:squarederror',  # 回歸任務
#     verbosity=0            # 訓練過程中不顯示訊息
# )

#隨機森林
model = RandomForestRegressor(n_estimators=100, random_state=42)

#線性回歸
# model = LinearRegression()


# 訓練模型
model.fit(X_train, y_train)

# 預測
y_pred = model.predict(X_test)

# 計算 MSE
mse = mean_squared_error(y_test, y_pred)
print(f"Mean Squared Error (MSE): {mse:.2f}")

# 計算 RMSE
rmse = mse**0.5
print(f"Root Mean Squared Error (RMSE): {rmse:.2f}")
