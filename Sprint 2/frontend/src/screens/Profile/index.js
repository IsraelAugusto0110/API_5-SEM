import React, { useContext, useEffect, useState } from "react";

import KeyboardAvoidingWrapper from "../../components/KeyboardAvoidingWrapper";
import {
  Container,
  InnerContainer,
  Logo,
  SubTitle,
  PageTitle,
  Button,
  ButtonText,
} from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import ImgLogo from "../../../assets/Logo.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CredentialsContext } from "../../context/credentials";
import apiUser from "../../services/apiUser";
import { View } from "react-native";

const Profile = () => {
  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);
  const { name, email } = storedCredentials;
  const [user, setUser] = useState([]);

  const clearLogin = () => {
    AsyncStorage.removeItem("bycarCredentials")
      .then(async () => {
        setStoredCredentials("");
        const result = await kitty.endSession();
        console.log(result);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    apiUser
      .listar()
      .then((res) => {
        console.log(res.data);
        setUser([res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <KeyboardAvoidingWrapper>
      <Container>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageTitle>Perfil</PageTitle>
          <SubTitle>{name}</SubTitle>
          <SubTitle>{email}</SubTitle>
          <Button onPress={clearLogin}>
            <ButtonText>SAIR</ButtonText>
          </Button>
          <View>
            <Text>Nome: {user.nome}</Text>
            <Text>Email: {user.email}</Text>
          </View>
        </InnerContainer>
      </Container>
    </KeyboardAvoidingWrapper>
  );
};

export default Profile;
