import axios from "axios";
import api from "./api";

const pegarid = (id) => {
  return api.get("/listar/usuario/<id>");
};

const criar = (body) => {
  return api.post("/novo", body);
};

const listar = () => {
  return api.get("/listar/usuarios");
};

const deletar = (id) => {
  return api.delete("/deletar/usuario/<id>");
};

const atualizar = (body) => {
  return api.put("/atualizar/usuario/<id>", body);
};
const apiUser = {
  pegarid,
  criar,
  listar,
  deletar,
  atualizar,
};

export default apiUser;
