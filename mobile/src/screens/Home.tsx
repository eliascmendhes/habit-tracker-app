import { useCallback, useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { api } from '../lib/axios';
import { generateRangeDatesFromYearStart } from '../utils/generate-range-between-dates';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { HabitDay, DAY_SIZE } from '../components/HabitDay';
import dayjs from 'dayjs';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']; // Define uma matriz com as iniciais dos dias da semana
const datesFromYearStart = generateRangeDatesFromYearStart(); // Gera um intervalo de datas desde o início do ano
const minimunSummaryDatesSizes = 18 * 5; // Define um tamanho mínimo para a seção de resumo dos hábitos
const amountOfDaysToFill = minimunSummaryDatesSizes - datesFromYearStart.length // Calcula o número de dias necessários para preencher o tamanho mínimo da seção de resumo

type SummaryProps = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}> // Define o tipo das propriedades do resumo de hábitos

export function Home() {
  const [loading, setLoading] = useState(true) // Define o estado do carregamento
  const [summary, setSummary] = useState<SummaryProps | null>(null) // Define o estado do resumo de hábitos

  const { navigate } = useNavigation() // Obtém a função 'navigate' para navegar entre as telas

  async function fetchData() { // Função para buscar os dados do resumo de hábitos
    try {
      setLoading(true) // Configura o status de carregamento para verdadeiro
      const response = await api.get('/summary'); // Faz uma solicitação GET para obter o resumo de hábitos

      setSummary(response.data) // Define o resumo de hábitos com base na resposta da API
    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos.') // Exibe um alerta ao usuário se houver um erro
      console.log(error) // Registra o erro no console
    } finally {
      setLoading(false) // Configura o status de carregamento para falso, independentemente do resultado da solicitação
    }
  }

  useFocusEffect(useCallback(() => { // Hook de efeito para buscar os dados do resumo de hábitos ao focar na tela
    fetchData()
  }, []))

  if (loading) { // Se ainda estiver carregando, exibe uma tela de carregamento
    return (
      <Loading />
    )
  }


  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <Header />

      <View className="flex-row mt-6 mb-2">
        {
          weekDays.map((weekDay, i) => ( // Exibe as iniciais dos dias da semana
            <Text 
              key={`${weekDay}-${i}`}
              className="text-zinc-400 text-xl font-bold text-center mx-1"
              style={{ width: DAY_SIZE }}
            >
              {weekDay}
            </Text>
          ))
        }
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {
          summary && ( // Se houver um resumo de hábitos, exibe os hábitos
            <View className='flex-row flex-wrap'>
              {
                datesFromYearStart.map(date => { // Para cada data desde o início do ano
                  const dayWithHabits = summary.find(day => { // Procura o resumo de hábitos para o dia
                    return dayjs(date).isSame(day.date, 'day')
                  })

                  return (
                    <HabitDay 
                      key={date.toISOString()}
                      date={date}
                      amountOfHabits={dayWithHabits?.amount}
                      amountCompleted={dayWithHabits?.completed}
                      onPress={() => navigate('habit', { date: date.toISOString() })} // Navega para a tela de hábitos ao pressionar o componente de hábito
                    />
                  )
                })
              }

              {
                amountOfDaysToFill > 0 && Array // Se faltarem dias para preencher a seção de resumo
                .from({ length: amountOfDaysToFill })
                .map((_, index) => (
                  <View 
                    key={index}
                    className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40" // Define o estilo dos dias faltantes
                    style={{ width: DAY_SIZE, height: DAY_SIZE }}
                  />
                ))
              }
            </View>
          )
        }
      </ScrollView>

    </View>

  )
} 