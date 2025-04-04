import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HyperlightProvider } from './hyperlight'

createRoot(document.getElementById('root')).render(
  <HyperlightProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </HyperlightProvider>
)