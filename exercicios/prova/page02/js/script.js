window.addEventListener('load', function () {

    // obtém o nome salvo na página anterior no localStorage
    const nomeSalvo = localStorage.getItem("nomeUsuario");
    const selectPerfil = document.getElementById("selectPerfil");
    const btnVisualizar = document.getElementById("btnVisualizar");
    const divPergunta = document.getElementById("divPergunta");

    // cria o parágrafo 
    const paragrafo = document.createElement("p");
    paragrafo.innerHTML = `${nomeSalvo}, qual o seu perfil?`;

    // insere o parágrafo no div
    divPergunta.appendChild(paragrafo);


    btnVisualizar.addEventListener("click", redirecionar);

    function redirecionar() {

        const perfilSelecionado = selectPerfil.value;

        // validação para garantir que uma opção foi selecionada
        if (perfilSelecionado === "") {
            alert("Por favor, selecione uma opção (Masculino ou Feminino).");
            return;
        }

        // lógica para o redirecionamento a partir do perfil selecionado
        if (perfilSelecionado === "Feminino") {
            // redireciona para a página 04 - Feminino
            window.location.href = "../page04/index.html";
        } else if (perfilSelecionado === "Masculino") {
            // redireciona para a página 03 - Masculino
            window.location.href = "../page03/index.html";
        }
    }


});