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
import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import { CredentialsContext } from "../../context/credentials";
import * as DocumentPicker from "expo-document-picker";
import { api } from "../../services/api";
import { View, Text } from "react-native";
import { useForm } from "react-hook-form";

const Home = () => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const adm = true;
  const { name, email } = storedCredentials;
  const [doc, setDoc] = useState("");
  let formdata = new FormData();
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  const onSubmit = (data) => {
    console.log(data);
  };

  const openLibrary = async () => {
    setMessage(null);
    setDoc(null);
    const response = await DocumentPicker.getDocumentAsync();
    if (response.type === "success") {
      setDoc(response.name);
      console.log(response);
      formdata.append("file", response.uri);
      console.log(formdata);
      uploadFile();
    }
  };

  function uploadFile() {
    api
      .post(`/create`, formdata)
      .then((response) => {
        const { message, status, data } = response;
        if (data.upload === "FAILED") {
          handleMessage("Arquivo Inválido");
        } else {
          handleMessage("Upload Concluído", "SUCCESS");
        }
      })
      .catch((error) => {
        console.log(error);
        handleMessage(
          "Ocorreu um erro. Verifique sua internet e tente novamente"
        );
      });
  }

  const handleMessage = (message, type = "FAILED") => {
    setMessage(message);
    setMessageType(type);
  };

  return (
    <Container>
      <StatusBar style="dark" />
      <PageTitle>Home</PageTitle>
      <SubTitle>Bem-Vindo, {name}</SubTitle>
      <View>
        <form     //Rota do banco python
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
