import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '/src/styles/tailwind.css'
import App from '/src/App.jsx'

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
