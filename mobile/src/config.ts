import { Platform } from 'react-native';
// Web no mesmo computador: localhost. Emulador Android: 10.0.2.2.
// Celular fisico: configure EXPO_PUBLIC_API_URL com o IP local do computador.
export const API_URL = process.env.EXPO_PUBLIC_API_URL || (Platform.OS === 'android' ? 'http://10.0.2.2:8080/api' : 'http://localhost:8080/api');
