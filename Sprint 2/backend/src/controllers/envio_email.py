import smtplib

class Email:
    
    def email_cadastro(a, c):
        SUBJECT = "Cadastro realizado com sucesso!!!"
        TO = a
        FROM = "contato.bycar@gmail.com"
        PASSWORD = "@bycarApp2021"
        text = f"SENHA TEMPORÁRIA: {c}"
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

    def email_redefinicao(a):

        SUBJECT = "Solicitação de redefinição de senha aceita"
        TO = a
        print(a)
        FROM = "contato.bycar@gmail.com"
        PASSWORD = "@bycarApp2021"
        text = "use esse código para redefinir sua senha"
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






