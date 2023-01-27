import React from "react";
import "../fonts/fontStyle.css"

// 작성자 : MoonNight285
// 현시간 인기상품을 보여주는 컴포넌트에 있는 캐러셀에서 상품의 정보를 보여주는 컴포넌트
function PopularProductContents({name, price, discountPercent}) {
    return (
        <div className={"text-center mt-2"}>
            <p className={"mb-1 nanumSquareR-font-normal"}>{name}</p>
            <div className={"d-flex justify-content-center"}>
                {
                    discountPercent == 0 ? <p/> : <p style={{color : "red"}} className={"nanumSquareB-font-normal"}>{discountPercent}% </p>
                }
                <p className={"nanumSquareR-font-normal mx-2"}>{price - ((price / 100) * discountPercent)}원</p>
            </div>
        </div>
    );
}

export default PopularProductContents;