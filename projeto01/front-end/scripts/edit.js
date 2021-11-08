const urlApi = 'http://localhost:3000/jogos';
const lista = document.getElementById('gameCards');

const paginaAtual = window.location.pathname;


const habilitarEdição = async () => {
  if (paginaAtual == '/front-end/edit.html') {
    let params = new URLSearchParams(document.location.search.substring(1));
    let id = params.get("gameid")
    if (id) {



      const response = await fetch(urlApi + "/" + id); // faz um req do tipo [GET] para a api
      // data = uma lista (array de objetos) com as tarefas pre cadastra 
      const data = await response.json();




      document.getElementById('gameName').value = data.nome;
      document.getElementById('gameImage').value = data.imagem;
      document.getElementById('gameGrade').value = data.nota;
      document.getElementById('gameGender').value = data.genero;
      document.getElementById('formEnviar').addEventListener("submit", function (event) {
        event.preventDefault()
      });

      document.getElementById('formEnviar').addEventListener("click", async function () {
        // Configuramos o request do PUT
        // Nesse caso precisamos enviar o id na requisicao, repare que estamos pegando uma variavel
        // chamada idEdicao, essa variavel é atualizada com o id do jogo quando é clicado o botao editar

        const jogo = {
          "nome": document.getElementById('gameName').value,
          "imagem": document.getElementById('gameImage').value,
          "nota": document.getElementById('gameGrade').value,
          "genero": document.getElementById('gameGender').value,

        }


        const request = new Request(`${urlApi}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(jogo),
          headers: new Headers({
            'Content-Type': 'application/json'
          })
        })

        // chamamos a funcao fetch de forma assincrona de acordo com as nossas configuracoes anteriores
        const response = await fetch(request);
        response.status === 200 ? window.location.pathname = "/front-end/index.html" : ""

        // pegamos o resultado do fetch assincrono e acessamos o body no formato json
        const result = await response.json();

      });

    }
  }
}

habilitarEdição();