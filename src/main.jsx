import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'react-bootstrap';
import { Provider } from 'react-redux';
import store from './redux/store.jsx';
import { HelmetProvider } from 'react-helmet-async';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
     <HelmetProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
        </BrowserRouter>
    </Provider>
    </HelmetProvider>
  </StrictMode>
);
