import React from "react";

function DetailBodyProductMainImg({src}) {
    return (
        <div id={"div-detail-nav-img"} className={"mt-4 mb-4 d-flex justify-content-center"}>
            <img src={src} />
        </div>
    );
}

export default DetailBodyProductMainImg;