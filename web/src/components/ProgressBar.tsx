interface ProgressBarProps {
  progress: number // Propriedade que representa o progresso do componente em porcentagem
}

// Componente que renderiza uma barra de progresso
export function ProgressBar(props: ProgressBarProps) {
  return (
    <div className='h-3 rounded-3xl bg-zinc-700 w-full mt-4'>
      {/* Elemento que representa o progresso da barra */}
      <div
        role={'progressbar'}
        aria-label="progresso de hábitos"
        aria-valuenow={props.progress}
        className='h-3 rounded-xl bg-violet-600 transition-all'
        style={{
          width: `${props.progress}%`
        }}
      />
    </div>
  )
}
