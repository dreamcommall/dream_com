import React from "react";

// 제품 상세페이지에서 중앙에 제품을 홍보하는 긴 이미지를 표시하는 컴포넌트
function DetailBodyProductMainImg({src}) {
    return (
        <div id={"div-detail-nav-img"} className={"mt-4 mb-4 d-flex justify-content-center"}>
            <img src={src} />
        </div>
    );
}

export default DetailBodyProductMainImg;