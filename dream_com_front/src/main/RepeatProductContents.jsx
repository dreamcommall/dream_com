import React from "react";
import "../fonts/fontStyle.css"
import "./RepeatProductContents.css"

function RepeatProductContents({style, item}) {
    return (
        <div title={item.productTitle} className={"text-center"} style={style}>
            <p id={"p-repeat-category-item-title"} className={"mt-2 mb-1 nanumSquareR-font-normal"}>{item.productTitle}</p>
            <div className={"d-flex justify-content-center mb-0"}>
                {
                    item.productDiscount == 0 ? <p /> : <p style={{color : "red"}} className={"nanumSquareB-font-normal mb-1"}>{item.productDiscount}%</p>
                }
                <p className={"mx-1 nanumSquareR-font-normal mb-2"}>{item.productPrice - ((item.productPrice / 100) * item.productDiscount)}원</p>
            </div>
            <img width={179} height={179} src={item.thumbnailImg}/>
        </div>
    );
}

export default RepeatProductContents;