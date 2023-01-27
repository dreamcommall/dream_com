import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import DbTestYmh from "./DbTestYmh";
import LoginChk from "./LoginChk";
import ProductDetail from "./ProductDetail";
import Review from "./Review";
import InsertCart from "./InsertCart";
import SelectCart from "./SelectCart";
import Address from "./Address";
import SearchTest from "./SearchTest";
import Join from "./Join";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <App />
        {/* 양민호 db 테스트 용도*/}
        {/*<Join />*/}
        {/*<br />*/}
        {/*<br />*/}
        {/*<br />*/}
        {/*<DbTestYmh />*/}
        {/*<hr />*/}
        {/*<SearchTest />*/}

        {/* 김영민 db 테스트 용도*/}

        {/*<LoginChk />*/}
        {/*<Review />*/}
        {/*<hr />*/}
        {/*<InsertCart />*/}
        {/*  <hr />*/}
        {/*  <SelectCart />*/}
        {/*<hr />*/}
        {/*<Address />*/}

        {/*    까지 */}
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
