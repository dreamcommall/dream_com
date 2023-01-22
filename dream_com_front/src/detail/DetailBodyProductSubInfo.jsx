import React from "react";
import "./DetailBodyProductSubInfo.css"
import "../fonts/fontStyle.css"

function DetailBodyProductSubInfo(props) {
    return (
        <div id={"div-detail-product-sub-info"}>
            <div className={"d-flex justify-content-end me-1"}>
                <p>상품번호 : 12345</p>
            </div>
            <div className={"d-flex align-items-center mx-3 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>판매가</p>
                <div className={"mx-5"}>
                    <div className={"d-flex"}>
                        <p className={"mb-1 mx-1"}>할인율</p>
                        <p className={"mb-1"}>기존가격</p>
                    </div>
                    <p className={"mx-1"}>할인가격</p>
                </div>
            </div>
            <div className={"d-flex align-items-center mx-3 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>상품평</p>
                <p className={"mx-5"}>별점(댓글 개수)</p>
            </div>
            <div className={"d-flex align-items-center mx-3 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>카드혜택</p>
                <p className={"mx-5"}>무이자 할부</p>
            </div>
            <div className={"d-flex align-items-center mx-3 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>배송정보</p>
                <p className={"mx-5"}>기본배송|당일배송</p>
            </div>
            <div className={"d-flex align-items-center mx-3 mb-4 div-detail-product-info-underline"}>
                <p className={"nanumSquareB-font-XNormal div-detail-product-info-title"}>배송비</p>
                <p className={"mx-5"}>무료배송</p>
            </div>
            <div id={"div-detail-product-price-info"} className={"mx-3 mb-3"}>
                <p className={"nanumSquareR-font-XNormal p-3"}>상품제목입니다.</p>
                <div className={"d-flex justify-content-between align-items-center p-3"}>
                    <input type={"number"} />
                    <p className={"mb-0 nanumSquareB-font-XNormal"}>가격입니다.</p>
                </div>
            </div>
            <div className={"d-flex justify-content-end me-3"}>
                <p className={"nanumSquareB-font-XLarge"}>총 합계 금액 <span>100000원</span></p>
            </div>
            <div id={"div-detail-product-purchase-option"} className={"d-flex justify-content-around"}>
                <div><p>찜하기</p></div>
                <div><p>장바구니</p></div>
                <div><p>구매하기</p></div>
            </div>
        </div>
    );
}

export default DetailBodyProductSubInfo;