// Importa as dependências necessárias
import { useEffect, useState } from "react"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"
import {api} from "../lib/axios"
import dayjs from "dayjs"

// Define a lista de dias da semana e gera uma lista de datas a partir do começo do ano
const weekDays = ['D', 'S', 'T', 'Q',  'Q', 'S', 'S', ]
const summaryDates = generateDatesFromYearBeginning()

// Define o tamanho mínimo para a lista de datas e calcula a quantidade de dias que faltam para preencher
const minimumSummaryDatesSize = 18 * 7
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type Summary = {
  id:string,
  date: string,
  amount: number,
  completed: number
}[]

// Componente que renderiza a tabela de resumo de hábitos
export function SummaryTable() {
  // Define o estado do resumo de hábitos
  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    // Faz uma requisição GET para a API para obter o resumo de hábitos
    api.get('summary').then(response => {
      setSummary(response.data)
    })
  }, [])

  // Renderiza a tabela de resumo de hábitos
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {/* Renderiza os dias da semana */}
        {weekDays.map((weekDay, i)  => {
          return (
            <div key={`${weekDay}-${i}`} className="text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center">
              {weekDay}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {/* Renderiza os dias com o componente HabitDay */}
        {summary.length > 0 && summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })
          return (
            <HabitDay
              date={date}
              amount={dayInSummary?.amount}
              defaultCompleted={dayInSummary?.completed} 
              key={date.toString()}
            />
          )
        })}

        {/* Renderiza dias em branco para preencher o mínimo de dias */}
        {amountOfDaysToFill > 0 && Array.from({length: amountOfDaysToFill}).map((_, i) => {
          return (
            <div key={i} className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursosr-not-allowed" />
          )
        })}
      </div>
    </div>
  )
}
