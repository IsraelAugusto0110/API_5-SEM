import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableHighlight,
  ScrollView,
  TextInput,
} from "react-native";
import {
  DetailsHead,
  DetailsHeadView,
  DetailsPrice,
  DetailsProperties,
  Pad,
  DetailsView,
  DetailsValue,
  Description,
  Container,
  ItemText,
  Informations,
} from "../../components/style";
import { Button, ButtonText } from "../../components/styles";
import {
  setStatusBarNetworkActivityIndicatorVisible,
  StatusBar,
} from "expo-status-bar";
import { db } from "../../services/firebase";
import SearchInput from "../../components/Input/searchInput";
import InputEdit from "../../components/Input/InputEdit";

const screenWidth = Math.round(Dimensions.get("window").width);
const screenHeight = Math.round(Dimensions.get("window").height);

const DetailsAds = ({ navigation, route }) => {
  const [anuncios, setAnuncios] = useState(route.params);
  const [name, setName] = useState();
  const [by, setBy] = useState();
  const [price, setPrice] = useState();
  const [color, setColor] = useState();
  const [endereço, setEndereço] = useState();
  const [troca, setTroca] = useState();
  const [combustivel, setCombustivel] = useState();
  const [km, setKm] = useState();
  const [model, setModel] = useState();
  const [year, setYear] = useState();
  const [img, setImg] = useState();
  const [id, setId] = useState();

  const Edit = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/anuncio/${id}`);
    const anuncios = await res.json();

    setAnuncios(anuncios);

    setId(anuncios._id);
    setName(anuncios.name);
    setPrice(anuncios.price);
    setColor(anuncios.color);
    setEndereço(anuncios.endereço);
    setTroca(anuncios.troca);
    setCombustivel(anuncios.combustivel);
    setKm(anuncios.km);
  };

  const Edinting = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/anuncios/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        by,
        price,
        color,
        endereço,
        troca,
        combustivel,
        km,
        model,
        year,
        img,
      }),
    });

    const anuncios = await res.json();
  };

  return (
    <Container>
      <ScrollView>
        <StatusBar style="dark" />

        <Image style={pannel.image} source={anuncios.img} />

        <DetailsView>
          <Pad>
            <Text>Nome</Text>
            <InputEdit
              onChangeText={(name) => setAnuncios({ ...anuncios, name })}
              value={anuncios.name}
            />
            <Text>Preço</Text>
            <InputEdit
              onChangeText={(price) => setAnuncios({ ...anuncios, price })}
              value={anuncios.price}
            />
            <Text>Cor</Text>
            <InputEdit
              onChangeText={(color) => setAnuncios({ ...anuncios, color })}
              value={anuncios.color}
            />
            <Text>Endereço</Text>
            <InputEdit
              onChangeText={(endereço) =>
                setAnuncios({ ...anuncios, endereço })
              }
              value={anuncios.endereço}
            />
            <Text>Km</Text>
            <InputEdit
              onChangeText={(km) => setAnuncios({ ...anuncios, km })}
              value={anuncios.km}
            />
            <Text>Combustivel</Text>
            <InputEdit
              onChangeText={(combustivel) =>
                setAnuncios({ ...anuncios, combustivel })
              }
              value={anuncios.combustivel}
            />
            <Text>Troca</Text>
            <InputEdit
              onChangeText={(troca) => setAnuncios({ ...anuncios, troca })}
              value={anuncios.troca}
            />
            <Button title="Salvar" onPress={() => Edinting(anuncios._id)}>
              <ButtonText> Salvar</ButtonText>
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
