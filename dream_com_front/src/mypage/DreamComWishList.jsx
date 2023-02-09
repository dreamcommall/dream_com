import React from "react";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import MyPageNav from "./MyPageNav";
import Footer from "../common/Footer";
import MypageWishList from "./MypageWishList";

function DreamComWishList(){
    return(

    <div className={"container-fluid"}>
        <HeaderD />
        <NavigationBar />
        <div className={"container"}>
            <MyPageNav />
            <MypageWishList />
        </div>
        <Footer />
    </div>
    )
}

export default DreamComWishList;