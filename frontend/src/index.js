import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/bootstrap.custom.css';
import "./assets/index.css";
import  HomeScreen from './screens/HomePage.jsx';
import  ProductScreen from './screens/ProductScreen';
import  store from './RTK/store.js'
import { Provider } from 'react-redux';
import CartScreen from './screens/CartScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
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
      <Route path="/login" element={<LoginScreen/>}/>
      <Route path="/cart" element={<CartScreen/>}/>
    </Route>
  )
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store ={store}>
      <RouterProvider  router={router}/>
    </Provider>
  </React.StrictMode>
);