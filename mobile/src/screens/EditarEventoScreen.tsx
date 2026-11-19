import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Evento, TipoRisco } from '../interfaces/evento';
import { eventoService } from '../services/eventoService';
import { mensagemApiErro } from '../utils/apiErro';
import { styles } from '../styles/styles';
type Props = NativeStackScreenProps<RootStackParamList, 'EditarEvento'>;
export default function EditarEventoScreen({ route, navigation }: Props) {
    const [evento, setEvento] = useState<Evento | null>(null), [enviando, setEnviando] = useState(false);
    useFocusEffect(useCallback(() => { eventoService.buscarPorId(route.params.eventoId).then(setEvento).catch(e => Alert.alert('Erro', mensagemApiErro(e))); }, [route.params.eventoId]));
    async function salvar() { if (!evento || !evento.bairro.trim() || !evento.descricao.trim())
        return; setEnviando(true); try {
        await eventoService.atualizar(evento.id, { tipo: evento.tipo, bairro: evento.bairro, descricao: evento.descricao, gravidade: evento.gravidade, origem: 'COMUNIDADE', confianca: 60 });
        navigation.navigate('DetalheEvento', { eventoId: evento.id });
    }
    catch (e) {
        Alert.alert('Erro', mensagemApiErro(e));
    }
    finally {
        setEnviando(false);
    } }
    if (!evento)
        return <ActivityIndicator />;
    return <ScrollView style={styles.area} contentContainerStyle={styles.conteudo}>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Painel')}><Text style={styles.botaoTexto}>Voltar ao painel</Text></TouchableOpacity><Text style={styles.titulo}>Editar ocorrencia #{evento.id}</Text><Text style={styles.rotulo}>Tipo</Text><View style={styles.linha}>{(['ALAGAMENTO', 'CALOR', 'SERVICO'] as TipoRisco[]).map(t => <TouchableOpacity key={t} style={[styles.opcao, evento.tipo === t && styles.selecionada]} onPress={() => setEvento({ ...evento, tipo: t })}><Text>{t}</Text></TouchableOpacity>)}</View><Text style={styles.rotulo}>Bairro</Text><TextInput style={styles.input} value={evento.bairro} onChangeText={bairro => setEvento({ ...evento, bairro })}/><Text style={styles.rotulo}>Descricao</Text><TextInput style={styles.input} multiline value={evento.descricao} onChangeText={descricao => setEvento({ ...evento, descricao })}/><Text style={styles.rotulo}>Gravidade</Text><View style={styles.linha}>{[1, 2, 3, 4, 5].map(n => <TouchableOpacity key={n} style={[styles.opcao, evento.gravidade === n && styles.selecionada]} onPress={() => setEvento({ ...evento, gravidade: n })}><Text>{n}</Text></TouchableOpacity>)}</View><TouchableOpacity style={styles.botao} disabled={enviando} onPress={salvar}><Text style={styles.botaoTexto}>Salvar alteracoes</Text></TouchableOpacity></ScrollView>;
}
