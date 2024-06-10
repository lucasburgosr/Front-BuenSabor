import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { Provider } from 'react-redux'
import  store  from '../src/redux/store/store.ts'
import { AtributosContextProvider } from './context/AtributosContext'
ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    <AtributosContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AtributosContextProvider>
  </React.StrictMode>,
)
