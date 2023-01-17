import React from "react";
import AdvertisementTop from "./AdvertisementTop";
import PopularProduct from "./PopularProduct";
import AdvertisementMiddle from "./AdvertisementMiddle";
import AdvertisementBridge from "./AdvertisementBridge";
import RecommendProduct from "./RecommendProduct";
import RepeatProductPage from "./RepeatProductPage";

// 작성자 : MoonNight285
// 메인페이지에서 사용하는 컴포넌트들을 조합해주는 컴포넌트
function MainPageApp() {
    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col"}>
                    <AdvertisementTop/>
                    <PopularProduct />
                    <AdvertisementMiddle />
                    <AdvertisementBridge />
                    <RecommendProduct />
                    <RepeatProductPage />
                </div>
            </div>
        </div>
    );
}

export default MainPageApp;