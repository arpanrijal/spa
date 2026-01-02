import { StrictMode, React } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router"
import App from './App'
import './index.css'
import DataContext from './context/DataContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DataContext>
  </StrictMode>
)
