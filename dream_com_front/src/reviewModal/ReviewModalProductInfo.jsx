import React, {useState} from "react";
import "./ReviewModalProductInfo.css";
import axios from "axios";

function ReviewModalProductInfo(props) {
    const productInfo = () => {
        axios.get("http://localhost:8080/fullProductInfo", {params: {productNum : 230130001}})
            .then(req => {
                console.log(req);
            })
            .catch(err => {
                console.log("에러");
            })
    }

    return(
        <div id={"div-reviewModal-info"}>
            <div id={"div-reviewModal-productImg"}>
                <img src={"/images/MainRollingBanner_139003.jpg"} />
            </div>
            <div className={"pt-2 nanumSquareR-font-normal"}>
                <p id={"p-reviewModal-productName"} title={"ThinkStation P358"}>ThinkStation P358</p>
                <p id={"p-reviewModal-productTitle"}
                   title={"[레노버] ThinkStation P358 TWR-30GLS00A00 AMD R7-5845 [16G/512G/T1000/Win11Pro] [기본제품]"}>
                    [레노버] ThinkStation P358 TWR-30GLS00A00 AMD R7-5845 [16G/512G/T1000/Win11Pro] [기본제품]
                </p>
            </div>
        </div>
    )
}

export default ReviewModalProductInfo;