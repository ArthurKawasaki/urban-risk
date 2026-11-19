export const nivelAlerta = (prioridade: number) => prioridade >= 75 ? 'CRITICO' : prioridade >= 55 ? 'ALERTA' : 'ATENCAO';
