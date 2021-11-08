import listaTodosJogos from "../utils/gamesData";

const GamesControler = {
    getAll() {
        // envia o array de jogos como resposta da API.
        return res.send(listaTodosJogos);
    },
    get() {
        const idParam = req.params.id;
        const index = listaTodosJogos.findIndex(jogo => jogo.id == idParam);
        const jogo = listaTodosJogos[index];
        return res.send(jogo);
    },
    create() {
        const jogo = req.body;
        jogo.id = Date.now();
        listaTodosJogos.push(jogo);
        return res.status(201).send({
            message: 'cadastrado com sucesso',
            data: jogo
        });

    },
    edit() {
        const jogoEdit = req.body;
        const id = req.params.id;
        let jogoPreCadastrado = listaTodosJogos.find((jogo) => jogo.id == id);

        // vagaPreCadastrada = {
        //   ...vagaPreCadastrada,
        //   ...vagaEdit
        // }

        jogoPreCadastrado.nome = jogoEdit.nome;
        jogoPreCadastrado.imagem = jogoEdit.imagem;
        jogoPreCadastrado.nota = jogoEdit.nota;
        jogoPreCadastrado.genero = jogoEdit.genero;

       return res.send({
            message: `Jogo ${jogoPreCadastradado.id} atualizada com sucesso`,
            data: jogoPreCadastrado
        })
    },
    destroy() {
        // salvamos em uma variavel o id que recebemos por parametro;
        const id = req.params.id;
        // procuramos o indice da vaga na lista atraves do id que recebemos via parametro 
        const index = listaTodosJogos.findIndex((jogo) => jogo.id == id);
        listaTodosJogos.splice(index, 1);

       return res.send({
            message: `Jogo excluido com sucesso`,
        })

    }


}


export default GamesControler;