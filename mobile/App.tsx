/** Navegacao por telas com React Navigation, como no aplicativo das aulas. */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './src/navigation/types';
import HomeScreen from './src/screens/HomeScreen';
import PainelScreen from './src/screens/PainelScreen';
import RegistrarEventoScreen from './src/screens/RegistrarEventoScreen';
import DetalheEventoScreen from './src/screens/DetalheEventoScreen';
import EditarEventoScreen from './src/screens/EditarEventoScreen';
import SensoresScreen from './src/screens/sensor/SensoresScreen';
import CadastroSensorScreen from './src/screens/sensor/CadastroSensorScreen';
import DetalheSensorScreen from './src/screens/sensor/DetalheSensorScreen';
import EditarSensorScreen from './src/screens/sensor/EditarSensorScreen';
const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App() {
 return <NavigationContainer><Stack.Navigator initialRouteName="Home" screenOptions={{headerStyle:{backgroundColor:'#143a63'},headerTintColor:'#fff',headerTitleStyle:{fontWeight:'bold'}}}>
  <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}} />
  <Stack.Screen name="Painel" component={PainelScreen} options={{title:'Painel e alertas'}} />
  <Stack.Screen name="RegistrarEvento" component={RegistrarEventoScreen} options={{title:'Registrar ocorrencia'}} />
  <Stack.Screen name="DetalheEvento" component={DetalheEventoScreen} options={{title:'Detalhes da ocorrencia'}} />
  <Stack.Screen name="EditarEvento" component={EditarEventoScreen} options={{title:'Editar ocorrencia'}} />
  <Stack.Screen name="Sensores" component={SensoresScreen} options={{title:'Sensores urbanos'}} />
  <Stack.Screen name="CadastroSensor" component={CadastroSensorScreen} options={{title:'Cadastrar sensor'}} />
  <Stack.Screen name="DetalheSensor" component={DetalheSensorScreen} options={{title:'Detalhes do sensor'}} />
  <Stack.Screen name="EditarSensor" component={EditarSensorScreen} options={{title:'Editar sensor'}} />
 </Stack.Navigator></NavigationContainer>;
}
