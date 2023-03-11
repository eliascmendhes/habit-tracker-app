import './src/lib/dayjs'; // Importação de uma biblioteca de data e hora

import { StatusBar } from 'react-native'; // Importação do StatusBar do React Native
import { 
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold
} from '@expo-google-fonts/inter'; // Importação das fontes personalizadas do aplicativo

import { Loading } from './src/components/Loading'; // Importação do componente Loading personalizado
import { Routes } from './src/routes'; // Importação do componente Routes personalizado

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold
  });

  // Condicional para verificar se as fontes foram carregadas com sucesso. 
  // Caso contrário, exibe o componente Loading.
  if (!fontsLoaded) {
    return (
      <Loading />
    );
  }

  // Renderização do componente Routes para lidar com as rotas do aplicativo e 
  // configuração da StatusBar com estilo de barra de status clara e transparência
  return (
    <>
      <Routes />
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
    </>
  );
}
