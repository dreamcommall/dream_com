import React from "react";
import "../detailCss/DetailHeaderCategory.css"
import "../../fonts/fontStyle.css"

// 제품의 카테고리를 보여주는 컴포넌트
function DetailHeaderCategory({categoryName}) {
    return (
        <p className={"p-detail-header-category-name nanumSquareR-font-normal"}>{categoryName} > </p>
    );
}

export default DetailHeaderCategory;