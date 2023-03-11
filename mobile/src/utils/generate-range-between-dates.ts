import dayjs from 'dayjs'

/**
 * Função que retorna um array de objetos Date representando cada dia desde o início do ano até a data atual.
 * 
 * @returns {Date[]} Array com as datas de cada dia do ano até a data atual.
 */
export function generateRangeDatesFromYearStart() {
  // Obtém a data do início do ano usando a biblioteca dayjs
  const startDate = dayjs().startOf('year')
  // Define a data final como a data atual
  const endDate = new Date()

  // Inicializa o array de datas vazio
  let dateRange = []
  // Define a data de início como a data inicial
  let compareDate = startDate

  // Enquanto a data de comparação é anterior à data final, adiciona um dia e adiciona a data ao array
  while (compareDate.isBefore(endDate)) {
    dateRange.push(compareDate.toDate())
    compareDate = compareDate.add(1, 'day')
  }

  // Retorna o array completo de datas
  return dateRange
}
