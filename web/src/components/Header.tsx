// Importa as bibliotecas e componentes necessários
import { useState } from 'react'
import { Plus, SelectionSlash, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog' 
import logoImage from '../assets/logo.svg'
import { NewHabitForm } from './NewHabitForm'

// Define o componente Header
export function Header() {
 
  // Retorna a estrutura do cabeçalho
  return (
    <div className='w-full max-w-3xl mx-auto flex items-center justify-between'>
      {/* Renderiza a imagem do logotipo */}
      <img src={logoImage} alt="" />

      {/* Renderiza o botão "Novo hábito" */}
      <Dialog.Root>
        <Dialog.Trigger
          className='border border-violet-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus:ring-offset-background'
          type='button'
        >
          <Plus size={20} className='text-violet-500'/>
          Novo hábito
        </Dialog.Trigger>

        {/* Renderiza o formulário de criação de novo hábito */}
        <Dialog.Portal>
          <Dialog.Overlay className='w-screen h-screenn bg-black/80 fixed inset-0'/>
          <Dialog.Content className='absolute p-10 bg-zinc-900 rounded-xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            {/* Renderiza o botão de fechar o diálogo */}
            <Dialog.Close className='absolute right-6 top-6 text-zing-400 hover:text-zing-200'>
              <X size={24} aria-label="Fechar" />
            </Dialog.Close>
            {/* Renderiza o título do diálogo */}
            <Dialog.Title className='text-3xl loading-tight text-white font-extrabold'>
              Criar hábito
            </Dialog.Title>
            {/* Renderiza o formulário de criação de novo hábito */}
            <NewHabitForm />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>  
  )
}
