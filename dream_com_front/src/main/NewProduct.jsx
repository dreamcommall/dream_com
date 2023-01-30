import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "./slick.css"
import "./slick-theme.css"
import NewProductContents from "./NewProductContents";
import "../fonts/fontStyle.css"
import "./NewProduct.css"

// 작성자 : MoonNight285
// slick 캐러셀 옵션 설정
const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000
};

// 작성자 : MoonNight285
// 신규등록 상품을 보여주는 컴포넌트
function NewProduct({newProductList}) {
    return (
        <div id={"div-new-product-wrapper"}>
            <div className={"d-flex justify-content-start my-3"}>
                <img width={20} height={30} src={"/images/fire.png"} className={"mx-3"} />
                <h4 className={"nanumSquareB-font-large"}>따끈따끈한 신상품</h4>
            </div>
            <div id={"div-new-product-slider"}>
                <Slider {...settings}>
                    {
                        newProductList.map(item => {
                            return <NewProductContents key={item.key} src={item.thumbnailImg} company={item.companyName[0]} content={item.productTitle}
                                price={item.productPrice} discountPercent={item.productDiscount}/>
                        })
                    }
                </Slider>
            </div>
        </div>
    );
}

export default NewProduct;