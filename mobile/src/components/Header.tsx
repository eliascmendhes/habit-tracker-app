import { View, TouchableOpacity, Text } from "react-native"; // Importação dos componentes do React Native
import { Feather } from '@expo/vector-icons'; // Importação do ícone do Feather
import colors from 'tailwindcss/colors'; // Importação das cores do Tailwind CSS
import { useNavigation } from "@react-navigation/native"; // Importação do hook useNavigation do React Navigation

import Logo from '../assets/logo.svg'; // Importação do componente de logo SVG

export function Header() {
  const { navigate } = useNavigation() // Recebe a função navigate do hook useNavigation para navegar para a página de criação de um novo hábito

  // View que contém o header com o logo e o botão de adicionar hábito
  return (
    <View className="w-full flex-row items-center justify-between">
      {/* Logo da aplicação */}
      <Logo />

      {/* Botão de adicionar hábito */}
      <TouchableOpacity 
        activeOpacity={0.7}
        className="flex-row h-11 px-4 border border-violet-500 rounded-lg items-center" 
        onPress={() => navigate('new')} 
      >
        {/* Ícone de mais */}
        <Feather 
          name="plus"
          color={colors.violet[500]}
          size={20}
        />

        {/* Texto "Novo" ao lado do ícone */}
        <Text className="text-white ml-3 font-semibold text-base">
          Novo
        </Text>
      </TouchableOpacity>
    </View>
  )
}
