import React from "react";
import "../fonts/fontStyle.css"
import "./mainCss/PopularProductContents.css"
import {Link} from "react-router-dom";

// 작성자 : MoonNight285
// 현시간 인기상품을 보여주는 컴포넌트에 있는 캐러셀에서 상품의 정보를 보여주는 컴포넌트
function PopularProductContents({name, price, discountPercent, productNum}) {
    return (
        <div className={"text-center mt-2 div-main-popular-content-wrapper"}>
            <Link to={`/detail?productNum=${productNum}&pageNum=1`}><p className={"mb-1 nanumSquareR-font-normal p-main-popular-content"}>{name}</p></Link>
            <div className={"d-flex justify-content-center"}>
                {
                    discountPercent == 0 ? <p/> :
                        <Link to={`/detail?productNum=${productNum}&pageNum=1`}>
                            <p className={"nanumSquareB-font-normal p-main-popular-content-sale"}>{discountPercent}% </p>
                        </Link>
                }
                <Link to={`/detail?productNum=${productNum}&pageNum=1`}>
                    <p className={"nanumSquareR-font-normal mx-2 p-main-popular-content-price"}>{(price - ((price / 100) * discountPercent)).toLocaleString()}원</p>
                </Link>
            </div>
        </div>
    );
}

export default PopularProductContents;