import React from "react";
import "../fonts/fontStyle.css"

// 작성자 : MoonNight285
// 신규등록 상품을 보여주는 캐러셀의 아이템중 이미지의 크기 및 위치 조절
const newProductImgStyle = {
    width : 200,
    height : 200,
    marginLeft : 35,
    marginRight : 0
}

// 작성자 : MoonNight285
// 신규등록 상품을 보여주는 캐러셀의 아이템중 제조사를 보여주는 부분의 디자인 조절
const companyStyle = {
    backgroundColor : "#EBE6E6",
    borderRadius : 10,
    width: "50%",
    padding : 5,
    paddingTop : 7,
    textAlign : "center",
    marginTop : 10,
    marginLeft : 35
}

// 작성자 : MoonNight285
// 공통으로 사용되는 스타일
const commonStyle = {
    marginLeft : 35
}

// 신상품 글 안넘치도록 스타일 조정
const contentStyle = {
    marginLeft : 35,
    width : 235,
    overflow : "hidden",
    textOverflow : "ellipsis",
    whiteSpace : "nowrap"
}

// 작성자 : MoonNight285
// 신규등록 상품을 보여주는 컴포넌트에서 캐러셀안에 사용되는 아이템을 만들어주는 컴포넌트
// src => 이미지 경로
// company => 제조 회사명
// content => 제품명
// price => 제품의 가격
// discountPercent => 제품의 할인율(없는경우 0)
function NewProductContents({src, company, content, price, discountPercent}) {
    return (
        <div title={content}>
            <img style={newProductImgStyle} src={src} />
            <h6 style={companyStyle} className={"nanumSquareR-font-normal"}>{company}</h6>
            <p style={contentStyle} className={"mb-1 nanumSquareR-font-normal"}>{content}</p>
            <div style={commonStyle} className={"d-flex justify-content-between me-1"}>
                {
                    discountPercent == 0 ? <p /> : <p style={{color : "red"}} className={"nanumSquareB-font-normal"}>{discountPercent}% 할인</p>
                }
                <p className={"nanumSquareR-font-normal"}>{price - ((price / 100) * discountPercent)}원</p>
            </div>
        </div>
    );
}

export default NewProductContents;