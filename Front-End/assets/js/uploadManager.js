// Upload Manager - Gerencia upload de imagens e geração de descrições com Gemini

export class UploadManager {
  constructor() {
    this.dropZone = document.getElementById("dropZone");
    this.imageInput = document.getElementById("imageInput");
    this.preview = document.getElementById("preview");
    this.previewImg = document.getElementById("previewImg");
    this.uploadBtn = document.getElementById("uploadBtn");
    this.cancelBtn = document.getElementById("cancelBtn");
    this.uploadStatus = document.getElementById("uploadStatus");

    this.selectedFile = null;
    this.init();
  }

  init() {
    // Drag and drop
    this.dropZone.addEventListener("dragover", (e) => this.handleDragOver(e));
    this.dropZone.addEventListener("dragleave", (e) => this.handleDragLeave(e));
    this.dropZone.addEventListener("drop", (e) => this.handleDrop(e));

    // File input
    this.imageInput.addEventListener("change", (e) => this.handleFileSelect(e));

    // Buttons
    this.uploadBtn.addEventListener("click", () => this.uploadImage());
    this.cancelBtn.addEventListener("click", () => this.cancelUpload());
  }

  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dropZone.classList.add("dragover");
  }

  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dropZone.classList.remove("dragover");
  }

  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    this.dropZone.classList.remove("dragover");

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      this.handleFileSelect({ target: { files } });
    }
  }

  handleFileSelect(e) {
    const files = e.target.files;
    if (files.length === 0) return;

    const file = files[0];

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      this.showStatus("❌ Por favor, selecione uma imagem válida", "error");
      return;
    }

    // Validar tamanho (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      this.showStatus("❌ A imagem não pode ultrapassar 10MB", "error");
      return;
    }

    this.selectedFile = file;
    this.showPreview(file);
  }

  showPreview(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewImg.src = e.target.result;
      this.preview.style.display = "flex";
      this.dropZone.style.display = "none";
      this.uploadStatus.innerHTML = "";
    };
    reader.readAsDataURL(file);
  }

  cancelUpload() {
    this.selectedFile = null;
    this.preview.style.display = "none";
    this.dropZone.style.display = "flex";
    this.imageInput.value = "";
    this.uploadStatus.innerHTML = "";
  }

  async uploadImage() {
    if (!this.selectedFile) {
      this.showStatus("❌ Nenhuma imagem selecionada", "error");
      return;
    }

    this.showStatus("⏳ Enviando imagem...", "loading");
    this.uploadBtn.disabled = true;

    try {
      // Passo 1: Upload da imagem
      const formData = new FormData();
      formData.append("imagem", this.selectedFile);

      const uploadResponse = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Erro no upload: ${uploadResponse.status}`);
      }

      const uploadedPost = await uploadResponse.json();
      const postId = uploadedPost.insertedId;

      console.log("✅ Imagem enviada:", uploadedPost);

      this.showStatus("⏳ Gerando descrição com IA (Gemini)...", "loading");

      // Passo 2: Gerar descrição com Gemini
      const descResponse = await fetch(
        `http://localhost:3000/upload/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            alt: this.selectedFile.name || "Imagem enviada",
          }),
        }
      );

      if (!descResponse.ok) {
        throw new Error(`Erro ao gerar descrição: ${descResponse.status}`);
      }

      const finalPost = await descResponse.json();
      console.log("✅ Descrição gerada:", finalPost);

      this.showStatus(
        "✅ Imagem enviada e descrição gerada com sucesso! Recarregando galeria...",
        "success"
      );

      // Aguardar 2 segundos e recarregar a galeria
      setTimeout(() => {
        this.cancelUpload();
        // Disparar evento para recarregar galeria
        window.dispatchEvent(new Event("imagesUpdated"));
      }, 2000);
    } catch (error) {
      console.error("❌ Erro durante upload:", error);
      this.showStatus(
        `❌ Erro: ${error.message}. Verifique o console para mais detalhes.`,
        "error"
      );
    } finally {
      this.uploadBtn.disabled = false;
    }
  }

  showStatus(message, type) {
    this.uploadStatus.textContent = message;
    this.uploadStatus.className = `upload-status ${type}`;
  }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
  new UploadManager();
});
