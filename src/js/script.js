const API_LOGIN_URL = "https://api.escuelajs.co/api/v1/auth/login";

const CHAVE_TOKEN = "access_token";
const TEMPO_LIMITE_MS = 15000;

const telaLogin = document.getElementById("telaLogin");
const telaSucesso = document.getElementById("telaSucesso");
const formLogin = document.getElementById("formLogin");
const campoEmail = document.getElementById("email");
const campoSenha = document.getElementById("senha");
const erroEmail = document.getElementById("erroEmail");
const erroSenha = document.getElementById("erroSenha");
const erroGeral = document.getElementById("erroGeral");
const botaoEntrar = document.getElementById("botaoEntrar");
const textoBotao = document.getElementById("textoBotao");
const botaoMostrarSenha = document.getElementById("mostrarSenha");
const botaoSair = document.getElementById("botaoSair");
const tituloSucesso = document.getElementById("tituloSucesso");
const saidaToken = document.getElementById("saidaToken");

async function pedirToken(email, senha) {
    let resposta;

    try {
        resposta = await fetch(API_LOGIN_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, password: senha }),
            signal: AbortSignal.timeout(TEMPO_LIMITE_MS)
        });
    } catch {

        throw new Error("Não conseguimos falar com o servidor. Confira sua internet e tente de novo.");
    }

    if (resposta.status === 400 || resposta.status === 401) {
        throw new Error("E-mail ou senha incorretos. Confira os dados e tente de novo.");
    }

    const dados = await resposta.json().catch(() => ({}));

    if (!resposta.ok || !dados.access_token) {
        throw new Error("Tivemos um problema no servidor. Tente de novo em alguns minutos.");
    }

    return dados.access_token;
}

function mostrarErroCampo(campo, areaErro, mensagem) {
    areaErro.textContent = mensagem;

    if (mensagem) {
        campo.setAttribute("aria-invalid", "true");
    } else {
        campo.removeAttribute("aria-invalid");
    }
}

function validarFormulario() {
    let mensagemEmail = "";
    let mensagemSenha = "";

    if (campoEmail.value === "") {
        mensagemEmail = "Digite seu e-mail.";
    } else if (!campoEmail.validity.valid) {
        mensagemEmail = "Confira o e-mail. Ele precisa ser como nome@email.com.";
    }

    if (campoSenha.value === "") {
        mensagemSenha = "Digite sua senha.";
    }

    mostrarErroCampo(campoEmail, erroEmail, mensagemEmail);
    mostrarErroCampo(campoSenha, erroSenha, mensagemSenha);

    if (mensagemEmail) {
        campoEmail.focus();
    } else if (mensagemSenha) {
        campoSenha.focus();
    }

    return !mensagemEmail && !mensagemSenha;
}

function definirCarregando(carregando) {
    botaoEntrar.disabled = carregando;
    textoBotao.textContent = carregando ? "Entrando..." : "Entrar";
}

function definirSenhaVisivel(visivel) {
    campoSenha.type = visivel ? "text" : "password";
    botaoMostrarSenha.textContent = visivel ? "Ocultar" : "Mostrar";
    botaoMostrarSenha.setAttribute("aria-label", visivel ? "Ocultar senha" : "Mostrar senha");
}

function mostrarTelaSucesso(token) {
    saidaToken.textContent = token;
    telaLogin.hidden = true;
    telaSucesso.hidden = false;
    tituloSucesso.focus();
}

function mostrarTelaLogin() {
    telaSucesso.hidden = true;
    telaLogin.hidden = false;
    campoEmail.focus();
}

formLogin.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    erroGeral.hidden = true;

    if (!validarFormulario()) {
        return;
    }

    definirCarregando(true);

    try {
        const token = await pedirToken(campoEmail.value, campoSenha.value);

        sessionStorage.setItem(CHAVE_TOKEN, token);
        formLogin.reset();
        definirSenhaVisivel(false);
        mostrarTelaSucesso(token);
    } catch (erro) {
        erroGeral.textContent = erro.message;
        erroGeral.hidden = false;
        campoSenha.focus();
        campoSenha.select();
    } finally {
        definirCarregando(false);
    }
});

campoEmail.addEventListener("input", function () {
    mostrarErroCampo(campoEmail, erroEmail, "");
});

campoSenha.addEventListener("input", function () {
    mostrarErroCampo(campoSenha, erroSenha, "");
});

botaoMostrarSenha.addEventListener("click", function () {
    definirSenhaVisivel(campoSenha.type === "password");
});

botaoSair.addEventListener("click", function () {
    sessionStorage.removeItem(CHAVE_TOKEN);
    saidaToken.textContent = "";
    mostrarTelaLogin();
});

const tokenSalvo = sessionStorage.getItem(CHAVE_TOKEN);

if (tokenSalvo) {
    mostrarTelaSucesso(tokenSalvo);
}
