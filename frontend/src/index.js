import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/bootstrap.custom.css';
import "./assets/index.css";
import  HomeScreen from './screens/HomePage.jsx';
import  ProductScreen from './screens/ProductScreen';
// import 'dotenv/config';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from  'react-router-dom';

const router = createBrowserRouter(
  createRoutesFromElements(
    // search is /, /product right cause the Route parent path is /
    <Route path="/" element={<App />}>
      <Route index path="/" element={<HomeScreen />}/>
      <Route index path="/product" element={<HomeScreen />}/>
      <Route path="/product/:id" element={<ProductScreen/>}/>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider  router={router}/>
  </React.StrictMode>
);


