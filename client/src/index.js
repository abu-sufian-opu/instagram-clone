import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthContextProvider from './providers/AuthContextProvider';
import App from './App';
import LoaderContextprovider from './providers/LoaderContextprovider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <LoaderContextprovider>
          <App/>
        </LoaderContextprovider>
      </AuthContextProvider>
      
    </BrowserRouter>
  </React.StrictMode>
);
