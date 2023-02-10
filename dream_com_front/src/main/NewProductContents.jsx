import React from "react";
import "../fonts/fontStyle.css"
import "./NewProductContents.css"
import {Link} from "react-router-dom";

// 작성자 : MoonNight285
// 신규등록 상품을 보여주는 컴포넌트에서 캐러셀안에 사용되는 아이템을 만들어주는 컴포넌트
// src => 이미지 경로
// company => 제조 회사명
// content => 제품명
// price => 제품의 가격
// discountPercent => 제품의 할인율(없는경우 0)
function NewProductContents({src, company, content, price, discountPercent, productNum}) {
    return (
        <div className={"div-new-product-contents"} title={content}>
            <Link to={`/detail?productNum=${productNum}&pageNum=1`}>
                <img src={src} />
            </Link>
            <h6 title={company} className={"nanumSquareR-font-normal"}>{company}</h6>
            <p className={"mb-1 nanumSquareR-font-normal p-main-new-product-content"}>
                <Link to={`/detail?productNum=${productNum}&pageNum=1`}>{content}</Link>
            </p>
            <div className={"d-flex justify-content-between me-1 div-new-product-price-info"}>
                {
                    discountPercent == 0 ? <p /> : <Link to={`/detail?productNum=${productNum}&pageNum=1`}>
                        <p className={"nanumSquareB-font-normal p-main-new-product-sale"}>{discountPercent}% 할인</p>
                    </Link>
                }
                <Link to={`/detail?productNum=${productNum}&pageNum=1`}>
                    <p className={"nanumSquareR-font-normal p-main-new-product-price"}>{(price - ((price / 100) * discountPercent)).toLocaleString()}원</p>
                </Link>
            </div>
        </div>
    );
}

export default NewProductContents;