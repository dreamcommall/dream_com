import React, {useEffect, useState} from "react";
import Slider from "react-slick";
import "./slick.css"
import "./slick-theme.css"
import PopularProductImg from "./PopularProductImg";
import PopularProductContents from "./PopularProductContents";
import axios from "axios";

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
};

function PopularProduct() {
    const [popularProductList, setPopularProductList] = useState([]);
    
    useEffect(() => {
        // 프론트에서 임시로 테스트 용도
        let temp = [];
        for(let i = 0; i < 20; ++i) {
            temp.push({key : i, src : "/images/MainRollingBanner_139003.jpg", name : `상품제목${i}`, price : `상품가격${i}`});
            setPopularProductList(temp);
        }
        
        
        // axios는 서버의 주소가 있을때
        // axios.get("", {params : ""})
        //     .then(response => {
        //         // 아이템을 받아서 useState를 이용해 데이터를 저장
        //     })
        //     .catch(err => {
        //         console.log("현시간 인기상품을 가져오는데 실패했습니다.");
        //         console.log("에러내용 : " + err);
        //     });
    }, [])
    
    return (
        <div className={"container mt-5"}>
            <div className={"d-flex justify-content-between"}>
                <h2 className={"mb-4"}>현시간 인기상품</h2>
                <div className={"d-flex align-items-center"}>
                    <h5>전체보기</h5>
                </div>
            </div>
            <Slider {...settings}>
                {
                    popularProductList.map(item => {
                        return (
                            <div>
                                <PopularProductImg src={item.src} />
                                <PopularProductContents name={item.name} price={item.price} />
                            </div>
                        );
                    })
                }
            </Slider>
        </div>
    );
}

export default PopularProduct;