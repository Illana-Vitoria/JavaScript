window.addEventListener('load', function () {

    const btnMario = document.getElementById("btnMario");
    const btnLuigi = document.getElementById("btnLuigi");
    
    const imgMario = document.getElementById("imgMario");
    const imgLuigi = document.getElementById("imgLuigi");
    const spanMario = document.getElementById("pontuacaoMario");
    const spanLuigi = document.getElementById("pontuacaoLuigi");

    let pontuacaoMario = 0;
    let pontuacaoLuigi = 0;

    // funções para mostrar e esconder as imagens
    function esconderTodos() {
        imgMario.classList.add('escondido');
        imgLuigi.classList.add('escondido');
    }

    function mostrarMario() {
        esconderTodos();
        imgMario.classList.remove('escondido');
        incrementarMario();
    }

    function mostrarLuigi() {
        esconderTodos();
        imgLuigi.classList.remove('escondido');
        incrementarLuigi();
    }
    // funções para incrementar a pontuação
    function incrementarMario() {
        pontuacaoMario++;
        spanMario.textContent = pontuacaoMario;
    }

    function incrementarLuigi() {
        pontuacaoLuigi++;
        spanLuigi.textContent = pontuacaoLuigi;
    }

    // adiciona os cliques aos botões e imagens
    btnMario.addEventListener("click", mostrarMario);
    btnLuigi.addEventListener("click", mostrarLuigi);

    imgMario.addEventListener("click", incrementarMario);
    imgLuigi.addEventListener("click", incrementarLuigi);

});