
document.getElementById ("formExcluir").addEventListener("click", function(event){ 
    event.preventDefault();
    let params = new URLSearchParams(document.location.search.substring(1));
    let id = params.get("gameid")
    deleteJogo(id)
})
const deleteJogo = async (id) => {
    // disparamos ums requisicao do tipo [DELETE] para a rota /jogos/id
    const request = new Request(`${urlApi}/${id}`, {
      method: 'DELETE',
    })
    const response = await fetch(request);
    const data = await response.json();
    console.log(data.message);
  
  }