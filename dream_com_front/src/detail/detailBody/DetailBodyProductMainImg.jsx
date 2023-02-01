import React, {useEffect, useState} from "react";

// 제품 상세페이지에서 중앙에 제품을 홍보하는 긴 이미지를 표시하는 컴포넌트
function DetailBodyProductMainImg({productInfo}) {
    const [imgSrc, setImgSrc] = useState(""); // 메인 광고 이미지 경로
    
    useEffect(() => {
        if (productInfo == undefined) {
            return;
        }
        setImgSrc(productInfo[0].detailImg);
    }, [productInfo]);
    
    return (
        <div id={"div-detail-nav-img"} className={"mt-4 mb-4 d-flex justify-content-center"}>
            <img src={imgSrc} />
        </div>
    );
}

export default DetailBodyProductMainImg;