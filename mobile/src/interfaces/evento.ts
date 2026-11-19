export type TipoRisco = 'ALAGAMENTO' | 'CALOR' | 'SERVICO';
export interface Evento {
    id: number;
    tipo: TipoRisco;
    bairro: string;
    descricao: string;
    origem: string;
    confianca: number;
    gravidade: number;
    prioridade: number;
    criadoEm: string;
}
export interface Painel {
    total: number;
    criticos: number;
    alertas: number;
    atualizadoEm: string;
}
export interface NovoEvento {
    tipo: TipoRisco;
    bairro: string;
    descricao: string;
    gravidade: number;
    origem: 'COMUNIDADE';
    confianca: 60;
}
