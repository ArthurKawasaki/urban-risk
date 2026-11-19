import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { styles } from '../styles/styles';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export default function HomeScreen({ navigation }: Props) {
    return <SafeAreaView style={styles.area}><View style={styles.cabecalho}><Text style={styles.logo}>URBAN RISK</Text><Text style={styles.sub}>Inteligencia de riscos urbanos</Text></View><View style={styles.conteudo}>
  <Text style={styles.titulo}>Central de monitoramento</Text>
  <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Painel')}><Text style={styles.botaoTexto}>Painel e alertas</Text></TouchableOpacity>
  <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('RegistrarEvento')}><Text style={styles.botaoTexto}>Registrar ocorrencia</Text></TouchableOpacity>
  <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Sensores')}><Text style={styles.botaoTexto}>Gerenciar sensores</Text></TouchableOpacity>
 </View></SafeAreaView>;
}
