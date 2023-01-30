import React from "react";
import {Carousel} from "react-bootstrap";
import "../fonts/fontStyle.css"
import RepeatProductContents from "./RepeatProductContents";
import "./RepeatProductPage.css"

// 작성자 : MoonNight285
// 스크롤 할때마다 반복적으로 카테고리별로 상품의 정보를 보여줄 컴포넌트
function RepeatProductPage({categoryName, companyList, mainProductInfoList, subProductInfoList}) {
    return (
        <div className={"container my-5"}>
            <div className={"row"}>
                <div id={"div-repeat-product-page-wrapper"} className={"col d-flex"}>
                    <div style={{width : "22%"}}>
                        <h3 className={"mx-4 mt-3 mb-4 nanumSquareB-font-XLarge"}>{categoryName}</h3>
                        <p className={"mx-4 nanumSquareR-font-XNormal"}>전체보기 ></p>
                        <div id={"div-repeat-company-wrapper"}>
                            <p style={{color : "red"}} className={"mx-4 nanumSquareB-font-normal"}>제조사 목록</p>
                            {
                                companyList.map(item =>  {
                                    return (
                                        <p key={item.key} className={"mx-4 nanumSquareR-font-normal"}># {item.companyList}</p>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div style={{width : "29%"}}>
                        <Carousel indicators={false}>
                            {
                                mainProductInfoList.map(array => {
                                    return array.map(item => {
                                        return (
                                            <Carousel.Item key={item.key}>
                                                <img title={item.productTitle} src={item.mainPageImg} alt={""} />
                                                <div title={item.productTitle} style={{position : "relative", bottom : 75, fontSize : 20, backgroundColor : "#5A5A5A", height : 35}}
                                                        className={"d-flex justify-content-center align-items-center"}>
                                                    <span id={"span-repeat-main-img-title"} className={"nanumSquareR-font-XNormal"}>{item.productTitle}</span>
                                                </div>
                                            </Carousel.Item>
                                        );
                                    });
                                })
                            }
                        </Carousel>
                    </div>
                    <div style={{width : "49%"}} className={"mx-3"}>
                        <div className={"d-flex justify-content-center"}>
                            {
                                // 상단에 위치
                                subProductInfoList.map(array => {
                                    return array.map(item => {
                                        if (item.key == 1) { // 중간에 위치
                                            return (
                                                <RepeatProductContents key={item.key} style={{padding : 10, border : "1px solid #EBEBEB"}} item={item} />
                                            );
                                        } else if(item.key < 3) { // 양쪽 사이드에 위치
                                            return (
                                                <RepeatProductContents key={item.key} style={{padding : 10, borderBottom : "1px solid #EBEBEB"}} item={item} />
                                            );
                                        }
                                    });
                                })
                            }
                        </div>
                        <div className={"d-flex justify-content-center"}>
                            {
                                // 하단에 위치
                                subProductInfoList.map(array => {
                                    return array.map(item => {
                                        if (item.key == 4) { // 중간에 위치
                                            return (
                                                <RepeatProductContents key={item.key} style={{padding : 10, border : "1px solid #EBEBEB", borderBottom : "none"}} item={item} />
                                            );
                                        } else if (item.key >= 3) { // 양쪽 사이드에 위치
                                            return (
                                                <RepeatProductContents key={item.key} style={{padding : 10, borderTop : "1px solid #EBEBEB"}} item={item} />
                                            );
                                        }
                                    });
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