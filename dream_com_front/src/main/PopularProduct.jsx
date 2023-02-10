import React from "react";
import Slider from "react-slick";
import "./slick.css"
import "./slick-theme.css"
import PopularProductImg from "./PopularProductImg";
import PopularProductContents from "./PopularProductContents";
import "../fonts/fontStyle.css"
import "./PopularProduct.css"

// slick 캐러셀 옵션 설정
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
};

// 현시간 인기상품을 보여주는 컴포넌트
function PopularProduct({popularProductList}) {
    return (
        <div className={"container mt-5"}>
            <div className={"d-flex justify-content-between"}>
                <h2 className={"mb-4 nanumSquareB-font-XLarge"}>현시간 인기상품</h2>
                <div className={"d-flex align-items-center"}>
                    {/*<h5 className={"nanumSquareB-font-large"}>전체보기 ></h5>*/}
                </div>
            </div>
            <div style={{width : "97%"}} className={"ms-4"}>
                <Slider {...settings}>
                    {
                        // 현시간 인기상품
                        popularProductList.map(item => {
                            return (
                                <div title={item.productTitle} key={item.key} className={"div-main-popular-product-wrapper"}>
                                    <PopularProductImg src={item.thumbnailImg} productNum={item.productNum} />
                                    <PopularProductContents name={item.productTitle} price={item.productPrice} discountPercent={item.productDiscount} productNum={item.productNum}/>
                                </div>
                            );
                        })
                    }
                </Slider>
            </div>
        </div>
    );
}

export default PopularProduct;