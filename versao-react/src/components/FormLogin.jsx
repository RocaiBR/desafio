import { useEffect, useRef, useState } from "react";
import { pedirToken } from "../api.js";

export default function FormLogin({ focarEmail, onEntrar }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erroEmail, setErroEmail] = useState("");
    const [erroSenha, setErroSenha] = useState("");
    const [erroGeral, setErroGeral] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [senhaVisivel, setSenhaVisivel] = useState(false);

    const campoEmail = useRef(null);
    const campoSenha = useRef(null);

    useEffect(() => {
        if (focarEmail) {
            campoEmail.current.focus();
        }
    }, [focarEmail]);

    function validarFormulario() {
        let mensagemEmail = "";
        let mensagemSenha = "";

        if (email === "") {
            mensagemEmail = "Digite seu e-mail.";
        } else if (!campoEmail.current.validity.valid) {
            mensagemEmail = "Confira o e-mail. Ele precisa ser como nome@email.com.";
        }

        if (senha === "") {
            mensagemSenha = "Digite sua senha.";
        }

        setErroEmail(mensagemEmail);
        setErroSenha(mensagemSenha);

        if (mensagemEmail) {
            campoEmail.current.focus();
        } else if (mensagemSenha) {
            campoSenha.current.focus();
        }

        return !mensagemEmail && !mensagemSenha;
    }

    async function enviar(evento) {
        evento.preventDefault();
        setErroGeral("");

        if (!validarFormulario()) {
            return;
        }

        setCarregando(true);

        try {
            const token = await pedirToken(email, senha);
            onEntrar(token);
        } catch (erro) {
            setErroGeral(erro.message);
            campoSenha.current.focus();
            campoSenha.current.select();
        } finally {
            setCarregando(false);
        }
    }

    return (
        <section className="conteudo" id="telaLogin">
            <h1>Que bom te ver!</h1>
            <p className="subtitulo">Entre com seu e-mail e senha para fazer seu pedido.</p>

            <form id="formLogin" noValidate onSubmit={enviar}>
                <div className="alerta" id="erroGeral" role="alert" hidden={!erroGeral}>
                    {erroGeral}
                </div>

                <div className="campo">
                    <label htmlFor="email">E-mail</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="nome@email.com"
                        autoComplete="email"
                        aria-describedby="erroEmail"
                        aria-invalid={erroEmail ? "true" : undefined}
                        required
                        ref={campoEmail}
                        value={email}
                        onChange={(evento) => {
                            setEmail(evento.target.value);
                            setErroEmail("");
                        }}
                    />
                    <p className="erro" id="erroEmail">{erroEmail}</p>
                </div>

                <div className="campo">
                    <label htmlFor="senha">Senha</label>
                    <div className="campo-senha">
                        <input
                            type={senhaVisivel ? "text" : "password"}
                            id="senha"
                            name="senha"
                            autoComplete="current-password"
                            aria-describedby="erroSenha"
                            aria-invalid={erroSenha ? "true" : undefined}
                            required
                            ref={campoSenha}
                            value={senha}
                            onChange={(evento) => {
                                setSenha(evento.target.value);
                                setErroSenha("");
                            }}
                        />
                        <button
                            type="button"
                            className="mostrar-senha"
                            id="mostrarSenha"
                            aria-label={senhaVisivel ? "Ocultar senha" : "Mostrar senha"}
                            onClick={() => setSenhaVisivel(!senhaVisivel)}
                        >
                            {senhaVisivel ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                    <p className="erro" id="erroSenha">{erroSenha}</p>
                </div>

                <button type="submit" className="botao" id="botaoEntrar" disabled={carregando}>
                    <span className="spinner" aria-hidden="true"></span>
                    <span id="textoBotao">{carregando ? "Entrando..." : "Entrar"}</span>
                </button>
            </form>
        </section>
    );
}
