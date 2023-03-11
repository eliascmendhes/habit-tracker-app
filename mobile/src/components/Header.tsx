import { View, TouchableOpacity, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { useNavigation } from "@react-navigation/native";

import Logo from '../assets/logo.svg';

export function Header() {
  const { navigate } = useNavigation()

  return (
    // View que contém o header com o logo e o botão de adicionar hábito
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
