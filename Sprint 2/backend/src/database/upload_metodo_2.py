import tkinter as tk
from IPython.display import display
from tkinter import filedialog
import pandas as pd
from pymongo import MongoClient


#conectando DB
client =  MongoClient("mongodb+srv://jsoeiro:1234@bycardb.lrp4p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
print('conectado com o banco')
db = client['dbycar']
collection = db['usuarios']

root = tk.Tk()
root.withdraw()

file_path = filedialog.askopenfilename()
print(file_path)

data = pd.read_csv(file_path)
data.reset_index(inplace=True)
data_dict = data.to_dict("records")
df = pd.DataFrame(data_dict)
display(df)
collection.insert_many(data_dict)
print('Upou caraio!')














 
