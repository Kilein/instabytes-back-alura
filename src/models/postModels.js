import 'dotenv/config';
import { ObjectId } from "bson";
import conectarAoBanco from "../config/dbConfig.js";
// **Conecta ao banco de dados:** Esta linha importa a função `conectarAoBanco` que provavelmente está definida em `dbConfig.js`. Essa função estabelece a conexão com o banco de dados.
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// **Função assíncrona para buscar todos os posts:**
export async function getTodosPosts() {
    // **Obtém o banco de dados 'imersao-instabytes':**
    const db = conexao.db("imersao-instabytes")
    // **Obtém a coleção 'posts' dentro do banco de dados:**
    const colecao = db.collection("posts")
    // **Executa a consulta para buscar todos os documentos da coleção e retorna um array:**
    return colecao.find().toArray()
};

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts")
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});
}

