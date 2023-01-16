import React from "react";
import AdvertisementTop from "./main/AdvertisementTop";
import PopularProduct from "./main/PopularProduct";
import AdvertisementMiddle from "./main/AdvertisementMiddle";

function App() {
    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col"}>
                    <AdvertisementTop/>
                    <PopularProduct />
                    <AdvertisementMiddle />
                </div>
            </div>
        </div>
    );
}

export default App;
