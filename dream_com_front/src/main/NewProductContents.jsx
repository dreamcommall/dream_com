import React from "react";
import "../fonts/fontStyle.css"
import "./NewProductContents.css"

// 작성자 : MoonNight285
// 신규등록 상품을 보여주는 컴포넌트에서 캐러셀안에 사용되는 아이템을 만들어주는 컴포넌트
// src => 이미지 경로
// company => 제조 회사명
// content => 제품명
// price => 제품의 가격
// discountPercent => 제품의 할인율(없는경우 0)
function NewProductContents({src, company, content, price, discountPercent}) {
    return (
        <div id={"div-new-product-contents"} title={content}>
            <img src={src} />
            <h6 title={company} className={"nanumSquareR-font-normal"}>{company}</h6>
            <p className={"mb-1 nanumSquareR-font-normal"}>{content}</p>
            <div id={"div-new-product-price-info"} className={"d-flex justify-content-between me-1"}>
                {
                    discountPercent == 0 ? <p /> : <p className={"nanumSquareB-font-normal"}>{discountPercent}% 할인</p>
                }
                <p className={"nanumSquareR-font-normal"}>{price - ((price / 100) * discountPercent)}원</p>
            </div>
        </div>
    );
}

export default NewProductContents;