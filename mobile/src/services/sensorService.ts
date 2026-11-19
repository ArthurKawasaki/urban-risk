import api from './api';
import { Sensor, NovoSensor } from '../interfaces/sensor';
export const sensorService = {
    listar: async (): Promise<Sensor[]> => (await api.get<Sensor[]>('/sensores')).data,
    buscarPorId: async (id: number): Promise<Sensor> => (await api.get<Sensor>(`/sensores/${id}`)).data,
    cadastrar: async (sensor: NovoSensor): Promise<Sensor> => (await api.post<Sensor>('/sensores', sensor)).data,
    atualizar: async (id: number, sensor: NovoSensor): Promise<Sensor> => (await api.put<Sensor>(`/sensores/${id}`, sensor)).data,
    excluir: async (id: number): Promise<void> => { await api.delete(`/sensores/${id}`); },
};
