import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { sensorService } from '../../services/sensorService';
import { mensagemApiErro } from '../../utils/apiErro';
import { styles } from '../../styles/styles';
type Props = NativeStackScreenProps<RootStackParamList, 'CadastroSensor'>;
export default function CadastroSensorScreen({ navigation }: Props) {
    const [codigo, setCodigo] = useState(''), [bairro, setBairro] = useState(''), [tipo, setTipo] = useState(''), [ativo, setAtivo] = useState(true), [enviando, setEnviando] = useState(false);
    async function salvar() { if (!codigo.trim() || !bairro.trim() || !tipo.trim()) {
        Alert.alert('Atencao', 'Preencha todos os campos.');
        return;
    } setEnviando(true); try {
        const s = await sensorService.cadastrar({ codigo: codigo.trim(), bairro: bairro.trim(), tipo: tipo.trim(), ativo });
        navigation.replace('DetalheSensor', { sensorId: s.id });
    }
    catch (e) {
        Alert.alert('Erro', mensagemApiErro(e));
    }
    finally {
        setEnviando(false);
    } }
    return <ScrollView style={styles.area} contentContainerStyle={styles.conteudo}>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Painel')}><Text style={styles.botaoTexto}>Voltar ao painel</Text></TouchableOpacity><Text style={styles.titulo}>Novo sensor</Text><Text style={styles.rotulo}>Codigo unico</Text><TextInput style={styles.input} value={codigo} onChangeText={setCodigo}/><Text style={styles.rotulo}>Bairro</Text><TextInput style={styles.input} value={bairro} onChangeText={setBairro}/><Text style={styles.rotulo}>Tipo</Text><TextInput style={styles.input} value={tipo} onChangeText={setTipo}/><TouchableOpacity style={styles.botao} onPress={() => setAtivo(!ativo)}><Text style={styles.botaoTexto}>Situacao: {ativo ? 'Ativo' : 'Inativo'} (alterar)</Text></TouchableOpacity><TouchableOpacity style={styles.botao} disabled={enviando} onPress={salvar}><Text style={styles.botaoTexto}>Salvar sensor</Text></TouchableOpacity></ScrollView>;
}
