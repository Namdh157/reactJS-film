'use client';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { ToastContainer } from 'react-toastify'
import { Provider } from "react-redux";
import { store } from './store/store.ts'

const theme = createTheme({
  palette: {
    primary: {
      main: "#dc3545",
      dark: 'rgba(255, 255, 255, 0.3)',
      contrastText: "#828387",
    },
    secondary: {
      main: "#bb2d3b"
    }
  },
  typography: {
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    fontSize: 12,
  }
})  

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* <StrictMode> */}
        <App />
        {/* </StrictMode> */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
  ,
)
