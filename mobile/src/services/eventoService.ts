import api from "./api";
import { Evento, NovoEvento, Painel } from "../interfaces/evento";
export const eventoService = {
    listar: async (): Promise<Evento[]> => {
        const resposta = await api.get<Evento[]>("/eventos");
        return resposta.data;
    },
    painel: async (): Promise<Painel> => {
        const resposta = await api.get<Painel>("/painel");
        return resposta.data;
    },
    buscarPorId: async (id: number): Promise<Evento> => {
        const resposta = await api.get<Evento>(`/eventos/${id}`);
        return resposta.data;
    },
    atualizar: async (id: number, evento: NovoEvento): Promise<Evento> => {
        const resposta = await api.put<Evento>(`/eventos/${id}`, evento);
        return resposta.data;
    },
    excluir: async (id: number): Promise<void> => {
        await api.delete(`/eventos/${id}`);
    },
    cadastrar: async (evento: NovoEvento): Promise<Evento> => {
        const resposta = await api.post<Evento>("/eventos", evento);
        return resposta.data;
    },
};
