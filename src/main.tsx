import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AdminDataLaypot from './components/AdminDataLaypot.tsx'
import { Toaster } from 'react-hot-toast'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
     <AdminDataLaypot>
       <App />
      </AdminDataLaypot>
      <Toaster
      position='top-center'
      toastOptions={{
        duration: 4000,
        success: {
          style: {
            background: "#E8F4F4",
            color: "#00B4A6",
          },
        },
        error: {
          style: {
            background: "#FF000040",
            color: "#FF0000",
          },
        },
      }}
    />
    </BrowserRouter>
  </StrictMode>,
)
