import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Alert, ScrollView, Text, View } from "react-native";
import dayjs from "dayjs";
import clsx from "clsx";

import { api } from "../lib/axios";
import { generateProgressPercentage } from '../utils/generate-progress-percentage'

import { BackButton } from "../components/BackButton";
import { Checkbox } from "../components/Checkbox";
import { HabitsEmpty } from '../components/HabitsEmpty'
import { Loading } from "../components/Loading";
import { ProgressBar } from "../components/Progress.Bar";

interface Params {
  date: string;
}

interface DayInfoProps {
  completedHabit: string[];
  possibleHabits: {
    id: string
    title: string
  }[]
}

export function Habit() {
const [loading, setLoading] = useState(true)
const [dayInfo, setDayInfo] = useState<DayInfoProps | null>(null)
const [completedHabits, setCompletedHabits] = useState<string[]>([])

const route = useRoute()
const { date } = route.params as Params; // Extrai o parâmetro 'date' da rota

const habitsProgress = dayInfo?.possibleHabits.length 
? generateProgressPercentage(dayInfo.possibleHabits.length, completedHabits.length)
: 0 // Define a porcentagem de progresso com base nas informações do dia e hábitos concluídos

const parsedDate = dayjs(date); // Analisa a data fornecida
const isDateInPast = parsedDate.endOf('day').isBefore(new Date()) // Verifica se a data fornecida é anterior ao dia atual
const dayOfWeek = parsedDate.format('dddd'); // Formata a data para exibir o dia da semana
const dayAndMonth = parsedDate.format('DD/MM'); // Formata a data para exibir dia e mês

async function fetchHabits() { // Função para buscar hábitos do dia
  try {
    setLoading(true) // Configura o status de carregamento para verdadeiro
    const response = await api.get('/day', {params: {date}}) // Faz uma solicitação GET para obter os hábitos do dia

    setDayInfo(response.data) // Define as informações do dia com base na resposta da API
    setCompletedHabits(response.data.completedHabits) // Define os hábitos concluídos com base na resposta da API

  } catch (error){
    console.log(error) // Registra qualquer erro no console
    Alert.alert('ops', 'Não foi dessa vez.') // Exibe um alerta ao usuário
  }

  finally {
    setLoading(false) // Configura o status de carregamento para falso, independentemente do resultado da solicitação
  }
}

async function handleToggleHabit(habitId: string) { // Função para alternar o status do hábito
  try {
    await api.patch(`/habits/${habitId}/toggle`) // Faz uma solicitação PATCH para alternar o status do hábito

    if(completedHabits.includes(habitId)) { // Verifica se o hábito está na lista de hábitos concluídos
      setCompletedHabits(prevState => prevState.filter(habit => habit !== habitId)) // Remove o hábito da lista de hábitos concluídos
    } else {
      setCompletedHabits(prevState => [...prevState, habitId]) // Adiciona o hábito à lista de hábitos concluídos
    }
  } catch(error) {
    console.log(error) // Registra qualquer erro no console
    Alert.alert('ops', 'não foi possível atualizar o status do hábito') // Exibe um alerta ao usuário
  }    
}

useEffect(() => { // Hook de efeito para buscar hábitos do dia ao montar o componente
  fetchHabits()
}, [])

if(loading) { // Se ainda estiver carregando, exibe uma tela de carregamento
  return (
    <Loading />
  )
}

return (
  <View className="flex-1 bg-background px-8 pt-16">
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
<BackButton />

<Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
  {dayOfWeek}
</Text>

<Text className="text-white font-extrabold text-3xl">
  {dayAndMonth}
</Text>

{/*  /> // Exibe uma barra de progresso com base nos hábitos concluídos */}
<ProgressBar progress={habitsProgress} />
<View className={clsx("mt-6", {
  ["opacity-50"] : isDateInPast
})}>
 {
  dayInfo?.possibleHabits ? // Se há hábitos disponíveis para o dia
  dayInfo?.possibleHabits.map(habit => (
    <Checkbox 
    key={habit.id} 
    title={habit.title} 
    checked={completedHabits.includes(habit.id)} // Verifica se o hábito foi concluído
    disabled={isDateInPast} // Desativa a caixa de seleção se a data for anterior ao dia atual
    onPress={() => handleToggleHabit(habit.id)} // Chama a função para alternar o status do hábito ao pressionar a caixa de seleção
    />
  ))

  : <HabitsEmpty /> // Se não houver hábitos disponíveis, exibe uma mensagem indicando que não há hábitos para o dia
 }
</View>

{
  isDateInPast && ( // Se a data for anterior ao dia atual, exibe uma mensagem indicando que os hábitos não podem ser editados
    <Text className="text-white mt-10 text-center">
      Você não pode editar um hábito de uma data passada.
    </Text>
  )
}

      </ScrollView>
    </View>
  )
}