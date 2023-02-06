import React from "react";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import MyPageNav from "./MyPageNav";
import MypageCart from "./MypageCart";
import Footer from "../common/Footer";

function DreamComCart(){
    return(
        <div>
            <HeaderD />
            <NavigationBar />
            <MyPageNav />
            <MypageCart />
            <Footer />
        </div>
    )
}

export default DreamComCart;