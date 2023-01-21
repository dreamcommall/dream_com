import React from "react";
import "./DetailBodyMiniThumbnail.css"

function DetailBodyMiniThumbnail({src}) {
    return (
        <img className={"mx-2 img-detail-mini-thumbnail"} src={src}/>
    );
}

export default DetailBodyMiniThumbnail;