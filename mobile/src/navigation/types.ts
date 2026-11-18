export type RootStackParamList = {
    Home: undefined;
    Painel: undefined;
    RegistrarEvento: undefined;
    DetalheEvento: {
        eventoId: number;
    };
    EditarEvento: {
        eventoId: number;
    };
    Sensores: undefined;
    CadastroSensor: undefined;
    DetalheSensor: {
        sensorId: number;
    };
    EditarSensor: {
        sensorId: number;
    };
};
