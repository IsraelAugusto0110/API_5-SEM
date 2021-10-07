import React, { useContext, useEffect, useState } from "react";
import { ButtonText, SubTitle } from "../../components/styles";
import { StatusBar } from "expo-status-bar";
import { Button, Icon } from "react-native-elements";
import {
  ItemImage,
  BasicContainer,
  Item,
  Container,
  ItemText,
  ItemTitle,
  ContainerAnuncio,
  ContainerInfo,
} from "../../components/style";
import SearchInput from "../../components/Input/searchInput";
import { Alert, FlatList, ScrollView, View } from "react-native";
//import meusAnuncios from "../../data/meusAnuncios";

const Ads = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const [list, setList] = useState();

  const showDetails = (item) => {
    navigation.navigate("DetailsAds", { ...item });
  };

  const confirmUserDeletion = async (id) => {
    Alert.alert("Excluir Usuário", "Deseja Excluir o usuário?", [
      {
        text: "Sim",
        onPress() {
          console.warn("delete" + list.name);
        },
      },
      {
        text: "Não",
      },
    ]);
  };
  const Deletion = async (id) => {
    const res = await fetch(`http://127.0.0.1:5000/anuncios/${id}`,{
    method: 'DELETE'
  })
  const anuncios = await res.json();


  }

  useEffect(() => {
    if (searchText === "") {
      setList(list);
    } else {
      setList(
        list.filter(
          (item) =>
            item.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        )
      );
    }
  }, [searchText]);

  const getAnuncios = async () => {
    const res = await fetch(`http://127.0.0.1:5000/anuncios`)
    const anuncios = await res.json();
    setList(anuncios)
  }

  useEffect(() => {
    getAnuncios();
  })

  return (
    <BasicContainer>
      <StatusBar style="dark" />
      <ScrollView>
       
        
            <SearchInput
              placeholder="Pesquisar"
              value={searchText}
              onChangeText={(t) => setSearchText(t)}
              //placeholderTextColor="#fff"
            />
            <SubTitle>Seus anuncios...</SubTitle>
            <FlatList
              data={list}
              renderItem={({ item }) => (
                <Item onPress={() => showDetails(item)} key={item.id_user}>
                  <ContainerInfo>
                    <ItemTitle>{item.name}</ItemTitle>
                  </ContainerInfo>

                  <ItemImage source={item.img} />
                  <ContainerAnuncio>
                    <Button
                      onPress={() => showDetails(item)}
                      type="clear"
                      icon={<Icon name="edit" size={25} color="#36343A" />}
                    />
                    <Button
                      onPress={() => Deletion(item._id)}
                      type="clear"
                      icon={<Icon name="delete" size={25} color="#36343A" />}
                    />
                  </ContainerAnuncio>
                </Item>
              )}
            />
      
       
      </ScrollView>
    </BasicContainer>
  );
};

export default Ads;
