export interface Sensor {
    id: number;
    codigo: string;
    bairro: string;
    tipo: string;
    ativo: boolean;
}
export type NovoSensor = Omit<Sensor, 'id'>;
