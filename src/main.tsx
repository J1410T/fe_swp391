import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/styles.css';
import App from '@/App.tsx'
import '@/assets/styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
