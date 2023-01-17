import React from "react";
import PopularProductImg from "./PopularProductImg";
import PopularProductContents from "./PopularProductContents";
import Slider from "react-slick";
import "./slick.css"
import "./slick-theme.css"
import NewProductContents from "./NewProductContents";
import "../fonts/fontStyle.css"

const newProductWrapperStyle = {
    width : 850,
    height : 435,
    backgroundColor : "#f7f9fa"
}

const sliderStyle = {
    width : "85%",
    marginLeft: 65
}

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 10000
};

// 서버와 통신하기전 테스트 용도
const newProductList = [
    {src : "/images/MainRollingBanner_139003.jpg", company : "제조사1", content : "상품내용1", price : "상품가격1", discountPercent : "5"},
    {src : "/images/MainRollingBanner_139003.jpg", company : "제조사2", content : "상품내용2", price : "상품가격2", discountPercent : "10"},
    {src : "/images/MainRollingBanner_139003.jpg", company : "제조사3", content : "상품내용3", price : "상품가격3", discountPercent : "0"},
    {src : "/images/MainRollingBanner_139003.jpg", company : "제조사4", content : "상품내용4", price : "상품가격4", discountPercent : "20"},
    {src : "/images/MainRollingBanner_139003.jpg", company : "제조사5", content : "상품내용5", price : "상품가격5", discountPercent : "25"},
]

function NewProduct() {
    return (
        <div style={newProductWrapperStyle}>
            <div className={"d-flex justify-content-start my-3"}>
                <img width={20} height={30} src={"/images/fire.png"} className={"mx-3"} />
                <h4 className={"nanumSquareR-font-large"}>따끈따끈한 신상품</h4>
            </div>
            <div style={sliderStyle}>
                <Slider {...settings}>
                    {
                        newProductList.map(item => {
                            return <NewProductContents src={item.src} company={item.company} content={item.content} price={item.price}
                                discountPercent={item.discountPercent}/>
                        })
                    }
                </Slider>
            </div>
        </div>
    );
}

export default NewProduct;