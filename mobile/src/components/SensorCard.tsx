import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Sensor } from '../interfaces/sensor';
import { styles } from '../styles/styles';
export default function SensorCard({ sensor, onPress }: {
    sensor: Sensor;
    onPress: () => void;
}) {
    return <TouchableOpacity style={styles.cartao} onPress={onPress}><Text style={styles.rotulo}>{sensor.codigo}</Text><Text>{sensor.tipo} · {sensor.bairro}</Text><Text>{sensor.ativo ? 'Ativo' : 'Inativo'}</Text></TouchableOpacity>;
}
