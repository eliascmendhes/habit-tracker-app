// Importa os componentes necessários
import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';
import clsx from 'clsx';
import dayjs from 'dayjs';
import { HabitsList } from './HabitsList';
import { useState } from 'react';

// Define a interface das propriedades recebidas pelo componente
interface HabitDayProps {
  date: Date;
  defaultCompleted?: number;
  amount?: number;
}

// Define o componente principal que renderiza o círculo de progresso do hábito
export function HabitDay({ defaultCompleted = 0, amount = 0, date }: HabitDayProps) {
  // Define o estado do progresso concluído do hábito
  const [completed, setCompleted] = useState(defaultCompleted);
  
  // Calcula a porcentagem concluída do hábito
  const completedPorcentage = amount > 0 ? Math.round((completed / amount) * 100) : 0;

  // Formata a data e o dia da semana para exibição
  const dayAndMonth = dayjs(date).format('DD/MM');
  const dayOfWeek = dayjs(date).format('dddd');

  // Função para lidar com a alteração do progresso concluído
  function handleAmountCompletedChanged(completed: number) {
    setCompleted(completed);
  }

  return (
    // Renderiza o componente Popover com o círculo de progresso do hábito
    <Popover.Root>
      <Popover.Trigger
        // Define a classe CSS para o círculo de progresso com base na porcentagem concluída
        className={clsx('w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background', {
          'bg-zinc-900 border-zinc-800': completedPorcentage === 0,
          'bg-violet-900 border-violet-700': completedPorcentage > 0 && completedPorcentage < 20,
          'bg-violet-800 border-violet-500': completedPorcentage >= 20 && completedPorcentage < 40,
          'bg-violet-700 border-violet-500': completedPorcentage >= 40 && completedPorcentage < 50,
          'bg-violet-600 border-violet-500': completedPorcentage >= 60 && completedPorcentage < 80,
          'bg-violet-500 border-violet-400': completedPorcentage >= 80,
        })}
      />
      {/* Define o conteúdo do Popover */}
      <Popover.Portal>
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col'>
          <span className='font-semibold text-zinc-400'>{dayOfWeek}</span>
          <span className='mt-1 font-extrabold leading-tight text-3xl'>{dayAndMonth}</span>
          {/* Renderiza a barra de progresso */}
          <ProgressBar progress={completedPorcentage} />
          {/* Renderiza a lista de hábitos */}
          <HabitsList date={date} onCompletedChanged={handleAmountCompletedChanged} />
          {/* Renderiza a seta do Popover */}
          <Popover.Arrow height={8} width={16} className='fill-zinc-900' />
        </Popover.Content>

      </Popover.Portal>
    </Popover.Root>
  );
}
