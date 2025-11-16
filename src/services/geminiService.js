import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const modelName = process.env.GEMINI_MODEL || "gemini-1.5-flash";

function getModel() {
  return genAI.getGenerativeModel({ model: modelName });
}

export async function listAvailableModels() {
  try {
    const res = await genAI.listModels();
    console.log("Available models:", res);
    return res;
  } catch (err) {
    console.error("Failed to list models:", err.message || err);
    throw err;
  }
}

export default async function generateDescriptionWithGemini(imageBuffer) {
  const prompt =
    "Generate a concise description in Brazilian Portuguese for the following image. Do not include any introduction, prefix, or preamble. Just provide the description directly.";

  try {
    console.log("🤖 Chamando Gemini...");
    console.log("📦 Modelo:", modelName);
    console.log("📸 Tamanho da imagem:", imageBuffer.length, "bytes");

    const model = getModel();
    const image = {
      inlineData: {
        data: imageBuffer.toString("base64"),
        mimeType: "image/png",
      },
    };

    console.log("⏳ Aguardando resposta do Gemini...");
    const response = await model.generateContent([prompt, image]);

    let description = response.response.text();

    // Remover prefixos comuns do Gemini
    description = description
      .replace(
        /^Aqui está uma descrição da imagem em português do Brasil:\s*/i,
        ""
      )
      .replace(/^Aqui está uma descrição:\s*/i, "")
      .replace(/^Descrição:\s*/i, "")
      .replace(/^Aqui está:\s*/i, "")
      .replace(/^A imagem mostra:\s*/i, "")
      .trim();

    console.log("✅ Descrição gerada:", description);

    return description || "Descrição não disponível.";
  } catch (error) {
    console.error("❌ Erro ao gerar descrição:", error.message || error);
    console.error("Detalhes do erro:", error);

    if (error && error.status === 404) {
      console.error(
        `Modelo \"${modelName}\" não encontrado ou não suporta generateContent.`
      );
    }

    if (error && error.status === 400) {
      console.error(
        "Erro 400: Verifique o formato da requisição e o tipo de arquivo."
      );
    }

    throw new Error(`Erro ao gerar descrição com Gemini: ${error.message}`);
  }
}

if (process.argv.includes("--list-models")) {
  // allow quick CLI: `node src/services/geminiService.js --list-models`
  listAvailableModels()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}
