import React from "react";
import AdvertisementTop from "./main/AdvertisementTop";
import PopularProduct from "./main/PopularProduct";
import AdvertisementMiddle from "./main/AdvertisementMiddle";
import AdvertisementBridge from "./main/AdvertisementBridge";
import RecommendProduct from "./main/RecommendProduct";
import RepeatProductPage from "./main/RepeatProductPage";

function App() {
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

export default App;
