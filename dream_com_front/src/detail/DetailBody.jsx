import React from "react";
import DetailBodyProductInfo from "./DetailBodyProductInfo";
import DetailBodyProductPurchaseTip from "./DetailBodyProductPurchaseTip";
import DetailBodyProductMainImg from "./DetailBodyProductMainImg";
import DetailBodyProductInfoSummary from "./DetailBodyProductInfoSummary";
import DetailBodyProductReviewSummary from "./DetailBodyProductReviewSummary";

function DetailBody() {
    return (
        <div>
            <DetailBodyProductInfo />
            <DetailBodyProductPurchaseTip />
            <DetailBodyProductMainImg src={"/images/product_test_main_img.jpg"} />
            <DetailBodyProductInfoSummary />
            <DetailBodyProductReviewSummary />
        </div>
    );
}

export default DetailBody;