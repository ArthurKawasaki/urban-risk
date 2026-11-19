import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { TipoRisco } from '../interfaces/evento';
import { eventoService } from '../services/eventoService';
import { mensagemApiErro } from '../utils/apiErro';
import { styles } from '../styles/styles';
type Props = NativeStackScreenProps<RootStackParamList, 'RegistrarEvento'>;
export default function RegistrarEventoScreen({ navigation }: Props) {
    const [tipo, setTipo] = useState<TipoRisco>('ALAGAMENTO'), [bairro, setBairro] = useState(''), [descricao, setDescricao] = useState(''), [gravidade, setGravidade] = useState(3), [enviando, setEnviando] = useState(false);
    async function salvar() { if (!bairro.trim() || !descricao.trim()) {
        Alert.alert('Campos obrigatorios', 'Informe bairro e descricao.');
        return;
    } setEnviando(true); try {
        const novo = await eventoService.cadastrar({ tipo, bairro: bairro.trim(), descricao: descricao.trim(), gravidade, origem: 'COMUNIDADE', confianca: 60 });
        navigation.replace('DetalheEvento', { eventoId: novo.id });
    }
    catch (e) {
        Alert.alert('Erro', mensagemApiErro(e));
    }
    finally {
        setEnviando(false);
    } }
    return <ScrollView style={styles.area} contentContainerStyle={styles.conteudo}>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Painel')}><Text style={styles.botaoTexto}>Voltar ao painel</Text></TouchableOpacity><Text style={styles.titulo}>Nova ocorrencia</Text>
  <Text style={styles.rotulo}>Tipo de risco</Text><View style={styles.linha}>{(['ALAGAMENTO', 'CALOR', 'SERVICO'] as TipoRisco[]).map(t => <TouchableOpacity key={t} style={[styles.opcao, tipo === t && styles.selecionada]} onPress={() => setTipo(t)}><Text style={{ color: tipo === t ? 'white' : '#143a63' }}>{t}</Text></TouchableOpacity>)}</View>
  <Text style={styles.rotulo}>Bairro</Text><TextInput style={styles.input} value={bairro} onChangeText={setBairro} placeholder="Ex.: Centro"/>
  <Text style={styles.rotulo}>Descricao</Text><TextInput style={[styles.input, { height: 100 }]} multiline value={descricao} onChangeText={setDescricao} placeholder="Descreva o ocorrido"/>
  <Text style={styles.rotulo}>Gravidade</Text><View style={styles.linha}>{[1, 2, 3, 4, 5].map(n => <TouchableOpacity key={n} style={[styles.opcao, gravidade === n && styles.selecionada]} onPress={() => setGravidade(n)}><Text style={{ color: gravidade === n ? 'white' : '#143a63' }}>{n}</Text></TouchableOpacity>)}</View>
  <TouchableOpacity style={styles.botao} disabled={enviando} onPress={salvar}><Text style={styles.botaoTexto}>{enviando ? 'Enviando...' : 'Enviar ocorrencia'}</Text></TouchableOpacity>
 </ScrollView>;
}
