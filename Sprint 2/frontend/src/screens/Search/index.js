import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  View,
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";

import {
  BasicContainer,
  Item,
  ItemImage,
  ItemTitle,
  Container,
  ItemText,
  ContainerInfo,
  ContainerAnuncio,
} from "../../components/style";
import { SubTitle } from "../../components/styles";
import SearchInput from "../../components/Input/searchInput";
import { FlatList } from "react-native";
//import anuncios from "../../data/anuncios";
import { api } from "../../services/api";

const listTab = [
  {
    status: "All",
  },
  {
    status: "Preto",
  },
  {
    status: "Verde",
  },
];

const marcaList = [
  {
    status: "All",
  },
  {
    status: "Volkswagen",
  },
  {
    status: "Chevrolet",
  },
];

const Home = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [list, setList] = useState();
  const [status, setStatus] = useState("All");
  const [marca, setMarca] = useState("All");

  
  const setStatusFilter = (status) => {
    if (status !== "All") {
      setList([...list.filter((e) => e.color === status)]);
    } else {
      setList(list);
    }
    setStatus(status);
  };

  const setMarcaFilter = (status) => {
    if (status !== "All") {
      setList([...list.filter((e) => e.list === status)]);
    } else {
      setList(list);
    }
    setMarca(status);
  };

  const showDetails = (item) => {
    navigation.navigate("Details", { ...item });
  };

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
          value={searchText}
          onChangeText={(t) => setSearchText(t)}
          placeholder="Pesquisar"
          
        />
       
  

        <SafeAreaView style={styles.container}>
          <View style={styles.listTab}>
            {listTab.map((e) => (
              <TouchableOpacity
                onPress={() => setStatusFilter(e.status)}
                style={[
                  styles.btnTab,
                  status === e.status && styles.btnTabActive,
                ]}
              >
                <Text
                  style={
                    (styles.textTab,
                    status === e.status && styles.textTabActive)
                  }
                >
                  {e.status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>
        <SafeAreaView style={styles.container}>
          <View style={styles.listTab}>
            {marcaList.map((e) => (
              <TouchableOpacity
                onPress={() => setMarcaFilter(e.status)}
                style={[
                  styles.btnTab2,
                  marca === e.status && styles.btnTabActive2,
                ]}
              >
                <Text
                  style={
                    (styles.textTab2,
                    marca === e.status && styles.textTabActive2)
                  }
                >
                  {e.status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SafeAreaView>

        <SubTitle>Resultados...</SubTitle>

        <FlatList
          data={list}
          renderItem={({ item }) => (
            <Item onPress={() => showDetails(item)} key={item.id_user}>
              <ContainerInfo>
                <ItemTitle>{item.name}</ItemTitle>
              </ContainerInfo>
              <ItemImage source={item.img} />
              <ContainerAnuncio>
                <ItemText>por {item.by}</ItemText>
              </ContainerAnuncio>
            </Item>
          )}
        />
      </ScrollView>
    </BasicContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  listTab: {
    flexDirection: "row",
    marginTop: "20px",
    marginBottom: 20,
  },
  btnTab: {
    width: Dimensions.get("window").width / 3.8,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 10,
    justifyContent: "center",
  },
  btnTab2: {
    width: Dimensions.get("window").width / 3.8,
    flexDirection: "row",
    borderWidth: 0.5,
    borderColor: "#EBEBEB",
    padding: 10,
    justifyContent: "center",
  },
  textTab: {
    fontSize: 16,
  },
  textTab2: {
    fontSize: 16,
  },
  btnTabActive: {
    backgroundColor: "#3F37C9",
  },
  textTabActive: {
    color: "#fff",
  },
  btnTabActive2: {
    backgroundColor: "#3F37C9",
  },
  textTabActive2: {
    color: "#fff",
  },
});
