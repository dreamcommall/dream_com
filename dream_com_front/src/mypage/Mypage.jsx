import React from "react";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import BuyProductList from "./BuyProductList";
import Footer from "../common/Footer";
import MyPageNav from "./MyPageNav";

function Mypage(){

    return(
        <div>
            <HeaderD />
            <NavigationBar />
            <MyPageNav />
            <BuyProductList />
            <Footer />
        </div>
    )
}

export default Mypage;