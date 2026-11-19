import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, Text, TouchableOpacity, View, } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Evento } from '../interfaces/evento';
import { eventoService } from '../services/eventoService';
import { mensagemApiErro } from '../utils/apiErro';
import { styles } from '../styles/styles';
import { EventoCard } from '../components/EventoCard';
type Props = NativeStackScreenProps<RootStackParamList, 'DetalheEvento'>;
export default function DetalheEventoScreen({ route, navigation }: Props) {
    const [evento, setEvento] = useState<Evento | null>(null);
    const [erro, setErro] = useState('');
    const [excluindo, setExcluindo] = useState(false);
    const id = route.params.eventoId;
    // Atualiza os dados sempre que a tela recebe foco.
    useFocusEffect(useCallback(() => {
        let ativo = true;
        setErro('');
        eventoService.buscarPorId(id)
            .then((dados) => { if (ativo)
            setEvento(dados); })
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
            await eventoService.excluir(id);
            navigation.navigate('Painel');
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
            if (window.confirm('Deseja realmente excluir esta ocorrência?')) {
                void confirmarExclusao();
            }
            return;
        }
        Alert.alert('Excluir ocorrência', 'Deseja realmente excluir?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Excluir', style: 'destructive', onPress: () => void confirmarExclusao() },
        ]);
    }
    return (<ScrollView style={styles.area} contentContainerStyle={styles.conteudo}>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Painel')}><Text style={styles.botaoTexto}>Voltar ao painel</Text></TouchableOpacity>
      {erro ? <Text accessibilityRole="alert">{erro}</Text> : null}
      {!evento && !erro ? (<ActivityIndicator accessibilityLabel="Carregando ocorrência"/>) : evento ? (<>
          <Text style={styles.titulo}>Detalhes da ocorrência #{evento.id}</Text>
          <EventoCard evento={evento}/>
          <View style={styles.cartao}>
            <Text style={styles.rotulo}>Data do registro</Text>
            <Text>{new Date(evento.criadoEm).toLocaleString('pt-BR')}</Text>
            <Text style={styles.rotulo}>Como a prioridade é calculada</Text>
            <Text>Gravidade (até 70 pontos) + confiança (até 20) + bônus por tipo (até 10). Máximo de 100.</Text>
          </View>
          <TouchableOpacity style={styles.botao} disabled={excluindo} onPress={() => navigation.navigate('EditarEvento', { eventoId: evento.id })}>
            <Text style={styles.botaoTexto}>Editar ocorrência</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botao} disabled={excluindo} onPress={excluir}>
            <Text style={styles.botaoTexto}>
              {excluindo ? 'Excluindo...' : 'Excluir ocorrência'}
            </Text>
          </TouchableOpacity>
        </>) : null}
    </ScrollView>);
}
