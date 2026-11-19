import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Sensor } from '../../interfaces/sensor';
import { sensorService } from '../../services/sensorService';
import { mensagemApiErro } from '../../utils/apiErro';
import { styles } from '../../styles/styles';
type Props = NativeStackScreenProps<RootStackParamList, 'EditarSensor'>;
export default function EditarSensorScreen({ route, navigation }: Props) {
    const [sensor, setSensor] = useState<Sensor | null>(null), [enviando, setEnviando] = useState(false);
    useFocusEffect(useCallback(() => { sensorService.buscarPorId(route.params.sensorId).then(setSensor).catch(e => Alert.alert('Erro', mensagemApiErro(e))); }, [route.params.sensorId]));
    async function salvar() { if (!sensor || !sensor.codigo.trim() || !sensor.bairro.trim() || !sensor.tipo.trim()) {
        Alert.alert('Atencao', 'Preencha todos os campos.');
        return;
    } setEnviando(true); try {
        await sensorService.atualizar(sensor.id, { codigo: sensor.codigo, bairro: sensor.bairro, tipo: sensor.tipo, ativo: sensor.ativo });
        navigation.navigate('DetalheSensor', { sensorId: sensor.id });
    }
    catch (e) {
        Alert.alert('Erro', mensagemApiErro(e));
    }
    finally {
        setEnviando(false);
    } }
    if (!sensor)
        return <ActivityIndicator />;
    return <ScrollView style={styles.area} contentContainerStyle={styles.conteudo}>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Painel')}><Text style={styles.botaoTexto}>Voltar ao painel</Text></TouchableOpacity><Text style={styles.titulo}>Editar sensor</Text><Text style={styles.rotulo}>Codigo</Text><TextInput style={styles.input} value={sensor.codigo} onChangeText={codigo => setSensor({ ...sensor, codigo })}/><Text style={styles.rotulo}>Bairro</Text><TextInput style={styles.input} value={sensor.bairro} onChangeText={bairro => setSensor({ ...sensor, bairro })}/><Text style={styles.rotulo}>Tipo</Text><TextInput style={styles.input} value={sensor.tipo} onChangeText={tipo => setSensor({ ...sensor, tipo })}/><TouchableOpacity style={styles.botao} onPress={() => setSensor({ ...sensor, ativo: !sensor.ativo })}><Text style={styles.botaoTexto}>Situacao: {sensor.ativo ? 'Ativo' : 'Inativo'} (alterar)</Text></TouchableOpacity><TouchableOpacity style={styles.botao} disabled={enviando} onPress={salvar}><Text style={styles.botaoTexto}>Salvar alteracoes</Text></TouchableOpacity></ScrollView>;
}
