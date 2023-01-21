import React from "react";
import "./DetailHeaderCategory.css"
import "../fonts/fontStyle.css"

function DetailHeaderCategory({categoryName}) {
    return (
        <p className={"p-detail-header-category-name nanumSquareR-font-normal"}>{categoryName} > </p>
    );
}

export default DetailHeaderCategory;