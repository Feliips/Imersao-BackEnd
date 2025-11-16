import conectarAoBanco from "../config/DBconfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO_MONGODB);

export default async function getTodosPosts() {
  const db = conexao.db("Imersão-BackEnd");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}
