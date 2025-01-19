import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'react-quill/dist/quill.snow.css';
import './index.css'
import './assets/shared.css'

import App from './App.jsx'
import {NextUIProvider} from '@nextui-org/react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextUIProvider>
      <App />
    </NextUIProvider>
  </StrictMode>,
)
