import React from "react";
import HeaderD from "../common/HeaderD";
import NavigationBar from "../common/NavigationBar";
import MyPageNav from "./MyPageNav";
import Footer from "../common/Footer";
import MypageWishList from "./MypageWishList";

function DreamComWishList(){
    return(
        <div>
            <HeaderD />
            <NavigationBar />
            <MyPageNav />
            <MypageWishList />
            <Footer />
        </div>
    )
}

export default DreamComWishList;