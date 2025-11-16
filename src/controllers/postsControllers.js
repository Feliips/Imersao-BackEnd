import { getAllPosts, createPost, updatePost } from "../models/postsModel.js";
import fs from "fs";
import generateDescriptionWithGemini from "../services/geminiService.js";

export async function listPosts(req, res) {
  const posts = await getAllPosts();
  res.status(200).json(posts);
}

export async function createNewPost(req, res) {
  const newPost = req.body;
  try {
    const createdPost = await createPost(newPost);
    res.status(200).json(createdPost);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}

export async function uploadImage(req, res) {
  try {
    const newPost = {
      descricao: "",
      imgUrl: "",
      alt: "",
    };

    const createdPost = await createPost(newPost);
    const postId = createdPost.insertedId;
    const updatedImage = `uploads/${postId}.png`;
    fs.renameSync(req.file.path, updatedImage);

    // Construir URL correta para o arquivo
    const imageUrl = `http://localhost:3000/${postId}.png`;

    // Atualizar post com URL correta
    await updatePost(postId.toString(), { imgUrl: imageUrl });

    res.status(200).json({
      insertedId: postId,
      imgUrl: imageUrl,
      descricao: "",
      alt: "",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ Error: "Request failed" });
  }
}

export async function updatePostWithImage(req, res) {
  const id = req.params.id;
  const imageUrl = `http://localhost:3000/${id}.png`;

  try {
    console.log("📝 Atualizando post com ID:", id);

    const filePath = `uploads/${id}.png`;
    console.log("📂 Lendo arquivo:", filePath);

    if (!fs.existsSync(filePath)) {
      console.error("❌ Arquivo não encontrado:", filePath);
      return res
        .status(404)
        .json({ Error: "Arquivo de imagem não encontrado" });
    }

    const imgBuffer = fs.readFileSync(filePath);
    console.log("✅ Arquivo lido:", imgBuffer.length, "bytes");

    console.log("🤖 Gerando descrição com Gemini...");
    const description = await generateDescriptionWithGemini(imgBuffer);
    console.log("✅ Descrição gerada com sucesso");

    const post = {
      imgUrl: imageUrl,
      descricao: description,
      alt: req.body.alt || "Imagem",
    };

    const updatedPost = await updatePost(id, post);
    console.log("✅ Post atualizado no banco de dados");

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("❌ Erro ao atualizar post:", error.message);
    console.error("Stack trace:", error);
    res
      .status(500)
      .json({ Error: error.message || "Erro ao processar imagem" });
  }
}
