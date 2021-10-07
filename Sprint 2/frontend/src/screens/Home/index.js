import React, { useContext, useState } from "react";
import {
  Container,
  InnerContainer,
  PageTitle,
  SubTitle,
  Button,
  ButtonText,
  Form,
  Input,
  MsgBox,
  ContainerStyle,
  InputSub,
} from "../../components/styles";
import { StatusBar } from "expo-status-bar";

import { CredentialsContext } from "../../context/credentials";

import { View, Text } from "react-native";

const Home = () => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const adm = true;
  const { name, email } = storedCredentials;
  const [doc, setDoc] = useState("");

  return (
    <Container>
      <StatusBar style="dark" />
      <PageTitle>Home</PageTitle>
      <SubTitle>Bem-Vindo, {name}</SubTitle>
      <View>
        <form //Rota do banco python
          action="http://127.0.0.1:5000/arquivos"
          method="POST"
          encType="multipart/form-data"
        >
          <input type="file" id="meuArquivo" name="meuArquivo" />

          <input type="submit" defaultValue="Submit" />
        </form>

        <Button>
          <ButtonText>UPLOAD ANUNCIOS</ButtonText>
        </Button>
        <Text>Arquivo: {doc}</Text>
        <MsgBox type={messageType}>{message}</MsgBox>
      </View>
    </Container>
  );
};

export default Home;
