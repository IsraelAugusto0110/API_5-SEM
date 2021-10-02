from flask import Flask, request
from IPython.display import display
import pandas as pd
from pymongo import MongoClient



app = Flask(__name__)


#conectando DB
client =  MongoClient("mongodb+srv://jsoeiro:1234@bycardb.lrp4p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
print('conectado com o banco')
db = client['dbycar']
collection = db['usuarios']


@app.route('/delete', methods=['DELETE'])
def delete():
    mongo.usuarios.find_one_and_delete({'email' : 'joaovitorsoeiro@gmail.com'})
    return '<h1>Usuário removido!</h1>'

@app.route('/')
def index():
    return '''
        <form method="POST" action="/create" enctype="multipart/form-data">
            <input type="text" name="usuario que upou">
            <input type="file" name="arquivo_do_cara">
            <input type="submit">
        </form>
    '''


@app.route('/create', methods=['POST'])
def create():
    if 'arquivo_do_cara' in request.files:
        arquivo_do_cara = request.files['arquivo_do_cara']
        data = pd.read_csv(arquivo_do_cara)
        data.reset_index(inplace=True)
        data_dict = data.to_dict("records")
        df = pd.DataFrame(data_dict)
        display(df) #mostrando os dados do arquivo
        collection.insert_many(data_dict)

    return 'Arquivo enviado com sucesso!'

#rota que devolve o arquivo do cara
@app.route('/file/<arquivo_do_cara>')
def file(arquivo_do_cara):
   return mongo.send_file(arquivo_do_cara)

app.run(host='0.0.0.0')