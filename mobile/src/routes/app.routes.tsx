import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { Navigator, Screen } = createNativeStackNavigator();

import { Home } from '../screens/Home';
import { New } from '../screens/New';
import { Habit } from '../screens/Habit';

export function AppRoutes() {
  return (
    // Navegador raiz da aplicação, que define as telas e as opções do cabeçalho
    <Navigator screenOptions={{ headerShown: false }}>
      {/* Definindo a tela Home */}
      <Screen
        name="home"
        component={Home}
      />

      {/* Definindo a tela de criação de novos hábitos */}
      <Screen
        name="new"
        component={New}
      />

      {/* Definindo a tela de detalhes de um hábito */}
      <Screen
        name="habit"
        component={Habit}
      />
    </Navigator>
  )
}
