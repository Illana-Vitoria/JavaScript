// variaveis do código
const caixa = document.getElementById('txtCaixa');
const prsoneagemImg = document.getElementById('personagemImg');
const mensagensPersonagens = document.getElementById('mensagem');
const botoes = document.getElementById('botoesPersonagem').querySelectorAll('button');

// variável para o contador do Personagem 05
let contadorPersonagem5 = 0;

// retorna true se a caixa de texto estiver vazia e exibe um alerta.
function validarCaixaVazia() {
    if (caixa.value.trim() === '') {
        alert("A caixa de texto não pode estar vazia. Por favor, digite um texto para continuar.");
        return true; // caixa está vazia
    }
    return false; // caixa não está vazia
}

// função para alterar a imagem e o texto da mensagem
function alterarPersonagem(num, mensagem) {
    personagemImg.src = `img/imagem0${num}.png`;
    mensagensPersonagens.textContent = mensagem;
}

// --- Botóes dos personagens ---

// Personagem 01: Texto da caixa
document.getElementById('btnPersonagem1').addEventListener('click', () => {
    if (validarCaixaVazia()) return;
    
    // armazena o texto da caixa
    const texto01 = caixa.value;

    alterarPersonagem(1, texto01);
});

// Personagem 02: Texto em letras maiúsculas 
document.getElementById('btnPersonagem2').addEventListener('click', () => {
    if (validarCaixaVazia()) return;

    const textoMaiusculas = caixa.value.toUpperCase();

    alterarPersonagem(2, textoMaiusculas);
});

// Personagem 03: Primeira palavra do texto da caixa
document.getElementById('btnPersonagem3').addEventListener('click', () => {
    if (validarCaixaVazia()) return;

    // método para pegar a primeira palavra 
    const primeiraPalavra = caixa.value.trim().split(' ')[0];

    alterarPersonagem(3, primeiraPalavra);
});

// Personagem 04: Soma 1 ao valor do usuário e exibe abaixo da imagem.
document.getElementById('btnPersonagem4').addEventListener('click', () => {
    if (validarCaixaVazia()) return;

    const valorTexto = caixa.value.trim();
    const valorNumerico = parseInt(valorTexto);

    if (isNaN(valorNumerico)) {
        alert("Personagem 04: Esperado valor numérico inteiro na caixa.");
        mensagensPersonagens.textContent = "Erro: Esperado valor numérico inteiro.";
        return;
    }

    // calcula o novo valor ]
    const novoValor = valorNumerico + 1;

    alterarPersonagem(4, `${novoValor}`);
});


// Personagem 05: Soma 1 ao valor do usuário toda vez que o botão for clicado.
document.getElementById('btnPersonagem5').addEventListener('click', () => {

    if (validarCaixaVazia())
        return;

    const valorTexto = caixa.value.trim();
    const valorNumerico = parseInt(valorTexto);

    if (isNaN(valorNumerico)) {
        alert("Personagem 05: Esperado valor numérico inteiro na caixa.");
        return;
    }

    // incrementa o valor
    const novoValor = valorNumerico + 1;

    // salva o novo valor no contador
    caixa.value = novoValor;

    alterarPersonagem(5, `${novoValor}`);
});

// Personagem 06: Solicita um novo nome ao usuário e exibe os nomes concatenados.
const btnPersonagem6 = document.getElementById('btnPersonagem6');

btnPersonagem6.addEventListener('mouseover', () => {
    if (validarCaixaVazia()) {
        return;
    }

    // armazena o texto existente na caixa principal
    const textoOriginal = caixa.value.trim();

    // abre um prompt que solicita um novo nome para o usuário
    const novoNome = prompt("Qual o seu nome?");

    // verifica se o usuário clicou em cancelar ou deixou vazio o novo prompt
    if (novoNome === null || novoNome.trim() === "") {
        personagemImg.src = 'imagem_inicial.png';
        return;
    }

    // concatenação do nome da caixa (textoOriginal) com o novo nome do prompt (novoNome)
    const nomeConcatenado = `${textoOriginal}, ${novoNome.trim()}`;

    // alterar a imagem do personagem
    personagemImg.src = 'img/imagem06.png';


    alert(nomeConcatenado);

    // exibe a mesma mensagem no corpo da página
    mensagensPersonagens.textContent = nomeConcatenado;
});
