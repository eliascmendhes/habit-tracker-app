import { Dimensions, TouchableOpacity, TouchableOpacityProps } from "react-native"; // Importação dos componentes do React Native
import clsx from "clsx"; // Importação da biblioteca clsx
import { generateProgressPercentage } from "../utils/generate-progress-percentage"; // Importação de uma função utilitária para gerar a porcentagem de progresso
import dayjs from "dayjs"; // Importação da biblioteca dayjs

const WEEK_DAYS = 7; // Constante que define a quantidade de dias em uma semana
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5; // Constante que define o preenchimento horizontal da tela

export const DAY_MARGIN_BETWEEN = 8; // Constante que define a margem entre os dias no calendário
export const DAY_SIZE =  (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5); // Constante que define o tamanho de cada dia no calendário

interface Props extends TouchableOpacityProps {
  amountOfHabits?: number; // Propriedade para receber a quantidade de hábitos
  amountCompleted?: number; // Propriedade para receber a quantidade de hábitos completados
  date: Date; // Propriedade para receber a data do item de calendário
}

export function HabitDay({ amountOfHabits = 0, amountCompleted = 0, date, ...rest }: Props) {
  const amountAccomplishedPercentage = amountOfHabits > 0 ? generateProgressPercentage(amountOfHabits, amountCompleted) : 0 // Cálculo da porcentagem de hábitos completados
  const today = dayjs().startOf('day').toDate(); // Recebe a data de hoje a partir da biblioteca dayjs
  const isCurrentDay = dayjs(date).isSame(today); // Verifica se a data é a data atual

  // Componente TouchableOpacity que renderiza o item de calendário e as informações de hábitos
  return (
    <TouchableOpacity 
      className={clsx(
        "rounded-lg border-2 m-1", {
          ["bg-zinc-900 border-zinc-800"] : amountAccomplishedPercentage === 0, // Caso nenhum hábito tenha sido concluído, exibe uma cor cinza
          ["bg-violet-900 border-violet-700"] : amountAccomplishedPercentage > 0 && amountAccomplishedPercentage < 20, // Caso menos de 20% dos hábitos tenham sido concluídos, exibe uma cor violeta mais escura
          ["bg-violet-800 border-violet-600"] : amountAccomplishedPercentage >= 20 && amountAccomplishedPercentage < 40, // Caso entre 20% e 40% dos hábitos tenham sido concluídos, exibe uma cor violeta menos escura
          ["bg-violet-700 border-violet-500"] : amountAccomplishedPercentage >= 40 && amountAccomplishedPercentage < 60, // Caso entre 40% e 60% dos hábitos tenham sido concluídos, exibe uma cor violeta
          ["bg-violet-600 border-violet-500"] : amountAccomplishedPercentage >= 60 && amountAccomplishedPercentage < 80, // Caso entre 60% e 80% dos hábitos tenham sido concluídos, exibe uma cor violeta mais clara
          ["bg-violet-500 border-violet-400"] : amountAccomplishedPercentage >= 80, // Caso mais de 80% dos hábitos tenham sido concluídos, exibe uma cor violeta clara
          ["border-white border-4"] : isCurrentDay, // Caso a data seja a data atual, adiciona uma borda branca
        } 
      )}
      style={{ width: DAY_SIZE, height: DAY_SIZE }}
      activeOpacity={0.7}
      {...rest}
    />
  )
}
