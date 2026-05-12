window.addEventListener("load", function () {

    const btnLogin = document.getElementById("btnLogin");
    const btnCadastrar = document.getElementById("btnCadastrar");

    if (btnLogin) btnLogin.onclick = loginUser;
    if (btnCadastrar) btnCadastrar.onclick = registerUser;

    // efeito de zoom nas transições de página
    document.querySelectorAll(".btn-zoom").forEach(btn => {
        btn.addEventListener("click", function (e) {
            const destino = this.getAttribute("href");
            e.preventDefault();
            document.body.classList.add("page-zoom");
            setTimeout(() => window.location.href = destino, 350);
        });
    });

    // =========================
    // SISTEMA DE LOGIN / CADASTRO
    // =========================

    // Salvar usuário logado
    function salvarSessao(usuario) {
        localStorage.setItem("usuarioLogado", usuario);
    }

    // Obter usuário logado
    function getUsuarioLogado() {
        return localStorage.getItem("usuarioLogado");
    }

    // Logout
    function logout() {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
    }

    // -------------------------
    // CADASTRO
    // -------------------------
    function registerUser() {
        const usuario = document.getElementById("novoUsuario").value.trim();
        const senha = document.getElementById("novaSenha").value.trim();
        const confirmar = document.getElementById("confirmar").value.trim();
        const msg = document.getElementById("msgcad");

        if (!usuario || !senha || !confirmar) {
            msg.innerHTML = "Preencha todos os campos!";
            return;
        }

        if (senha !== confirmar) {
            msg.innerHTML = "As senhas não conferem!";
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

        if (usuarios[usuario]) {
            msg.innerHTML = "Usuário já existe!";
            return;
        }

        usuarios[usuario] = senha;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        msg.innerHTML = "Conta criada com sucesso! Redirecionando...";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    }

    // -------------------------
    // LOGIN
    // -------------------------
    function loginUser() {
        const usuario = document.getElementById("username").value.trim();
        const senha = document.getElementById("senha").value.trim();
        const msg = document.getElementById("msg");

        if (!usuario || !senha) {
            msg.innerHTML = "Preencha todos os campos!";
            return;
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

        if (!usuarios[usuario] || usuarios[usuario] !== senha) {
            msg.innerHTML = "Usuário ou senha incorretos!";
            return;
        }

        salvarSessao(usuario);

        msg.innerHTML = "Login realizado! Entrando no jogo...";

        setTimeout(() => {
            window.location.href = "jogo.html";
        }, 800);
    }

    // -------------------------
    // EVENTOS DOS BOTÕES
    // -------------------------
    document.addEventListener("DOMContentLoaded", () => {



    });


});