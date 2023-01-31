import React from "react";
import DetailBodyMiniThumbnail from "./DetailBodyMiniThumbnail";
import "./DetailBodyProductInfo.css"
import DetailBodyProductSubInfo from "./DetailBodyProductSubInfo";

const productMiniThumbnailList = [
    {key : 0, src : "/images/MainRollingBanner_139003.jpg"},
    {key : 1, src : "/images/MainRollingBanner_139003.jpg"},
    {key : 2, src : "/images/MainRollingBanner_139003.jpg"}
]

// 상품의 이미지나 가격정보를 보여주는 컴포넌트
function DetailBodyProductInfo(props) {
    return (
        <div className={"d-flex"}>
            <div id={"div-detail-product-info-thumbnail"}>
                <img id={"img-detail-main-thumbnail"} src={"/images/MainRollingBanner_139003.jpg"} />
                <div className={"d-flex justify-content-center"}>
                    {
                        productMiniThumbnailList.map(item => {
                            return <DetailBodyMiniThumbnail key={item.key} src={item.src} />
                        })
                    }
                </div>
            </div>
            <DetailBodyProductSubInfo />
        </div>
    );
}

export default DetailBodyProductInfo;