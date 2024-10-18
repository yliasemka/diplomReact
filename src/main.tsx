import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/app/App.tsx'
import "./style/style.scss"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
