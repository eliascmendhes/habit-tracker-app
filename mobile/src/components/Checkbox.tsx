import { Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native"; // Importação dos componentes do React Native
import { Feather } from '@expo/vector-icons' // Importação do Feather Icons do Expo
import colors from "tailwindcss/colors"; // Importação de cores personalizadas do Tailwind CSS
import Animated, {RotateInUpLeft, ZoomIn, ZoomOut} from "react-native-reanimated"; // Importação de animações do react-native-reanimated

interface Props extends TouchableOpacityProps {
  title: string; // Propriedade para receber o título do checkbox
  checked?: boolean; // Propriedade para receber o estado do checkbox
}

export function Checkbox({ title, checked = false, ...rest }: Props) {
  // Componente TouchableOpacity que renderiza o checkbox e o título
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      { checked 
        ? // Se o checkbox estiver marcado, renderiza um ícone de check com animação
        <Animated.View 
        className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
        entering={ZoomIn}
        exiting={ZoomOut}
        >
          <Feather 
            name="check"
            size={20}
            color={colors.white}
          />
        </Animated.View>
        : // Se o checkbox não estiver marcado, renderiza um quadrado vazio
        <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      }

      <Text className="text-white text-base ml-3 font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  )
}
