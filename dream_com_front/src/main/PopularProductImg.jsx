import React from "react";
import {Link} from "react-router-dom";

const imgSize = 250;

// 작성자 : MoonNight285
// 현시간 인기상품 컴포넌트에서 사용되는 캐러셀에서 아이템의 사진을 보여주는 컴포넌트
function PopularProductImg({src, productNum}) {
    return (
        <Link to={`/detail?productNum=${productNum}`}>
        <img width={imgSize} height={imgSize} style={{borderRadius : "50%"}} src={src}/></Link>
    );
}

export default PopularProductImg;