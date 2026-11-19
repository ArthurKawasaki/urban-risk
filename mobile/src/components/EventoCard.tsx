import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Evento } from '../interfaces/evento';
import { styles } from '../styles/styles';
export function EventoCard({ evento: e, onPress }: {
    evento: Evento;
    onPress?: () => void;
}) { return <TouchableOpacity accessibilityRole={onPress ? "button" : undefined} disabled={!onPress} onPress={onPress} style={styles.cartao}><View style={styles.linha}><Text style={styles.tipo}>{e.tipo === 'SERVICO' ? 'SERVICO ESSENCIAL' : e.tipo}</Text><Text style={[styles.tag, { backgroundColor: e.prioridade >= 75 ? '#ffd8d8' : e.prioridade >= 55 ? '#fff0bf' : '#d9f1dd' }]}>{e.prioridade >= 75 ? 'CRITICO' : e.prioridade >= 55 ? 'ALERTA' : 'ATENCAO'}</Text></View><Text style={styles.bairro}>{e.bairro}</Text><Text>{e.descricao}</Text><Text style={styles.detalhe}>Origem: {e.origem}  •  Confianca: {e.confianca}%</Text><Text style={styles.detalhe}>Gravidade: {e.gravidade}/5  •  Prioridade: {e.prioridade}/100</Text></TouchableOpacity>; }
