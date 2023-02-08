import React from "react";
import "./ReviewModalImage.css";

function ReviewModalImage({setImgPath, previewImg}) {
    return (
        <div id={"div-reviewModal-imgUpload"}>
            <div id={"div-reviewModal-img"}>
                <input type={"file"} accept={".gif, .jpg, .png"} onChange={setImgPath} id={"input-reviewModal-img"} />
                <label htmlFor={"input-reviewModal-img"} className={"nanumSquareB-font-XLarge"}><span>📁 사진 첨부하기</span></label>
            </div>
            <div id={"div-reviewModal-previewImg"}>
                {previewImg.map((item) => {
                    return (
                        <img key={item} src={item} id={"img-reviewModal-previewImg"}/>
                    )
                })}
            </div>
        </div>
    )
}

export default ReviewModalImage;