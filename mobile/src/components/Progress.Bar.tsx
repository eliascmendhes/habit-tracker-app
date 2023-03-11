import { useEffect } from "react"; // Importação do hook useEffect do React
import { View } from "react-native"; // Importação do componente View do React Native
import Animated, {useAnimatedStyle, useSharedValue, withTiming, withDelay} from "react-native-reanimated"; // Importação do Animated do React Native Reanimated

interface Props {
  progress?: number; // Propriedade opcional que define o progresso da barra de progresso
}

export function ProgressBar({ progress = 0 }: Props) {
  const sharedProgress = useSharedValue(progress) // Cria uma variável compartilhada para controlar o progresso da barra de progresso
  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%` // Define a largura da barra de progresso com base no valor da variável compartilhada
    }
  })

  useEffect(() => {
    sharedProgress.value = withDelay(300, withTiming(progress)) // Define o progresso da barra de progresso com animação usando o Reanimated do React Native
  }, [progress])

  // View que contém a barra de progresso animada
  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <Animated.View 
        className="h-3 rounded-xl bg-violet-600"
        style={style}
      />
    </View>
  )
}
