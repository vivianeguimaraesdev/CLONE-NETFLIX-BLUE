const urlApi = 'http://localhost:3000/jogos';
const lista = document.getElementById('gameCards');
const paginaAtual = window.location.pathname;


// Funcao generica de submit, serve para POST 
document.getElementById("formEnviar").addEventListener("click", function (event) {
    submitForm(event)
})
const submitForm = async (evento) => {
    // previne a pagina de atualizar devido ao evento de submit do botao ter sido executado
    evento.preventDefault();

    // precisamos pegar os valores que o usuario preenche no formulario
    // buscar o input e buscar o seu value.
    let nome = document.getElementById('gameName');
    let imagem = document.getElementById('gameImage');
    let nota = document.getElementById('gameGrade');
    let genero = document.getElementById('gameGender');

    // adicionamos os valores dos inputs em campos do nosso objeto jogo
    const jogo = {
        nome: nome.value,
        imagem: imagem.value,
        genero: genero.value,
        nota: nota.value,

    }

    // verificamos se esta ou nao no modo de edicao, se nao estiver dispara o POST
    // se estiver dispara o PUT

    // estamos configurando a nossa requisicao antes dela ser disparada
    const request = new Request(`${urlApi}/add`, {
        method: 'POST',
        body: JSON.stringify(jogo),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    })

    // chamamos a funcao fetch de forma assincrona de acordo com as nossas configuracoes anteriores
    const response = await fetch(request);
    // pegamos o resultado do fetch assincrono e acessamos o body no formato json
    const result = await response.json();

}


