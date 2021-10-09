from flask import Flask
import pandas as pd
from bson.json_util import dumps
import random
import string
from flask import jsonify, request
import smtplib
from flask import Flask, request
from flask_pymongo import PyMongo


app = Flask(__name__)

app.config['MONGO_URI'] = 'mongodb+srv://jsoeiro:1234@bycardb.lrp4p.mongodb.net/dbycar' #conexao com o mongo 
mongo = PyMongo(app)

class Cadastro:    
    def sender_email(email, senha):
        SUBJECT = "Cadastro realizado com sucesso!!!"
        TO = email
        FROM = "contato.bycar@gmail.com"
        PASSWORD = "@bycarApp2021"
        text = "Tenha seu primeiro acesso usando essa senha:"f"{senha}"
        BODY = "\r\n".join((
        f"From: {FROM}",
        f"To: {TO}",
        f"Subject: {SUBJECT}",
        "",
        text))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(FROM, PASSWORD)
        print("Login funfou")
        server.sendmail(FROM, TO, BODY)
        print("Email enviado para", TO)
        server.quit()

        return "200"

    def sender_email_1(email, senha):
        SUBJECT = "Redefinição de senha"
        TO = email
        FROM = "contato.bycar@gmail.com"
        PASSWORD = "@bycarApp2021"
        text = "SENHA:"f"{senha}"
        BODY = "\r\n".join((
        f"From: {FROM}",
        f"To: {TO}",
        f"Subject: {SUBJECT}",
        "",
        text))

        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(FROM, PASSWORD)
        print("Login funfou")
        server.sendmail(FROM, TO, BODY)
        print("Email enviado para", TO)
        server.quit()

        
data = 1
        
@app.route('/create/user', methods=['POST'])
def create():
    if 'arq_do_cara' in request.files: 
        arquivo = request.files['arq_do_cara']     
        df = pd.read_csv(arquivo)
        data = df.to_dict(orient="records")
        cod = 6

        df['id'] = 0
        df['senha'] = 0
        df['status'] = 0
        df['cod'] = 0
        df['atividade'] = 1
        df.reset_index(inplace=True)
        x=0
        df = pd.DataFrame(data)
        while x < (len(data)):
            data[x]['id'] = mongo.db.usuarios.count()
            data[x]['senha'] = ''.join(random.choice(string.digits) for x in range(cod))
            mongo.db.usuarios.insert_one(data[x])
            x+=1       
            b = 0
        while b < (len(data)):
            email = data[b]['email']
            senha = data[b]['senha']
            b+=1
            Cadastro.sender_email(email, senha)
            return 'Arquivo enviado com sucesso!'


    
#lista todos os usuarios
@app.route('/listar/usuarios', methods = ["GET"])
def users():
    users = mongo.db.usuarios.find({})
    resp = dumps(users)
    return resp

#lista usuario por id
@app.route('/listar/usuario/<id>', methods = ["GET"])
def user(id):
    users = mongo.db.usuarios.find({'id':int(id)})
    resp = dumps(users)
    return resp

#atualiza usuario
@app.route('/atualizar/usuario/<id>', methods=["PUT"])
def update_user(id):
    _json = request.json
    _nome = _json['nome']
    _cpf = _json['cpf']
    _email = _json['email']
    _telefone = _json['telefone']
    _endereco = _json['endereco']
    _senha = _json['senha']
    _status = _json['status']
    _cod = _json['cod']
    _atividade = _json['atividade']
    mongo.db.usuarios.find_one_and_update(
        {'id':int(id)}, {"$set":{
                                'nome' : _nome,
                                'cpf': _cpf, 
                                'email': _email,
                                'telefone': _telefone,
                                'endereco': _endereco,
                                'senha': _senha,
                                'status': _status,
                                'cod': _cod,
                                'atividade': _atividade}})

#exclui usuario
@app.route('/deletar/usuario/<id>', methods=["PUT"])
def delete_user(id):
    _json = request.json
    _atividade = _json['atividade']
    mongo.db.usuarios.find_one_and_update(
        {'id':int(id)}, {"$set":{'atividade': _atividade}})
    resp = jsonify("usuario atualizado")
    return resp

#login
@app.route('/login', methods = ["POST"])
def login_user():

    _json = request.json
    _email = _json['email']
    _senha = _json['senha']

    find_user = mongo.db.usuarios.find({'email' : _email, 'senha' : _senha})
    not_found = jsonify("usuario não encontrado")
    resp = dumps(find_user)

    if (len(resp)) > 2:
        return resp
    else:
        return not_found

#atualiza senha
@app.route('/updatesenha/<id>', methods=["PUT"])
def update_senha(id):
    _json = request.json
    _senha = _json['senha']
    mongo.db.usuarios.find_one_and_update(
        {'id':int(id)}, {"$set":{'senha': _senha}})
    resp = jsonify("senha atualizada com sucesso")
    return resp


#esqueceu a senha
@app.route('/redefinesenha', methods = ["POST"])
def redefine_senha():

    _json = request.json
    _email = _json['email']

    cod = 6 
    find_user = mongo.db.usuarios.find({'email' : _email})
    not_found = jsonify("usuario não existe")
    resp = dumps(find_user)
    if (len(resp)) > 2:
        senha = ''.join(random.choice(string.digits) for x in range(cod))
        mongo.db.usuarios.find_one_and_update({'email' : _email}, {"$set":{'senha': senha}})
        Cadastro.sender_email_1(email, senha)
        return resp
    else:
        return not_found

#--------------------------------------------anuncio-----------------------------------------------------#


@app.route('/create/anuncio', methods=['POST'])
def create_anuncio():
    if 'anuncio' in request.files:
        anuncio = request.files['anuncio']     
        dfa = pd.read_csv(anuncio)
        data_anuncio = dfa.to_dict(orient="records")
        z=0
        dfa['id'] = 0
        x=0
        dfa = pd.DataFrame(data) 
        while z < (len(data)):
            data_anuncio[z]['id'] = mongo.db.anuncios.count()
            mongo.db.anuncios.insert_one(data_anuncio[x])
            x+=1     
    return 'Arquivo enviado com sucesso!'

#lista todos os anuncios
@app.route('/listar/anuncios', methods = ["GET"])
def lista_anuncio():
    anuncios = mongo.db.anuncios.find({})
    resp = dumps(anuncios)
    return resp

#lista anuncio por cpf do usuario
@app.route('/listar/anuncio/<id>', methods = ["GET"])
def anuncio(cpf):
    anuncios = mongo.db.anuncios.find({'cpf_anunciante':int(cpf)})
    resp = dumps(anuncios)
    return resp

#exclui anuncio
@app.route('/anuncios/<id>', methods=['DELETE'])
def deleteAnuncios(id):
    mongo.db.delete_one({'id':int(id)})
    return jsonify({'message': 'Anuncio excluido'})

@app.route('/atualizar/anuncio/<id>', methods=["PUT"])
def update_anuncio(id):
    _json = request.json
    _fabricante = _json['fabricante']
    _desc_marca = _json['desc_marca']
    _desc_veiculo = _json['desc_veiculo']
    _cod_anunciante = _json['cod_anunciante']
    _ano_fabricacao = _json['ano_fabricacao']
    _ano_modelo = _json['ano_modelo']
    _cpf_anunciante = _json['cpf_anunciante']
    _valor_veiculo = _json['valor_veiculo']

    mongo.db.usuarios.find_one_and_update(
        {'id':int(id)}, {"$set":{
                                'fabricante' : _fabricante,
                                'desc_marca': _desc_marca, 
                                'desc_veiculo': _desc_veiculo,
                                'cod_anunciante': _cod_anunciante,
                                'ano_fabricacao': _ano_fabricacao,
                                'ano_modelo': _ano_modelo,
                                'cpf_anunciante': _cpf_anunciante,
                                'valor_veiculo': _valor_veiculo}})


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8080, debug=True)