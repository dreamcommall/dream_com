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
// 서버와 통신하기전 테스트 용도
const sampleNewProductList = [
    {key : 0, src : "/images/MainRollingBanner_139003.jpg", company : "제조사1", content : "상품내용1", price : "상품가격1", discountPercent : "5"},
    {key : 1, src : "/images/MainRollingBanner_139003.jpg", company : "제조사2", content : "상품내용2", price : "상품가격2", discountPercent : "10"},
    {key : 2, src : "/images/MainRollingBanner_139003.jpg", company : "제조사3", content : "상품내용3", price : "상품가격3", discountPercent : "0"},
    {key : 3, src : "/images/MainRollingBanner_139003.jpg", company : "제조사4", content : "상품내용4", price : "상품가격4", discountPercent : "20"},
    {key : 4, src : "/images/MainRollingBanner_139003.jpg", company : "제조사5", content : "상품내용5", price : "상품가격5", discountPercent : "25"},
]

// 작성자 : MoonNight285
// 신규등록 상품을 보여주는 컴포넌트
function NewProduct() {
    const [newProductList, setNewProductList] = useState([]);
    
    useEffect(() => {
        // 프론트에서 임시로 테스트 용도
        let temp = [];
        
        // axios는 서버의 주소가 있을때
        axios.get("http://localhost:8080/getRecentProduct")
            .then(response => {
                temp = response.data;
                setNewProductList(temp);
            })
            .catch(err => {
                console.log("현시간 인기상품을 가져오는데 실패했습니다.");
                console.log("에러내용 : " + err);
            });
    }, [])
    
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