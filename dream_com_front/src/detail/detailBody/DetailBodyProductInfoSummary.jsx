import React, {useEffect, useState} from "react";
import "../detailCss/DetailBodyProductInfoSummary.css"

// 제품의 정보를 표시해주는 컴포넌트(하단에 위치)
function DetailBodyProductInfoSummary({productInfo}) {
    const [productNumber, setProductNumber] = useState(0);
    
    useEffect(() => {
        if (productInfo == undefined) {
            return;
        }
        setProductNumber(productInfo[0].productNum);
    }, [productInfo])
    
    return (
        <div id={"div-detail-product-summary"}>
            <h4>상품 정보 제공 고시</h4>
            <div>
                <p>상품번호</p>
                <p>{productNumber}</p>
            </div>
            <div>
                <p>상품상태</p>
                <p>새제품</p>
            </div>
            <div>
                <p>품명 및 모델명</p>
                <p>상세페이지 참조</p>
            </div>
            <div>
                <p>허가 관련</p>
                <p>상세페이지 참조</p>
            </div>
            <div>
                <p>제조국 또는 원산지</p>
                <p>상세페이지 참조</p>
            </div>
        </div>
    );
}

export default DetailBodyProductInfoSummary;