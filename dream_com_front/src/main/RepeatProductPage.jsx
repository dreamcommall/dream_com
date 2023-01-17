import React from "react";
import {Carousel} from "react-bootstrap";
import "../fonts/fontStyle.css"
import RepeatProductContents from "./RepeatProductContents";

// 작성자 : MoonNight285
// 반복으로 보여주는 박스영역 디자인
const repeatProductPageStyle = {
    width : "100%",
    height : 565,
    border : "2px solid #EBEBEB",
    borderTopColor : "black",
    padding : 0
}

// 작성자 : MoonNight285
// 제조사 명단 보여주는 부분
const hotKeywordWrapperStyle = {
    marginTop : 225
}

// 작성자 : MoonNight285
// 서버와 통신하기전 테스트 용도
const companyList = [
    {company : "제조사1"}, {company : "제조사2"}, {company : "제조사3"},
]

const mainProductInfoList = [
    {name : "제품1 이름입니다.", src : "/images/deskTop1.jpg"},
    {name : "제품2 이름입니다.", src : "/images/deskTop2.jpg"},
    {name : "제품3 이름입니다.", src : "/images/deskTop3.jpg"}
]

const subProductInfoList = [
    {key : 0, name : "상품1 이름입니다.", price : "상품1 가격입니다.", discountPercent : "0", src : "/images/MainRollingBanner_139003.jpg"},
    {key : 1, name : "상품2 이름입니다.", price : "상품2 가격입니다.", discountPercent : "3", src : "/images/MainRollingBanner_139003.jpg"},
    {key : 2, name : "상품3 이름입니다.", price : "상품3 가격입니다.", discountPercent : "6", src : "/images/MainRollingBanner_139003.jpg"},
    {key : 3, name : "상품4 이름입니다.", price : "상품4 가격입니다.", discountPercent : "9", src : "/images/MainRollingBanner_139003.jpg"},
    {key : 4, name : "상품5 이름입니다.", price : "상품5 가격입니다.", discountPercent : "0", src : "/images/MainRollingBanner_139003.jpg"},
    {key : 5, name : "상품6 이름입니다.", price : "상품6 가격입니다.", discountPercent : "12", src : "/images/MainRollingBanner_139003.jpg"},
]

// 작성자 : MoonNight285
// 스크롤 할때마다 반복적으로 카테고리별로 상품의 정보를 보여줄 컴포넌트
function RepeatProductPage() {
    return (
        <div className={"container my-5"}>
            <div className={"row"}>
                <div className={"col d-flex"} style={repeatProductPageStyle}>
                    <div>
                        <h3 className={"mx-4 mt-3 mb-4 nanumSquareB-font-XLarge"}>데스크탑 * 서버</h3>
                        <p className={"mx-4 nanumSquareR-font-XNormal"}>전체보기 ></p>
                        <div style={hotKeywordWrapperStyle}>
                            <p style={{color : "red"}} className={"mx-4 nanumSquareB-font-normal"}>제조사 목록</p>
                            {
                                companyList.map(item =>  {
                                    return (
                                        <p className={"mx-4 nanumSquareR-font-normal"}># {item.company}</p>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div style={{width : "29%"}}>
                        <Carousel indicators={false}>
                            {
                                mainProductInfoList.map(item => {
                                    return (
                                        <Carousel.Item>
                                            <img src={item.src} alt={""} />
                                            <div style={{position : "relative", bottom : 75, fontSize : 20, backgroundColor : "#5A5A5A", height : 35}}
                                                    className={"d-flex justify-content-center align-items-center"}>
                                                <span style={{color : "white"}} className={"nanumSquareR-font-XNormal"}>{item.name}</span>
                                            </div>
                                        </Carousel.Item>
                                    );
                                })
                            }
                        </Carousel>
                    </div>
                    <div style={{width : "49%"}} className={"mx-3"}>
                        <div className={"d-flex justify-content-center"}>
                            {
                                subProductInfoList.map(item => {
                                    if (item.key == 1) {
                                        return (
                                            <RepeatProductContents style={{padding : 10, border : "1px solid #EBEBEB"}} item={item} />
                                        );
                                    } else if(item.key < 3) {
                                        return (
                                            <RepeatProductContents style={{padding : 10, borderBottom : "1px solid #EBEBEB"}} item={item} />
                                        );
                                    }
                                })
                            }
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            {
                                subProductInfoList.map(item => {
                                    if (item.key == 4) {
                                        return (
                                            <RepeatProductContents style={{padding : 10, border : "1px solid #EBEBEB", borderBottom : "none"}} item={item} />
                                        );
                                    } else if (item.key >= 3) {
                                        return (
                                            <RepeatProductContents style={{padding : 10, borderTop : "1px solid #EBEBEB"}} item={item} />
                                        );
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RepeatProductPage;