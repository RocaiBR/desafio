const API_LOGIN_URL = "https://api.escuelajs.co/api/v1/auth/login";
const TEMPO_LIMITE_MS = 15000;

export async function pedirToken(email, senha) {
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
