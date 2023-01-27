import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "./slick.css"
import "./slick-theme.css"
import NewProductContents from "./NewProductContents";
import "../fonts/fontStyle.css"
import axios from "axios";

// 작성자 : MoonNight285
// 신규등록 상품을 감싸는 부모 태그의 넓이 및 배경색 조절
const newProductWrapperStyle = {
    width : 850,
    height : 435,
    backgroundColor : "#f7f9fa"
}

// 작성자 : MoonNight285
// 신규등록 상품을 보여주는 캐러셀의 크기, 아이템의 위치를 조절
const sliderStyle = {
    width : "85%",
    marginLeft: 65
}

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
        <div style={newProductWrapperStyle}>
            <div className={"d-flex justify-content-start my-3"}>
                <img width={20} height={30} src={"/images/fire.png"} className={"mx-3"} />
                <h4 className={"nanumSquareB-font-large"}>따끈따끈한 신상품</h4>
            </div>
            <div style={sliderStyle}>
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