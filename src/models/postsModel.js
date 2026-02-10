import conectarAoBanco from "../config/DBconfig.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO_MONGODB);

export async function getTodosPosts() {
  const db = conexao.db("Imersão-BackEnd");
  const colecao = db.collection("posts");
  return colecao.find().toArray();
}

export async function createPost(novoPost){
  const db = conexao.db("Imersão-BackEnd");
  const colecao = db.collection("posts");
  return colecao.insertOne(novoPost);
}