import React, { useContext, useState } from 'react';
import {
    Container,
    InnerContainer,
    PageTitle,
    SubTitle,
    Button,
    ButtonText,
    MsgBox
} from '../../components/styles';
import { StatusBar } from 'expo-status-bar';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { CredentialsContext } from '../../context/credentials';
import * as DocumentPicker from 'expo-document-picker';
import { api } from '../../services/api';
import { View, Text } from 'react-native'
import mime from "mime";

const Home = () => {
    const headers = { "Access-Control-Allow-Origin": "*" }
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();
    const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
    const adm = true
    const { name, email } = storedCredentials;
    const [doc, setDoc] = useState('');
    let formdata = new FormData;

    const openLibrary = async() => {
        try {
        const file = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: true,
          multiple: false,
          type: '*/*'
        });
  
        if (file.type === "success") {
          console.log(file);
          let formdata = new FormData;
          formdata.append('file',file)
          console.log(formdata)
          uploadFile(file)
        }
  
      } catch (err) {
        // Expo didn't build with iCloud, expo turtle fallback
        console.log("error", err);
  
      }
    }
    


    function uploadFile(formdata) {
        
        api
            .post(`/create`, {'file':formdata.name, 'path':formdata.uri}, { headers: headers })
            .then((response) => {
                const { message, status, data } = response;
                if (data.upload === 'FAILED') {
                    handleMessage('Arquivo Inválido');
                }
                else {
                    handleMessage('Upload Concluído', 'SUCCESS');
                }
            })
            .catch(error => {
                console.log(error)
                handleMessage('Ocorreu um erro. Verifique sua internet e tente novamente')
            })
    }


    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    return (
        <KeyboardAvoidingWrapper>
            <Container>
                <StatusBar style='dark' />
                <InnerContainer>
                    <PageTitle>Home</PageTitle>
                    <SubTitle>Bem-Vindo, {name}</SubTitle>
                    <View>
                        {adm === true ?
                            (
                                <Button
                                    onPress={openLibrary}>
                                    <ButtonText>
                                        UPLOAD USUARIOS
                                    </ButtonText>
                                </Button>
                            ) :
                            (
                                <Button
                                    onPress={async () => await openLibrary()}>
                                    <ButtonText>
                                        UPLOAD ANUNCIOS
                                    </ButtonText>
                                </Button>
                            )}

                        <Text>Arquivo: {doc}</Text>
                        <MsgBox type={messageType} >{message}</MsgBox>
                        <Button
                            onPress={()=>uploadFile(formdata)}>
                            <ButtonText>
                                Enviar
                            </ButtonText>
                        </Button>
                    </View>
                </InnerContainer>
            </Container>
        </KeyboardAvoidingWrapper>

    );
}

export default Home;