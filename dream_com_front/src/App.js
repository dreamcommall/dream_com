import React from "react";
import AdvertisementTop from "./main/AdvertisementTop";
import PopularProduct from "./main/PopularProduct";
import AdvertisementMiddle from "./main/AdvertisementMiddle";
import AdvertisementBridge from "./main/AdvertisementBridge";

function App() {
    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col"}>
                    <AdvertisementTop/>
                    <PopularProduct />
                    <AdvertisementMiddle />
                    <AdvertisementBridge />
                </div>
            </div>
        </div>
    );
}

export default App;
