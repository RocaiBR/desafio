import { useState } from "react";
import FormLogin from "./components/FormLogin.jsx";
import TelaSucesso from "./components/TelaSucesso.jsx";
import Vitrine from "./components/Vitrine.jsx";

const CHAVE_TOKEN = "access_token";

function lerTokenSalvo() {
    try {
        return sessionStorage.getItem(CHAVE_TOKEN);
    } catch {
        return null;
    }
}

export default function App() {
    const [token, setToken] = useState(lerTokenSalvo);
    const [saiu, setSaiu] = useState(false);

    function entrar(novoToken) {
        sessionStorage.setItem(CHAVE_TOKEN, novoToken);
        setToken(novoToken);
    }

    function sair() {
        sessionStorage.removeItem(CHAVE_TOKEN);
        setToken(null);
        setSaiu(true);
    }

    return (
        <div className="pagina">
            <Vitrine />

            <main className="painel">
                {token ? (
                    <TelaSucesso token={token} onSair={sair} />
                ) : (
                    <FormLogin focarEmail={saiu} onEntrar={entrar} />
                )}
            </main>
        </div>
    );
}
