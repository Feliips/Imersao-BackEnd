import fetchImages from "./fetchApis";

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("caption");
const modalClose = document.querySelector(".modal-close");
const imageGrid = document.getElementById("image-grid");

console.log("✅ DOM Elements carregados", {
  modal,
  imageGrid,
  modalClose,
});

// Atualizar contador de posts
async function updatePostCount() {
  try {
    const response = await fetch("http://localhost:3000/posts");
    const data = await response.json();
    console.log("📊 Posts contados:", data.length);
    const postCountElement = document.getElementById("post-count");
    if (postCountElement) {
      postCountElement.textContent = data.length || 0;
    }
  } catch (error) {
    console.error("❌ Erro ao obter contagem de posts:", error);
  }
}

// Função para buscar e exibir os dados do endpoint
async function displayImages() {
  console.log("🔄 Buscando imagens...");
  const data = await fetchImages();
  console.log("📸 Dados retornados pela API:", data);

  try {
    if (!data || data.length === 0) {
      console.warn("⚠️ Nenhuma imagem retornada pela API");
      imageGrid.innerHTML =
        '<p style="color: var(--text-muted);">Nenhuma imagem disponível. Envie uma imagem para começar!</p>';
      return;
    }

    const postsList = data
      .map((item) => {
        console.log("🖼️ Item do post:", item);

        // Garantir que imgUrl contenha URL completa
        let imgUrl = item.imgUrl;
        if (!imgUrl.startsWith("http")) {
          imgUrl = `http://localhost:3000/${imgUrl}`;
          console.log("⚠️ URL corrigida:", imgUrl);
        }

        return `
        <article data-description="${item.descricao}">
          <figure>
            <img src="${imgUrl}" alt="${item.alt}" />
          </figure>
        </article>
      `;
      })
      .join("");
    imageGrid.insertAdjacentHTML("beforeend", postsList);
    console.log("✅ Imagens inseridas no DOM");

    // Adicionando eventos de clique para cada imagem carregada
    addImageClickEvents();
    updatePostCount();
  } catch (error) {
    console.error("❌ Erro ao popular página:", error);
  }
}

// Função para adicionar os eventos de clique às imagens
function addImageClickEvents() {
  const images = document.querySelectorAll(".image-grid img");
  images.forEach((img) => {
    img.addEventListener("click", function () {
      modal.style.display = "flex";
      modalImg.src = this.src;

      const article = this.closest("article");
      const description = article ? article.dataset.description : "";
      const caption = description || this.alt;

      captionText.innerHTML = `<p>${caption}</p>`;
    });
  });
}

// Função para fechar o modal
function closeModal() {
  modal.style.display = "none";
  captionText.textContent = "";
}

// Evento de fechar o modal ao clicar no botão X
modalClose.addEventListener("click", closeModal);

// Fechar o modal clicando fora dele
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Fechar modal com tecla ESC
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});

// Chamar a função para buscar e exibir as imagens ao carregar a página
document.addEventListener("DOMContentLoaded", displayImages);

// Listener para quando novas imagens são enviadas
window.addEventListener("imagesUpdated", () => {
  console.log("🔄 Recarregando galeria após novo upload...");
  imageGrid.innerHTML = ""; // Limpar galeria
  displayImages(); // Recarregar
});
