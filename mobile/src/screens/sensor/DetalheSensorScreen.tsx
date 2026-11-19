import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, Text, TouchableOpacity, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { Sensor } from '../../interfaces/sensor';
import { sensorService } from '../../services/sensorService';
import { mensagemApiErro } from '../../utils/apiErro';
import { styles } from '../../styles/styles';
type Props = NativeStackScreenProps<RootStackParamList, 'DetalheSensor'>;
export default function DetalheSensorScreen({ route, navigation }: Props) {
    const [sensor, setSensor] = useState<Sensor | null>(null);
    const [erro, setErro] = useState('');
    const [excluindo, setExcluindo] = useState(false);
    const id = route.params.sensorId;
    // Atualiza os dados sempre que a tela recebe foco.
    useFocusEffect(useCallback(() => {
        let ativo = true;
        setErro('');
        sensorService.buscarPorId(id)
            .then((dados) => { if (ativo)
            setSensor(dados); })
            .catch((e) => { if (ativo)
            setErro(mensagemApiErro(e)); });
        return () => { ativo = false; };
    }, [id]));
    async function confirmarExclusao() {
        if (excluindo)
            return;
        setExcluindo(true);
        setErro('');
        try {
            await sensorService.excluir(id);
            navigation.navigate('Sensores');
        }
        catch (e) {
            const mensagem = mensagemApiErro(e);
            setErro(mensagem);
            if (Platform.OS !== 'web')
                Alert.alert('Erro ao excluir', mensagem);
        }
        finally {
            setExcluindo(false);
        }
    }
    function excluir() {
        if (Platform.OS === 'web') {
            // A confirmação nativa de Alert.alert não é suportada no Expo Web.
            if (window.confirm('Deseja realmente excluir este sensor?')) {
                void confirmarExclusao();
            }
            return;
        }
        Alert.alert('Excluir sensor', 'Deseja realmente excluir?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: () => void confirmarExclusao() },
        ]);
    }
    return (<ScrollView style={styles.area} contentContainerStyle={styles.conteudo}>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Painel')}><Text style={styles.botaoTexto}>Voltar ao painel</Text></TouchableOpacity>
      {erro ? <Text accessibilityRole="alert">{erro}</Text> : null}
      {!sensor && !erro ? (<ActivityIndicator accessibilityLabel="Carregando sensor"/>) : sensor ? (<>
          <Text style={styles.titulo}>Sensor #{sensor.id}</Text>
          <Text style={styles.rotulo}>Código: {sensor.codigo}</Text>
          <Text>Bairro: {sensor.bairro}</Text>
          <Text>Tipo: {sensor.tipo}</Text>
          <Text>Situação: {sensor.ativo ? 'Ativo' : 'Inativo'}</Text>
          <TouchableOpacity style={styles.botao} disabled={excluindo} onPress={() => navigation.navigate('EditarSensor', { sensorId: sensor.id })}>
            <Text style={styles.botaoTexto}>Editar sensor</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} disabled={excluindo} onPress={excluir}>
            <Text style={styles.botaoTexto}>
              {excluindo ? 'Excluindo...' : 'Excluir sensor'}
            </Text>
          </TouchableOpacity>
        </>) : null}
    </ScrollView>);
}
