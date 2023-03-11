import dayjs from "dayjs"
import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "./lib/prisma"

export async function appRoutes(app: FastifyInstance) {
  // Define a rota POST para criar hábitos
app.post('/habits', async (request) => {
  // Define um objeto com a forma esperada dos dados recebidos no corpo da solicitação
  const createHabitBody = z.object({
    title: z.string(), // título do hábito
    weekDays: z.array( // lista de dias da semana em que o hábito deve ser praticado
      z.number().min(0).max(6) // número entre 0 (domingo) e 6 (sábado)
    ),
  })

  // Extrai o título e a lista de dias da semana do corpo da solicitação
  const { title, weekDays } = createHabitBody.parse(request.body)

  // Obtém a data atual (sem informações de hora) usando a biblioteca dayjs
  const today = dayjs().startOf('day').toDate()

  // Cria um hábito no banco de dados usando o ORM Prisma
  await prisma.habit.create({
    data: {
      title, // título do hábito
      created_at: today, // data de criação do hábito
      weekDays: {
        create: weekDays.map((weekDay) => {
          return {
            week_day: weekDay,
          }
        }),
      }
    }
  })
})

// Define a rota GET para obter hábitos com base em um determinado dia da semana
app.get('/day', async (request) => {
  // Define um objeto com a forma esperada dos parâmetros de consulta da solicitação
  const getDayParams = z.object({
    date: z.coerce.date(), // data no formato de data/hora do JavaScript
  })

  // Extrai a data da solicitação
  const { date } = getDayParams.parse(request.query)

  // Cria um objeto dayjs a partir da data e define o dia da semana correspondente
  const parsedDate = dayjs(date).startOf('day')
  const weekDay = parsedDate.get('day')

  // Obtém todos os hábitos que foram criados antes da data fornecida e incluem o dia da semana fornecido
  const possibleHabits = await prisma.habit.findMany({
    where: {
      created_at: {
        lte: date,
      },
      weekDays: {
        some: {
          week_day: weekDay,
          }
        }
      },
    })

    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate.toDate(),
      },
      include: {
        dayHabits: true,
      }
    })

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id
    }) ?? []

    return {
      possibleHabits,
      completedHabits,
    }
  })

  app.patch('/habits/:id/toggle', async (request) => {
    const toggleHabitParams = z.object({
      id: z.string().uuid()
    })

    const { id } = toggleHabitParams.parse(request.params)

    const today = dayjs().startOf('day').toDate()

    let day = await prisma.day.findUnique({
      where: {
        date: today
      }
    })

    if(!day) {
      day = await prisma.day.create({
        data: {
          date: today
        }
      })
    }

    const dayHabit = await prisma.dayHabit.findUnique({
      where: {
        day_id_habit_id: {
          day_id: day.id,
          habit_id: id
        }
      }
    })

    if(dayHabit) {
      await prisma.dayHabit.delete({
        where: {
          id: dayHabit.id
        }
      })
    } else {
      await prisma.dayHabit.create({
        data: {
          day_id: day.id,
          habit_id: id
        }
      })
    }
  })

  app.get('/summary', async () => {
    const summary = await prisma.$queryRaw`
      SELECT 
        D.id, 
        D.date,
        (
          SELECT 
            cast(count(*) as float)
          FROM day_habits DH
          WHERE DH.day_id = D.id
        ) as completed,
        (
          SELECT
            cast(count(*) as float)
          FROM habit_week_days HDW
          JOIN habits H
            ON H.id = HDW.habit_id
          WHERE
            HDW.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
            AND H.created_at <= D.date
        ) as amount
      FROM days D
    `

    return summary
  })
}