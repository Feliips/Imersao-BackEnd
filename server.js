import express from 'express';

const posts = [
  {
    id: 1,
    descricao: "Primeiro post",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    descricao: "Gatinho dormindo profundamente",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 3,
    descricao: "Aquele olhar de quem aprontou",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 4,
    descricao: "Esperando a hora do jantar",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 5,
    descricao: "Foto tirada na correria do dia",
    imagem: "https://placecats.com/millie/300/150",
  },
  {
    id: 6,
    descricao: "Um dia chuvoso e aconchegante",
    imagem: "https://placecats.com/millie/300/150",
  },
];

const app = express();
app.use(express.json());

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


app.get('/posts', (req, res) => {   
  res.status(200).json(posts);
}); 

function buscarPostPorId(id) {
  return posts.findIndex((post) => {
    return post.id === Number(id);
  });
}

app.get("/posts/:id", (req, res) => {
  const index = buscarPostPorId(req.params.id);
  res.status(200).json(posts[index]);
}); 