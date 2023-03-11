import { useNavigation } from "@react-navigation/native"; // Importação do hook useNavigation do React Navigation
import { Text } from "react-native"; // Importação do componente Text do React Native

export function HabitsEmpty() {
  const {navigate} = useNavigation() // Recebe a função navigate do hook useNavigation para navegar para a página de criação de um novo hábito
  // Componente Text que renderiza uma mensagem de aviso quando não há hábitos monitorados
  return (
    <Text className="text-zinc-400 text-base">
        Você ainda não está monitorando nenhum hábito. {' '}

        <Text className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate('new')}
        >
          Comece cadastrando um
        </Text>
    </Text>
  )
}
