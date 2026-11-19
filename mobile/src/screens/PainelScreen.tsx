import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { Evento, Painel } from '../interfaces/evento';
import { eventoService } from '../services/eventoService';
import { EventoCard } from '../components/EventoCard';
import { styles } from '../styles/styles';
type Props = NativeStackScreenProps<RootStackParamList, 'Painel'>;
export default function PainelScreen({ navigation }: Props) {
    const [eventos, setEventos] = useState<Evento[]>([]), [painel, setPainel] = useState<Painel | null>(null), [carregando, setCarregando] = useState(true), [online, setOnline] = useState(false);
    const atualizar = useCallback(async () => { try {
        const [lista, resumo] = await Promise.all([eventoService.listar(), eventoService.painel()]);
        setEventos(lista);
        setPainel(resumo);
        setOnline(true);
    }
    catch {
        setOnline(false);
    }
    finally {
        setCarregando(false);
    } }, []);
    useFocusEffect(useCallback(() => { atualizar(); const timer = setInterval(atualizar, 5000); return () => clearInterval(timer); }, [atualizar]));
    return <ScrollView style={styles.area} contentContainerStyle={styles.conteudo}>
  <Text style={{ color: online ? '#14663a' : '#914200', fontWeight: 'bold', marginBottom: 14 }}>{online ? '● Conectado · atualizacao a cada 5 segundos' : '● Sem conexao · tentando novamente'}</Text>
  <Text style={styles.titulo}>Acompanhamento</Text>
  {carregando ? <ActivityIndicator /> : <View style={styles.indicadores}><View style={styles.indicador}><Text style={styles.numero}>{painel?.total ?? '—'}</Text><Text>Ocorrencias</Text></View><View style={styles.indicador}><Text style={styles.numero}>{painel?.criticos ?? '—'}</Text><Text>Criticos</Text></View><View style={styles.indicador}><Text style={styles.numero}>{painel?.alertas ?? '—'}</Text><Text>Alertas</Text></View></View>}
  <TouchableOpacity style={styles.botao} onPress={atualizar}><Text style={styles.botaoTexto}>Atualizar agora</Text></TouchableOpacity>
  <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('RegistrarEvento')}><Text style={styles.botaoTexto}>Registrar ocorrencia</Text></TouchableOpacity>
  <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Sensores')}><Text style={styles.botaoTexto}>Ver sensores</Text></TouchableOpacity>
  <Text style={styles.titulo}>Eventos por prioridade</Text>
  {eventos.length === 0 ? <Text>Nenhum evento encontrado.</Text> : eventos.map(evento => <EventoCard key={evento.id} evento={evento} onPress={() => navigation.navigate('DetalheEvento', { eventoId: evento.id })}/>)}
 </ScrollView>;
}
