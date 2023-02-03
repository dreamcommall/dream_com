import React from "react";
import "../fonts/fontStyle.css"
import "./RepeatProductContents.css"
import {Link} from "react-router-dom";

function RepeatProductContents({style, item}) {
    return (
        <div title={item.productTitle} className={"text-center"} style={style}>
            <Link to={`/detail?productNum=${item.productNum}`}>
                <p className={"mt-2 mb-1 nanumSquareR-font-normal p-repeat-category-item-title"}>{item.productTitle}</p>
            </Link>
            <div className={"d-flex justify-content-center mb-0"}>
                {
                    item.productDiscount == 0 ? <p /> : <Link to={`/detail?productNum=${item.productNum}`}>
                        <p style={{color : "red"}} className={"nanumSquareB-font-normal mb-1"}>{item.productDiscount}%</p>
                    </Link>
                }
                <Link to={`/detail?productNum=${item.productNum}`}>
                    <p className={"mx-1 nanumSquareR-font-normal mb-2 p-repeat-category-item-price"}>{item.productPrice - ((item.productPrice / 100) * item.productDiscount)}원</p>
                </Link>
            </div>
            <Link to={`/detail?productNum=${item.productNum}`}>
                <img width={179} height={179} src={item.thumbnailImg} alt={"로딩 중이거나 이미지를 불러올 수 없습니다."}/>
            </Link>
        </div>
    );
}

export default RepeatProductContents;