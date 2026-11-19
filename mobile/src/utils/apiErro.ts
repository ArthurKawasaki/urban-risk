import axios from 'axios';
export function mensagemApiErro(erro: unknown): string {
    if (axios.isAxiosError(erro)) {
        const dados = erro.response?.data as {
            mensagem?: string;
            message?: string;
        } | undefined;
        return dados?.mensagem || dados?.message || (erro.response ? `Erro HTTP ${erro.response.status}` : 'Nao foi possivel conectar ao servidor.');
    }
    return erro instanceof Error ? erro.message : 'Ocorreu um erro inesperado.';
}
