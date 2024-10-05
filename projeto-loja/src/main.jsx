import { StrictMode } from 'react' // Importa o StrictMode do React
import { createRoot } from 'react-dom/client' // Importa o createRoot do ReactDOM
import App from './App.jsx' // Importa o componente App
import './index.css' // Importa o arquivo de estilos

createRoot(document.getElementById('root')).render( // Cria a raiz do aplicativo e renderiza o componente App
  <StrictMode> {/* StrictMode é usado para identificar problemas potenciais no código */}
    <App /> {/* Renderiza o componente App */}
  </StrictMode>,
)
