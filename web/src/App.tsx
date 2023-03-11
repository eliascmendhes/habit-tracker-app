// Importa os componentes necessários
import { Header } from './components/Header';
import { SummaryTable } from './components/SummaryTable';

// Importa o CSS global e a biblioteca dayjs
import './lib/dayjs';
import './styles/global.css';

// Define o componente principal do aplicativo
export function App() {
  return (
    // Define a estrutura básica da interface do usuário
    <div className='w-screen h-screen flex justify-center items-center'>
      <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
        {/* Renderiza o componente do cabeçalho */}
        <Header />
        {/* Renderiza a tabela de resumo */}
        <SummaryTable />
      </div>
    </div>
  );
}
