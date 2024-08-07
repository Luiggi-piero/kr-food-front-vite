import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { LoadingProvider } from './hooks/useLoading.jsx'
import { AuthProvider } from './hooks/useAuth.jsx'
import CartProvider from './hooks/useCart.jsx'
import { ToastContainer } from 'react-toastify'
import './axiosConfig.js'; // al importar este archivo ejecutamos la configuracion de axios con la ruta base
import 'react-toastify/dist/ReactToastify.css';
import './interceptors/authInterceptor.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <AuthProvider>
          <CartProvider>
            <App />
            <ToastContainer
              position='bottom-right'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
          </CartProvider>
        </AuthProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>,
)
