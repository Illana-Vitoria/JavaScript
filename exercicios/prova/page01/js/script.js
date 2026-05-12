window.addEventListener('load', function () {

    const nomeUsuario = document.getElementById("btnTexto");
    const btnExibir = document.getElementById("btnExibir");
    const divNome = document.getElementById("divNome");

    btnExibir.addEventListener("click", exibir);

    function exibir() {
        const nomeDigitado = nomeUsuario.value.trim();

        // limpa o conteúdo anterior
        divNome.innerHTML = "";

        // validção para caso o campo esteja vazio
        if (nomeDigitado === "") {
            alert("Por favor, insira um nome.");
            return;
        }

        //  criação do segundo parágrafo 
        const paragrafo = document.createElement("p");
        paragrafo.innerHTML = `
            Nome informado: ${nomeDigitado}.
            Clique no botão abaixo para abrir a próxima página após 3 segundos
        `;

        // adiciona o parágrafo ao div 
        divNome.appendChild(paragrafo);

        // cria o botão "Abrir página"
        const btnAbrirPagina = document.createElement("button");
        btnAbrirPagina.textContent = "Abrir página";
        btnAbrirPagina.id = "btnAbrirPagina";

        // adiciona o botão após o parágrafo
        divNome.appendChild(btnAbrirPagina);

        btnAbrirPagina.addEventListener("click", abrirPagina);
    }

    function abrirPagina(event) {
        const btn = event.target;
        
         // salva o nome no localStorage para a próxima página:
        localStorage.setItem("nomeUsuario", nomeUsuario.value.trim()); 
        
        // desabilita o botão
        btn.disabled = true;

        // executa a função após 3 segundos
        setTimeout(() => {
            window.location.href = "../page02/index.html";
        }, 3000);
        
    }
});