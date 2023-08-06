import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './globalStyles'
import { RouterProvider } from 'react-router-dom';
import router from './router'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <GlobalStyles />
    <RouterProvider router={router} />
  </>
);

