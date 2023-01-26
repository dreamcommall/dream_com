import React from "react";
import "./DetailBodyMiniThumbnail.css"

// 제품 상세페이지 메인 이미지 밑의 미리보기 이미지를 그려주는 컴포넌트
function DetailBodyMiniThumbnail({src}) {
    return (
        <img className={"mx-2 img-detail-mini-thumbnail"} src={src}/>
    );
}

export default DetailBodyMiniThumbnail;