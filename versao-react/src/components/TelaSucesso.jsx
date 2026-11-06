import { useEffect, useRef } from "react";

export default function TelaSucesso({ token, onSair }) {
    const titulo = useRef(null);

    useEffect(() => {
        titulo.current.focus();
    }, []);

    return (
        <section className="conteudo" id="telaSucesso">
            <div className="selo" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            <h1 id="tituloSucesso" tabIndex={-1} ref={titulo}>Login feito!</h1>
            <p className="subtitulo">A API respondeu com o seu <strong>access_token</strong>:</p>
            <code className="token" id="saidaToken">{token}</code>
            <p className="nota">Ele fica salvo nesta aba até você sair.</p>
            <button type="button" className="botao botao-secundario" id="botaoSair" onClick={onSair}>Sair</button>
        </section>
    );
}
