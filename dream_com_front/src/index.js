import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Test from "./Test";
import LoginChk from "./LoginChk";
import ProductDetail from "./ProductDetail";
import Review from "./Review";
import InsertCart from "./InsertCart";
import SelectCart from "./SelectCart";
import Address from "./Address";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <LoginChk />
    {/*<Test />*/}
      {/*<App />*/}
      <ProductDetail />
      <Review />
      <hr />
      <InsertCart />
        <hr />
        <SelectCart />
      <hr />
      <Address />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
