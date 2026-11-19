import React, { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Sensor } from '../../interfaces/sensor';
import { sensorService } from '../../services/sensorService';
import SensorCard from '../../components/SensorCard';
import { styles } from '../../styles/styles';
type Props = NativeStackScreenProps<RootStackParamList, 'Sensores'>;
export default function SensoresScreen({ navigation }: Props) {
    const [sensores, setSensores] = useState<Sensor[]>([]), [carregando, setCarregando] = useState(true), [erro, setErro] = useState('');
    useFocusEffect(useCallback(() => { let ativo = true; setCarregando(true); sensorService.listar().then(lista => { if (ativo) {
        setSensores(lista);
        setErro('');
    } }).catch(() => { if (ativo)
        setErro('Nao foi possivel carregar sensores.'); }).finally(() => { if (ativo)
        setCarregando(false); }); return () => { ativo = false; }; }, []));
    return <ScrollView style={styles.area} contentContainerStyle={styles.conteudo}>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Painel')}><Text style={styles.botaoTexto}>Voltar ao painel</Text></TouchableOpacity><Text style={styles.titulo}>Sensores urbanos</Text><TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('CadastroSensor')}><Text style={styles.botaoTexto}>Cadastrar sensor</Text></TouchableOpacity>{carregando ? <ActivityIndicator /> : erro ? <Text>{erro}</Text> : sensores.length === 0 ? <Text>Nenhum sensor cadastrado.</Text> : sensores.map(s => <SensorCard key={s.id} sensor={s} onPress={() => navigation.navigate('DetalheSensor', { sensorId: s.id })}/>)}</ScrollView>;
}
