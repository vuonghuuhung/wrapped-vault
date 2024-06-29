import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'src/App';
import '../app/globals.css';
import { BrowserRouter } from 'react-router-dom';

import '@rainbow-me/rainbowkit/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
);
