import React from "react";
import DetailBodyMiniThumbnail from "./DetailBodyMiniThumbnail";
import "./DetailBodyProductInfo.css"

const productMiniThumbnailList = [
    {key : 0, src : "/images/MainRollingBanner_139003.jpg"},
    {key : 1, src : "/images/MainRollingBanner_139003.jpg"},
    {key : 2, src : "/images/MainRollingBanner_139003.jpg"}
]

function DetailBodyProductInfo() {
    return (
        <div>
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
        </div>
    );
}

export default DetailBodyProductInfo;