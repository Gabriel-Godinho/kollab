import React from 'react'
import ReactDOM from 'react-dom/client'
import Login from './pages/login'
import GlobalStyle from './pages/styles/global'
import Routering from './routes/routes'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Routering />
  </React.StrictMode>
);
