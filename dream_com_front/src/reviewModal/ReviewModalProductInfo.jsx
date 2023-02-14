import React, {useState} from "react";
import "./reviewModalCss/ReviewModalProductInfo.css";
import axios from "axios";

function ReviewModalProductInfo({productInfo}) {
    return(
        <div id={"div-reviewModal-info"}>
            <div id={"div-reviewModal-productImg"}>
                <img src={productInfo.thumbnailImg} />
            </div>
            <div className={"pt-2 nanumSquareR-font-normal"}>
                <p id={"p-reviewModal-productName"} title={productInfo.productName}>{productInfo.productName}</p>
                <p id={"p-reviewModal-productTitle"} title={productInfo.productTitle}>
                    {productInfo.productTitle}
                </p>
            </div>
        </div>
    )
}

export default ReviewModalProductInfo;