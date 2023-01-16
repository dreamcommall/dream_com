import React from "react";

const midImgSize = {
    width : 650,
    height : 200,
    borderRadius : 10
}

function AdvertisementMiddleContents({title, src}) {
    return (
        <div className="carousel-item active">
            <div className={"d-flex justify-content-center"}>
                <img style={midImgSize} src="/images/advertisementMid1.png" className="d-block" alt="..."/>
            </div>
        </div>
    )
}

export default AdvertisementMiddleContents;