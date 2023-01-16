import React from "react";
import AdvertisementTop from "./main/AdvertisementTop";
import PopularProduct from "./main/PopularProduct";

function App() {
    return (
        <div className={"container-fluid"}>
            <div className={"row"}>
                <div className={"col"}>
                    <AdvertisementTop/>
                    <PopularProduct />
                </div>
            </div>
        </div>
    );
}

export default App;
