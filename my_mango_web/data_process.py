import pandas as pd   

df = pd.read_csv(r'D:\mango_web\my_mango_web\data\mango_price.csv')
df = df[['date', 'price', 'volume']]

df.to_csv('mango_price.csv', index=False)