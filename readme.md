# Habit Tracker App

Este é um aplicativo de rastreamento de hábitos desenvolvido usando as tecnologias React, React Native e Fastify.

## Web

A versão web do aplicativo é construída usando [Vite](https://vitejs.dev/) como bundler e [Tailwind CSS](https://tailwindcss.com/) como framework de estilo. As dependências adicionais incluem:

-   axios
-   clsx
-   dayjs
-   phosphor-react

Para executar a aplicação, é necessário executar o comando `npm run dev`.

## Server

O backend do aplicativo é construído usando o framework [Fastify](https://www.fastify.io/) e usa o ORM [Prisma](https://www.prisma.io/) para gerenciar o banco de dados. As dependências adicionais incluem:

-   @fastify/cors
-   @prisma/client
-   dayjs
-   zod

Para executar a aplicação, é necessário executar o comando `npm run dev`.

## Mobile

A versão mobile do aplicativo é construída usando o framework [Expo](https://expo.io/) e utiliza as bibliotecas [React Navigation](https://reactnavigation.org/) para gerenciamento de rotas e [NativeWind](https://nativewind.io/) para estilos. As dependências adicionais incluem:

-   axios
-   clsx
-   dayjs
-   react-native-svg
-   react-native-reanimated

Para executar a aplicação, é necessário ter o ambiente de desenvolvimento do React Native configurado e executar o comando `npm start`. É possível executar a aplicação em emuladores iOS e Android, bem como em um navegador da web.
