const express = require('express');
const router = express.Router();

const listaTodosJogos = [
  { 
    id: 1, 
    nome: 'Red Dead Redeptiom 2',
    imagem:'https://images5.alphacoders.com/917/917971.jpg' ,
    genero: 'Ação',
    nota: '10',
    situacao:'true',
    },
    { 
      id: 2,
      nome: 'DOTA 2',
      imagem:'https://marretabionica.com.br/wp-content/uploads/2018/09/dotinha-da-massa.jpg' ,
      genero: 'MOBA',
      nota: '10',
      situacao:'true',
      },
]


// [GET] /jogos = Retorna uma lista de todos os jogos.
router.get('/', (req, res) => {
  // envia o array de jogos como resposta da API.
  res.send(listaTodosJogos);
})

// primeiro a gente faz uma requisicao buscando o jogo por id
// [GET] /jogos/id  = Returna uma unica jogo por id.
router.get('/:id', (req, res) => {
  const idParam = req.params.id;
  const index = listaTodosJogos.findIndex(jogo=> jogo.id == idParam);
  const jogo = listaTodosJogos[index];
  res.send(jogo);
})

// depois iremos enviar o objeto atualizado para fazer o update do jogo na lista

// [PUT] = que recebe um objeto e um id do front e atualiza os dados do jogo com esse id.
router.put('/:id', (req, res) => {
  const jogoEdit = req.body;
  const id = req.params.id;
  let jogoPreCadastrado = listaTodosJogos.find((jogo) => jogo.id == id);
  
 

  jogoPreCadastrado.nome = jogoEdit.nome;
  jogoPreCadastrado.imagem = jogoEdit.imagem;
  jogoPreCadastrado.nota = jogoEdit.nota;
  jogoPreCadastrado.genero = jogoEdit.genero;

  res.send({
    message: `Jogo ${jogoPreCadastrado.id} atualizada com sucesso`,
    data: jogoPreCadastrado
  })
})





// [POST] /add - Cadastrar uma nova vaga na lista
router.post('/add', (req, res) => {
  const jogo = req.body;
  jogo.id = Date.now();
  listaTodosJogos.push(jogo);
  res.status(201).send({
    message: 'cadastrado com sucesso',
    data: jogo
  });
})

// [DELETE] = /id = Exclui uma vaga por id - falta verificar o excluir
router.delete('/:id', (req, res) => {
  // salvamos em uma variavel o id que recebemos por parametro;
  const id = req.params.id;
  // procuramos o indice da vaga na lista atraves do id que recebemos via parametro 
  const index = listaTodosJogos.findIndex((jogo) => jogo.id == id);
  if (index){
    listaTodosJogos.splice(index, 1);
    res.send({
      message: `Jogo excluido com sucesso`,
    })
  }
  else
  res.send({
    message: `Não foi possivel encontrar o jogo com esse ID`,
  })
  

  
})



module.exports = router;

