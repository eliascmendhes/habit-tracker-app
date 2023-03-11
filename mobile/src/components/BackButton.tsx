import { TouchableOpacity } from "react-native"; // Importação do TouchableOpacity do React Native
import { Feather } from '@expo/vector-icons'; // Importação do Feather Icons do Expo
import colors from "tailwindcss/colors"; // Importação de cores personalizadas do Tailwind CSS
import { useNavigation } from "@react-navigation/native"; // Importação da função useNavigation do react-navigation

export function BackButton() {
  const { goBack } = useNavigation() // Recebe a função goBack da função useNavigation

  // Componente TouchableOpacity que chama a função goBack quando clicado
  return (
    <TouchableOpacity 
      activeOpacity={0.7} // Opacidade quando o botão é pressionado
      onPress={goBack} // Função para voltar para a tela anterior
    >
      <Feather 
        name="arrow-left" // Ícone Feather de seta apontando para a esquerda
        size={32} // Tamanho do ícone
        color={colors.zinc[400]} // Cor do ícone
      />
    </TouchableOpacity>
  )
}
