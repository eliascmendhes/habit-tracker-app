import { NavigationContainer } from "@react-navigation/native"; // Importação do componente NavigationContainer do React Navigation
import { View } from "react-native"; // Importação do componente View do React Native

import { AppRoutes } from "./app.routes"; // Importação das rotas da aplicação

export function Routes() {
  // View que contém o componente NavigationContainer que renderiza as rotas da aplicação
  return (
    <View className="flex-1 bg-background">
      <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </View>
  )
}