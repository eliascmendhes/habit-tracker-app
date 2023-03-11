import Fastify from 'fastify'
import cors from '@fastify/cors'

import { appRoutes } from "./routes"

// Cria uma instância do Fastify
const app = Fastify()

// Registra o plugin de CORS no Fastify
app.register(cors)

// Registra as rotas definidas no arquivo "routes.ts" no Fastify
app.register(appRoutes)

// Inicia o servidor web na porta 3333
app.listen({
  port: 3333,
  host: '0.0.0.0',
}).then(() => {
  console.log('HTTP Server running!')
})
