import * as Checkbox from '@radix-ui/react-checkbox';
import { Popover } from '@radix-ui/react-popover';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitListProps {
  date: Date;
  onCompletedChanged: (completed: number) => void;
}

interface HabitsInfo {
  possibleHabits: Array<{
    id: string;
    title: string;
    created_at: string;
  }>;
  completedHabits: string[];
}

export function HabitsList({ date, onCompletedChanged }: HabitListProps) {
  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>();

  // Busca informações dos hábitos do dia na API ao montar o componente
  useEffect(() => {
    api.get('day', {
      params: {
        date: date.toISOString(),
      },
    }).then(response => {
      setHabitsInfo(response.data);
    });
  }, []);

  // Checa se a data é passada para desabilitar os checkboxes
  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  // Altera o estado de conclusão de um hábito e atualiza a API
  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyCompleted = habitsInfo!.completedHabits.includes(habitId);

    await api.patch(`/habits/${habitId}/toggle`);

    let completedHabits: string[] = [];

    if (isHabitAlreadyCompleted) {
      completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId);
    } else {
      completedHabits = [...habitsInfo!.completedHabits, habitId];
    }

    // Atualiza o estado local dos hábitos e chama o callback para atualizar o contador
    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    });

    onCompletedChanged(completedHabits.length);
  }

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitsInfo?.possibleHabits.map(habit => (
        <Checkbox.Root
          key={habit.id}
          onCheckedChange={() => handleToggleHabit(habit.id)}
          checked={habitsInfo.completedHabits.includes(habit.id)}
          className='flex items-center gap-3 group'
          disabled={isDateInPast}
        >
          <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors'>
            <Checkbox.Indicator>
              <Check size={20} className='text-white' />
            </Checkbox.Indicator>
          </div>
          <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
            {habit.title}
          </span>
        </Checkbox.Root>
      ))}
    </div>
  );
}
