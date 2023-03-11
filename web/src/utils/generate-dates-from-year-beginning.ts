import dayjs from 'dayjs';

// Função que gera uma lista de datas a partir do começo do ano até a data atual
export function generateDatesFromYearBeginning() {
  const firstDayOfYear = dayjs().startOf('year'); // Obtém o primeiro dia do ano atual
  const today = new Date(); // Obtém a data atual
  const dates = []; // Inicializa uma lista vazia de datas
  let compareDate = firstDayOfYear; // Inicializa a data de comparação com o primeiro dia do ano
  
  // Percorre as datas a partir do primeiro dia do ano até a data atual e adiciona à lista de datas
  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, 'day');
  }

  return dates; // Retorna a lista de datas
}
