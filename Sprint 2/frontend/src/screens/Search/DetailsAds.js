import React, { useEffect, useState } from "react";
import { Text, Image, Dimensions, StyleSheet, ScrollView } from "react-native";
import { Pad, DetailsView, Container } from "../../components/style";
import { Button, ButtonText } from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import { db } from "../../services/firebase";
import InputEdit from "../../components/Input/InputEdit";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const DetailsAds = ({ navigation, route }) => {
  const [anuncios, setAnuncios] = useState(route.params);
  const [fabricante, setFabricante] = useState();
  const [desc_veiculo, setDescV] = useState();
  const [desc_marca, setDescM] = useState();
  const [ano_fabricacao, setAnoF] = useState();
  const [ano_modelo, setAno_Modelo] = useState();
  const [valor_veiculo, setPreco] = useState();
  const [cpf_anunciante, setCpf] = useState();
  const [Id, setId] = useState();

  
  //Rota de edição
  const Edinting = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/atualizar/anuncio/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fabricante,
        ano_fabricacao,
        ano_modelo,
        cpf_anunciante,
        desc_marca,
        desc_veiculo,
        fabricante,
        Id,
        valor_veiculo,
      }),
    });
    const anuncios = await res.json();

    setAnuncios(anuncios);
  };

  //Rota de pegar anuncio
  const getAnuncios = async () => {
    const res = await fetch(`http://127.0.0.1:5000/listar/anuncios`);
    const anuncios = await res.json();

    setAnuncios(anuncios);
    setFabricante(anuncios.fabricante)
    setDescV(anuncios.desc_veiculo)
    setDescM(anuncios.desc_marca)
    setId(anuncios.id)
    setAnoF(anuncios.ano_fabricacao)
    setAno_Modelo(anuncios.ano_modelo)
    setPreco(anuncios.valor_veiculo)
    setCpf(anuncios.cpf_anunciante)
  };

  return (
    <Container>
      <ScrollView>
        <StatusBar style="dark" />

        <Image style={pannel.image} source={anuncios.img} />

        <DetailsView>
          <Pad>
            <Text>Fabricante</Text>
            <InputEdit
              onChangeText={(fabricante) =>
                setFabricante({ ...anuncios, fabricante })
              }
              value={anuncios.fabricante}
            />
            <Text>Descrição do Veiculo</Text>
            <InputEdit
              onChangeText={(desc_veiculo) =>
                setDescV({ ...anuncios, desc_veiculo })
              }
              value={anuncios.desc_veiculo}
            />
            <Text>Descrição da Marca</Text>
            <InputEdit
              onChangeText={(desc_marca) =>
                setDescM({ ...anuncios, desc_marca })
              }
              value={anuncios.desc_marca}
            />
            <Text>Ano de Fabricação</Text>
            <InputEdit
              onChangeText={(ano_fabricacao) =>
                setAnoF({ ...anuncios, ano_fabricacao })
              }
              value={anuncios.ano_fabricacao}
            />
            <Text>Ano do Modelo</Text>
            <InputEdit
              onChangeText={(ano_modelo) =>
                setAno_Modelo({ ...anuncios, ano_modelo })
              }
              value={anuncios.ano_modelo}
            />
            <Text>Preço</Text>
            <InputEdit
              onChangeText={(valor_veiculo) =>
                setPreco({ ...anuncios, valor_veiculo })
              }
              value={anuncios.valor_veiculo}
            />
            <Text>CPF</Text>
            <InputEdit
              onChangeText={(cpf_anunciante) =>
                setCpf({ ...anuncios, cpf_anunciante })
              }
              value={anuncios.cpf_anunciante}
            />
              
            <Button title="Salvar" onPress={() => Edinting(anuncios.id)}>
              <ButtonText> Salvar</ButtonText>
            </Button>
            <Button title="Salvar" onPress={() => getAnuncios()}>
              <ButtonText>Liberar</ButtonText>
            </Button>
          </Pad>
        </DetailsView>
      </ScrollView>
    </Container>
  );
};

export default DetailsAds;

export const pannel = StyleSheet.create({
  image: {
    width: screenWidth,
    height: screenHeight / 3.0,
    resizeMode: "cover",
  },
});
