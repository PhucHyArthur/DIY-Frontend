import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import App from './App'
import './index.css'
import { TokenProvider } from './context/TokenContext'
import DataProvider from './context/Context'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <DataProvider>
        <TokenProvider>
          <App />
        </TokenProvider>
      </DataProvider>
    </ChakraProvider>
  </React.StrictMode>
)
