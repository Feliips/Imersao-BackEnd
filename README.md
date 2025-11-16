# InstaBytes — Galeria com Descrições Geradas por IA

<div align="center">

![license](https://img.shields.io/badge/license-MIT-blue?style=for-the-badge)
![node](https://img.shields.io/badge/node-%3E%3D14.0.0-green?style=for-the-badge)
![npm](https://img.shields.io/badge/npm-%3E%3D6.0.0-red?style=for-the-badge)
![status](https://img.shields.io/badge/status-completo-brightgreen?style=for-the-badge)
![build](https://img.shields.io/badge/build-passing-brightgreen?style=for-the-badge)
![version](https://img.shields.io/badge/version-1.0.0-blue?style=for-the-badge)

</div>

> Uma galeria de imagens moderna com descrições geradas automaticamente usando **Google Generative AI (Gemini)**. Projeto desenvolvido durante a Imersão BackEnd - Alura.

<div align="center">

**[🇧🇷 Português](#português) | [🇺🇸 English](#english)**

</div>

---

## 📋 Índice

- [Descrição](#-descrição)
- [Status](#-status)
- [Funcionalidades](#-funcionalidades)
- [Demonstração](#-demonstração)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Endpoints da API](#-endpoints-da-api)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Contribuição](#-contribuição)
- [Licença](#-licença)

---

## 📖 Descrição

**InstaBytes** é uma galeria de imagens moderna construída com Node.js, Express e MongoDB. O projeto permite fazer upload de imagens que são armazenadas em um banco de dados NoSQL, com descrições geradas automaticamente pela API Gemini do Google em português brasileiro.

### Características principais:

-  Upload de múltiplas imagens com drag-and-drop
-  Geração automática de descrições com IA (Gemini)
-  Interface escura/clara com tema personalizável
-  Armazenamento robusto em MongoDB
-  Design responsivo e minimalista
-  API REST completa com CRUD
-  Segurança com variáveis de ambiente
-  Contador de posts em tempo real

---

## ⭐ Funcionalidades

- [x] **Upload de imagens** - Drag-and-drop ou seleção manual
- [x] **Geração automática de descrições** - Usando Google Gemini API
- [x] **CRUD completo** - Criar, ler, atualizar e deletar posts
- [x] **Armazenamento seguro** - MongoDB Atlas
- [x] **API REST** - Endpoints bem documentados
- [x] **Frontend profissional** - HTML/CSS/JavaScript moderno
- [x] **Tema escuro/claro** - Toggle persistente com localStorage
- [x] **Modal responsivo** - Visualização de imagens em alta qualidade
- [x] **Validação de arquivos** - Tipo e tamanho (máx 10MB)
- [x] **Contador de posts** - Estatísticas em tempo real

---

## 🖼️ Demonstração

### Interface Principal da Galeria

A interface do InstaBytes em tema escuro mostrando a experiência completa:

<div align="center">

![InstaBytes Gallery Interface](./assets/Captura%20de%20tela%202025-11-16%20123508.png)

**Galeria em funcionamento com:**
- 3 imagens adicionadas com sucesso
- Descrições automáticas geradas pela IA do Gemini
- Contador em tempo real mostrando 3 fotos
- Área de upload com drag-and-drop ativo
- Tecnologia em destaque: Google Gemini AI

</div>

### Fluxo de Upload

```
┌─────────────────────────────────────────────┐
│ 1. Arraste uma imagem ou clique para enviar │
├─────────────────────────────────────────────┤
│                                             │
│  📁 Validação de arquivo (tipo e tamanho)  │
│     └─> Máximo 10MB (PNG, JPG)            │
│                                             │
│  📤 Upload para servidor                   │
│     └─> Armazenamento em /uploads          │
│                                             │
│  🤖 Análise com Gemini AI                  │
│     └─> Geração de descrição em português  │
│                                             │
│  💾 Salva em MongoDB Atlas                 │
│     └─> Metadados + Descrição gerada       │
│                                             │
│  ✅ Atualização em tempo real              │
│     └─> Nova imagem aparece na galeria     │
│                                             │
└─────────────────────────────────────────────┘
```

### Arquitetura da Aplicação

```
┌─────────────────────────────────────────────────────────────────┐
│                         INSTABYTES                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────┐      ┌──────────────────────────┐│
│  │   FRONTEND (Parcel)      │      │   BACKEND (Express)      ││
│  │  http://localhost:8000   │◄────►│  http://localhost:3000   ││
│  │                          │      │                          ││
│  │ • Upload form            │      │ • GET /posts             ││
│  │ • Gallery display        │      │ • POST /posts            ││
│  │ • Image modal            │      │ • POST /upload           ││
│  │ • Theme toggle           │      │ • PUT /upload/:id        ││
│  └──────────────────────────┘      └──────────────┬───────────┘│
│                                                   │             │
│                                    ┌──────────────▼────────────┐│
│                                    │  Google Generative AI     ││
│                                    │     (Gemini API)          ││
│                                    │  - Análise de imagens     ││
│                                    │  - Geração de descrições  ││
│                                    └──────────────┬────────────┘│
│                                                   │             │
│                                    ┌──────────────▼────────────┐│
│                                    │    MongoDB Atlas          ││
│                                    │  - Metadados de posts     ││
│                                    │  - URLs de imagens        ││
│                                    │  - Descrições IA          ││
│                                    └───────────────────────────┘│
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📦 Instalação

### Pré-requisitos

![Windows](https://img.shields.io/badge/Windows-0078D4?style=flat&logo=windows&logoColor=white)
![Linux](https://img.shields.io/badge/Linux-FCC624?style=flat&logo=linux&logoColor=black)
![macOS](https://img.shields.io/badge/macOS-000000?style=flat&logo=apple&logoColor=white)

- **Node.js** >= 14.0.0
- **npm** >= 6.0.0
- **MongoDB Atlas** (conta gratuita)
- **Google Gemini API Key** (gratuito)

### Backend

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/instabytes.git
cd instabytes

# Instalar dependências
npm install

# Copiar arquivo de ambiente e preencher com suas credenciais
cp .env.example .env

# Iniciar servidor em modo desenvolvimento (com auto-reload)
npm run dev
```

O backend iniciará em `http://localhost:3000`

### Frontend

```bash
# Navegar para pasta do Frontend
cd Front-End

# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

O frontend iniciará em `http://localhost:8000`

---

## 🚀 Como Usar

### 1. Configurar Variáveis de Ambiente

Editar `.env` com suas credenciais:

```env
PORT=3000
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/Imersão-BackEnd?retryWrites=true&w=majority
GEMINI_API_KEY=sua-chave-api-gemini
GEMINI_MODEL=gemini-2.0-flash
```

### 2. Upload de Imagem

- Abra `http://localhost:8000` no navegador
- Arraste uma imagem para a área de upload OU clique para selecionar
- Espere a descrição ser gerada automaticamente
- Veja a imagem aparecer na galeria com descrição

### 3. Visualizar Detalhes

- Clique em uma imagem para abrir o modal
- Veja a imagem em tamanho maior com descrição
- Use o toggle de tema (☀️/🌙) para alternar entre claro/escuro

---

## 🔌 Endpoints da API

### `GET /posts`

Retorna todos os posts cadastrados.

**Resposta (200):**

```json
[
  {
    "_id": "64ab12ff1234567890ab1234",
    "descricao": "Um grupo de amigos celebrando ao pôr do sol",
    "imgUrl": "http://localhost:3000/64ab12ff1234567890ab1234.png",
    "alt": "Amigos felizes na praia"
  }
]
```

### `POST /posts`

Cria um novo post com dados JSON.

**Corpo da requisição:**

```json
{
  "descricao": "Descrição manual da imagem",
  "imgUrl": "http://localhost:3000/arquivo.png",
  "alt": "Texto alternativo para acessibilidade"
}
```

**Resposta (201):**

```json
{
  "_id": "64ab12ff1234567890ab1234",
  "descricao": "Descrição manual da imagem",
  "imgUrl": "http://localhost:3000/arquivo.png",
  "alt": "Texto alternativo para acessibilidade"
}
```

### `POST /upload`

Envia uma imagem via multipart/form-data. Salva o arquivo e cria um post inicial.

**Request (multipart/form-data):**

```bash
curl -X POST http://localhost:3000/upload \
  -F "imagem=@/caminho/para/foto.png"
```

**Resposta (201):**

```json
{
  "insertedId": "64ab12ff1234567890ab1234",
  "imgUrl": "http://localhost:3000/64ab12ff1234567890ab1234.png",
  "descricao": "",
  "alt": ""
}
```

### `PUT /upload/:id`

Gera descrição automática usando Gemini e atualiza o post.

**Parâmetro:**

- `id`: ObjectId do post (retornado no POST /upload)

**Corpo (opcional):**

```json
{
  "alt": "Texto alternativo customizado"
}
```

**Resposta (200):**

```json
{
  "_id": "64ab12ff1234567890ab1234",
  "descricao": "Pôr do sol sobre a praia com cores laranja e roxa refletindo na água",
  "imgUrl": "http://localhost:3000/64ab12ff1234567890ab1234.png",
  "alt": "Pôr do sol na praia"
}
```

---

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Porta do servidor
PORT=3000

# MongoDB Atlas (banco de dados)
MONGODB_URI=mongodb+srv://usuario:senha@cluster.mongodb.net/Imersão-BackEnd?retryWrites=true&w=majority

# Google Generative AI (Gemini)
GEMINI_API_KEY=sua-chave-api-do-google-ai
GEMINI_MODEL=gemini-2.0-flash
```

### Como Obter as Chaves:

**MongoDB Atlas:**

1. Acesse [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crie uma conta gratuita
3. Crie um cluster gratuito
4. Obtenha a connection string e insira em `MONGODB_URI`

**Gemini API Key:**

1. Acesse [ai.google.dev](https://ai.google.dev)
2. Clique em "Get API Key"
3. Crie uma chave gratuita
4. Copie e insira em `GEMINI_API_KEY`

---

## 🛠️ Tecnologias

### Backend

![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)
![Google Cloud](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)

### Frontend

![HTML5](https://img.shields.io/badge/HTML5-E34C26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Parcel](https://img.shields.io/badge/Parcel-21374C?style=for-the-badge&logo=parcel&logoColor=white)

**Descrição Técnica:**

- **Backend**: Node.js com Express.js para API REST robusta
- **Database**: MongoDB Atlas para armazenamento NoSQL escalável
- **IA**: Google Generative AI (Gemini) para análise inteligente de imagens
- **Frontend**: HTML5, CSS3, JavaScript ES6+ com Parcel bundler
- **Upload**: Multer para processamento seguro de arquivos
- **Configuração**: Variáveis de ambiente com .env para máxima segurança

---

## 📂 Estrutura do Projeto

```
Imersão-BackEnd/
├── Front-End/
│   ├── assets/
│   │   ├── style.css            # Estilos com tema claro/escuro
│   │   └── js/
│   │       ├── index.js         # Gerenciamento da galeria
│   │       ├── fetchApis.js     # Chamadas à API
│   │       ├── themeToggle.js   # Toggle de tema
│   │       └── uploadManager.js # Gerenciador de upload
│   ├── index.html               # Página principal
│   └── package.json             # Dependências do frontend
│
├── src/
│   ├── config/
│   │   └── DBconfig.js          # Configuração do MongoDB
│   ├── controllers/
│   │   └── postsControllers.js  # Lógica dos endpoints
│   ├── models/
│   │   └── postsModel.js        # Operações do banco de dados
│   ├── routes/
│   │   └── postsRoutes.js       # Definição das rotas
│   └── services/
│       └── geminiService.js     # Integração com Gemini
├── .env.example                 # Template de .env
├── LICENSE                      # Licença MIT
├── package.json                 # Dependências do projeto
├── README.md                    # Este arquivo
└── server.js                    # Ponto de entrada
```

---

## 🤝 Contribuição

Contribuições são bem-vindas! Se você quer melhorar o projeto:

1. **Fork** o repositório
2. **Crie uma branch** para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. **Commit** suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. **Push** para a branch (`git push origin feature/NovaFuncionalidade`)
5. **Abra um Pull Request**

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

MIT © 2025 InstaBytes | Desenvolvido durante a Imersão BackEnd - Alura

---

## 💡 Créditos

- **Projeto**: Imersão BackEnd - Alura
- **APIs Utilizadas**:
  - [Google Generative AI (Gemini)](https://ai.google.dev)
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🔗 Links Úteis

<div align="center">

**[📖 Documentação Frontend](./Front-End/README.md)** •
**[📄 Licença MIT](./LICENSE)** •
**[✨ Tecnologias](#-tecnologias)**

</div>

---

<div align="center">

**Desenvolvido durante a Imersão BackEnd - Alura**

_Última atualização: 16 de novembro de 2025_

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

</div>
