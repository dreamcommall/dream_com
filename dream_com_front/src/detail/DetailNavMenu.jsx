import React from "react";
import "./detailCss/DetailNavMenu.css";

// 제품 상세페이지에서 사용하는 네비게이션바 컴포넌트
function DetailNavMenu() {
    return (
        <div id={"div-detail-nav-menu"}>
            <div><a href={"#div-detail-nav-header"}>상품가격</a></div>
            <div><a href={"#div-detail-nav-img"}>이미지</a></div>
            <div><a href={"#div-detail-review-summary"}>상품리뷰</a></div>
            <div><a href={"#div-detail-nav-delivery"}>배송정보</a></div>
        </div>
    );
}

export default DetailNavMenu;