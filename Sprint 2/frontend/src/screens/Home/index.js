import React, { useContext, useState } from "react";
import {
  Container,
  SubTitle,
  Button,
  ButtonText,
} from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import { CredentialsContext } from "../../context/credentials";
import { View } from "react-native";
import Header from "../../components/header";
import { HeadContainer } from "../../components/style";
import ListaHorizontal from "../../components/FlatList/ListaHorizontal";
import Anuncios from "../../data/anuncios";

const Home = () => {
  const [list, setList] = useState(Anuncios);
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const adm = true;
  const { name, email, cpf} = storedCredentials;

  return (
    <HeadContainer>
      <Header />
      <Container>
        <StatusBar style="dark" />

        <SubTitle>Bem-vindo, {cpf}</SubTitle>
        <View>
     
        <form //Rota do banco python
            action="http://127.0.0.1:5000/create/anuncio"
            method="POST"
            encType="multipart/form-data"
          >
            <input type="file" id="anuncio" name="anuncio" />
            <input type="submit" defaultValue="Submit" />
          </form>


          <Button>
            <ButtonText>UPLOAD ANUNCIOS</ButtonText>
          </Button>
        </View>
      </Container>
    </HeadContainer>
  );
};

export default Home;
