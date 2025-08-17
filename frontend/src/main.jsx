import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { store } from './redux/store.js'
import './assets/styles/globals.css'

// Ant Design theme configuration
const theme = {
  token: {
    colorPrimary: '#3498db',
    colorBgContainer: '#f0f2f5',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#3498db',
    borderRadius: 6,
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
)
