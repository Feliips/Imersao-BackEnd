// Função para buscar os dados do endpoint
export default async function fetchImages() {
  try {
    console.log("🌐 Chamando API em: http://localhost:3000/posts");
    const response = await fetch("http://localhost:3000/posts");

    if (!response.ok) {
      console.error("❌ API retornou status:", response.status);
      return [];
    }

    const data = await response.json();
    console.log("✅ Dados recebidos da API:", data);
    return data;
  } catch (error) {
    console.error("❌ Erro ao buscar dados da API:", error);
    return [];
  }
}
