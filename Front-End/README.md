# InstaBytes — Frontend

> Interface web moderna para a galeria InstaBytes com suporte a tema claro/escuro, drag-and-drop e integração com IA.

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Parcel](https://img.shields.io/badge/Parcel-21374C?style=for-the-badge&logo=parcel&logoColor=white)

</div>

---

## 📋 Índice

- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Funcionalidades](#-funcionalidades)
- [Configuração do Backend](#-configuração-do-backend)
- [Desenvolvimento](#-desenvolvimento)
- [Tecnologias](#-tecnologias)
- [Troubleshooting](#-troubleshooting)
- [Licença](#-licença)

---

## 📦 Instalação

### Pré-requisitos

- Node.js >= 14.0.0
- npm >= 6.0.0
- Backend (InstaBytes) rodando em `http://localhost:3000`

### Passos

```bash
# 1. Navegue até a pasta do Frontend
cd Front-End

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npm run dev
```

O frontend iniciará em **http://localhost:8000**

---

## 🚀 Como Usar

### Upload de Imagem

1. **Abra** http://localhost:8000 no navegador
2. **Arraste e solte** uma imagem na área de upload OU **clique** para selecionar
3. **Aguarde** a descrição ser gerada automaticamente pelo Gemini
4. **Veja** a imagem aparecer na galeria com descrição

### Visualizar Detalhes

- **Clique** em qualquer imagem na galeria para abrir em tamanho grande
- A **descrição gerada por IA** aparece junto
- Pressione **ESC** ou clique fora para fechar o modal

### Alternar Tema

- Clique no ícone **☀️ (sol)** para tema claro ou **🌙 (lua)** para tema escuro
- A preferência é **salva automaticamente** no navegador

---

## 📂 Estrutura de Arquivos

```
Front-End/
├── index.html                 # Página principal (HTML5 semântico)
├── assets/
│   ├── style.css              # Estilos CSS (tema claro/escuro)
│   ├── images/                # Imagens e ícones
│   └── js/
│       ├── index.js           # Gerenciador principal da galeria
│       ├── fetchApis.js       # Cliente HTTP para API
│       ├── themeToggle.js     # Controle de tema
│       └── uploadManager.js   # Sistema de upload com validação
├── package.json               # Dependências do projeto
└── README.md                  # Este arquivo
```

---

## ⭐ Funcionalidades

### Implementadas ✅

- **Upload com drag-and-drop** — Arraste imagens diretamente
- **Validação de arquivo** — Verifica tipo (PNG, JPG) e tamanho (máx 10MB)
- **Preview antes de enviar** — Veja a imagem antes de fazer upload
- **Galeria dinâmica** — Atualiza em tempo real após novo upload
- **Modal responsivo** — Visualize imagens em alta qualidade
- **Tema claro/escuro** — Toggle com persistência em localStorage
- **Contador de posts** — Exibe total de imagens na galeria
- **Loading states** — Feedback visual durante processamento
- **Tratamento de erros** — Mensagens claras ao usuário
- **Acessibilidade** — Semântica HTML, labels e alt-text
---

## 🔌 Configuração do Backend

### URL do Backend

O frontend espera o backend rodando em **http://localhost:3000** por padrão.

Se seu backend está em outra localização, atualize o arquivo `assets/js/fetchApis.js`:

```javascript
// Altere esta linha:
const API_URL = "http://localhost:3000"; // ← Mude para sua URL
```

### Verificar Conexão

Abra o DevTools (F12) e vá para **Console**. Se a conexão estiver OK, você verá logs como:

```
🌐 GET /posts → Status 200
✅ Imagens carregadas com sucesso
```

Se houver erro, verifique:

- Backend está rodando? (`npm run dev` na raiz do projeto)
- URL do backend está correta?
- CORS está configurado no backend?

---

## 💻 Desenvolvimento

### Comandos Disponíveis

```bash
# Inicia servidor de desenvolvimento com hot reload
npm run dev

# Build para produção (opcional)
# npx parcel build index.html
```

### Estrutura de Código

#### `index.js` — Gerenciador de Galeria

```javascript
// Carrega imagens do backend
async function displayImages() { ... }

// Adiciona interatividade ao modal
function addImageClickEvents() { ... }

// Atualiza contador de posts
function updatePostCount() { ... }
```

#### `uploadManager.js` — Sistema de Upload

```javascript
// Validação e preview
function handleFileSelect(file) { ... }

// Upload em duas etapas
async function uploadImage() { ... }

// Atualiza galeria após sucesso
dispatchEvent(new Event("imagesUpdated"))
```

#### `fetchApis.js` — Cliente HTTP

```javascript
// Buscar todos os posts
async function getPosts() { ... }

// Criar novo post
async function createPost(postData) { ... }

// Upload de imagem
async function uploadImage(formData) { ... }

// Atualizar post com descrição gerada
async function updatePost(postId, data) { ... }
```

#### `themeToggle.js` — Controle de Tema

```javascript
// Toggle entre tema claro/escuro
function toggleTheme() { ... }

// Persiste preferência
localStorage.setItem("theme", "light")
```

### CSS Customização

O arquivo `assets/style.css` usa variáveis CSS para fácil customização:

```css
:root {
  --bg-color: #0b0f14;         /* Fundo escuro */
  --text-primary: #e6eef6;     /* Texto principal */
  --accent: #6ee7b7;           /* Cor de destaque */
  --border-color: #1a2332;     /* Borda */
  --success-color: #10b981;    /* Verde de sucesso */
  --error-color: #ef4444;      /* Vermelho de erro */
}

body.light {
  --bg-color: #ffffff;         /* Alterna para claro */
  --text-primary: #1a1a1a;
  --accent: #5eead4;
  --border-color: #e5e7eb;
  /* ... */
}
```

---

## 🛠️ Stack Tecnológico

- **HTML5** — Semântica e acessibilidade
- **CSS3** — Flexbox, Grid, variáveis CSS
- **JavaScript ES6+** — Módulos, async/await
- **Parcel** — Bundler zero-config

---

## 📱 Responsividade

A interface é totalmente responsiva:

- **Desktop** (>868px) — 3 colunas de galeria
- **Tablet** (481-868px) — 2 colunas
- **Mobile** (<480px) — 1 coluna

---

## 🎨 Paleta de Cores

### Tema Escuro (padrão)

- Fundo: `#0b0f14`
- Texto: `#e6eef6`
- Destaque: `#6ee7b7`
- Borda: `#1a2332`

### Tema Claro

- Fundo: `#ffffff`
- Texto: `#1a1a1a`
- Destaque: `#5eead4`
- Borda: `#e5e7eb`

---

## 🐛 Troubleshooting

### "Não consigo enviar imagens"

1. Verifique se o **backend está rodando** (`npm run dev` na raiz)
2. Confirme a **URL do backend** em `fetchApis.js`
3. Abra **DevTools (F12)** → **Console** para ver erros
4. Verifique se há **erro de CORS** (deve estar configurado no backend)

### "Tema não persiste após recarregar"

- Limpe cache do navegador (Ctrl+Shift+Del)
- Verifique se localStorage está habilitado
- Confira se cookies/storage não estão bloqueados

### "As imagens não aparecem na galeria"

- Verifique no **MongoDB Atlas** se os registros foram criados
- Confira se o **Gemini API** foi chamado com sucesso (veja logs do backend)
- Abra DevTools → **Network** para ver se as requisições são bem-sucedidas

### "Modal não abre ao clicar na imagem"

- Verifique se JavaScript está habilitado no navegador
- Abra DevTools → **Console** para ver erros
- Confira se os event listeners estão funcionando

---

## 📄 Licença

MIT © 2025 InstaBytes

---

<div align="center">

**[🔙 Voltar para o README Principal](../README.md)**

_Última atualização: 16 de novembro de 2025_

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>
