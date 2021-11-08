const urlApi = 'http://localhost:3000/jogos';
const lista = document.getElementById('gameCards');

const paginaAtual = window.location.pathname;

// Faz uma requisicao do tipo [GET] que recebe todas os games cadastrados.
const getJogos = async () => {
  const response = await fetch(urlApi); // faz um req do tipo [GET] para a api
  // data = uma lista (array de objetos) com as tarefas pre cadastra 
  const data = await response.json();
  console.log(data);
  if (paginaAtual == '/front-end/index.html') {
    // iteramos esse array passando item por item e renderizandop na tela
    data.map((jogo) => {
      lista.insertAdjacentHTML('beforeend',
        `<div class="card">
       <section class=cardTemplate>
           <div class="cardEditButton">
              <a href="./edit.html?gameid=${jogo.id}">
               <img src="./static/edit.png" alt="Icone de editar">
               </a>
           </div>
           <div class="cardGameIMG">
               <img src="${jogo.imagem}"alt="Capa do Jogo">
           </div>
  
           <div>
               <p class="cardInfoNota">${jogo.nota}</p>
               <h1 class="cardInfoNome"> ${jogo.nome}</h1>
               <p class="cardInfoGender">${jogo.genero}</h3>
               <div class="cardStatusConclusao">
                <p>Status:
            <img src="./static/ok.png" alt="Icone de editar">
           </p>
           </div>
           
           </div>
           
       </section>
       
       <script src="script.js"></script>
      `
      )
    })
  }
}

getJogos();