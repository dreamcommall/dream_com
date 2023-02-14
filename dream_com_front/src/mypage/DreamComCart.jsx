import React from "react";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import MyPageNav from "./MyPageNav";
import MypageCart from "./MypageCart";
import Footer from "../common/Footer";

function DreamComCart(){
    return(
        <div className={"container-fluid"}>
            <HeaderD />
            <NavigationBar />
            <div className={"container"}>
                <MyPageNav />
                <MypageCart />
            </div>
            <Footer />
        </div>
    )
}

export default DreamComCart;