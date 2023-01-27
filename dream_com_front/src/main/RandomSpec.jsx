import React, {useEffect, useState} from "react";
import "../fonts/fontStyle.css"
import axios from "axios";

// 작성자 : MoonNight285
// 랜덤으로 추천해주는 견적의 박스영역의 디자인
const randomSpecWrapperSize = {
    border : "2px solid #EBEBEB",
    width : 435,
    height : 435
}

// 작성자 : MoonNight285
// 랜덤으로 추천해주는 스펙의 리스트 스타일 수정
const randomSpecListStyle = {
    listStyleType : "none"
}

// 작성자 : MoonNight285
// 랜덤으로 추천해주는 스펙의 리스트안에 들어가는 박스 스타일 수정
const specInfoSize = {
    width: 125,
    height: 30,
    backgroundColor : "#f4f4f4",
    borderRadius : 15
}

// 작성자 : MoonNight285
// 랜덤으로 추천해줄때 사용되는 문구설정
const randomSpecComment = [
    {key : 0, title : "가성비 최강"},
    {key : 1, title : "가격/스펙 모두 만족하는"},
    {key : 2, title : "요즘 핫한"}
]

// 작성자 : MoonNight285
// 나중에 서버에서 가져온걸로 대체
const specInfo = {
    company : "AMD",
    src : "/images/MainRollingBanner_139003.jpg",
    specList : [{key : 0, spec : "스펙1"}, {key : 1, spec : "스펙2"}, {key : 2, spec : "스펙3"}, {key : 3, spec : "스펙4"}, {key : 4, spec : "스펙5"}],
    discountPercent : 7
}

// 작성자 : MoonNight285
// 랜덤으로 견적을 추천해주는 컴포넌트
function RandomSpec() {
    const [randomComment, setRandomComment] = useState("");
    const [randomSpec, setRandomSpec] = useState([]);
    const [partNames, setPartNames] = useState([]);
    // const [productTitle, setProductTitle] = useState("");

    useEffect(() => {
        const randomIdx = Number.parseInt(((Math.random() - 0.1) * (randomSpecComment.length)).toString());
        setRandomComment(randomSpecComment[randomIdx].title);
    
        let temp = [];
    
        // axios는 서버의 주소가 있을때
        axios.get("http://localhost:8080/getRandomProduct")
            .then(response => {
                temp = response.data;
                setRandomSpec(temp);
                setPartNames(temp[0].partName);
                console.log(randomSpec);
                console.log(randomSpec);
            })
            .catch(err => {
                console.log("현시간 인기상품을 가져오는데 실패했습니다.");
                console.log("에러내용 : " + err);
            });
    }, [])

    return (
        <div style={randomSpecWrapperSize} className={"me-3"}>
            <div className={"d-flex align-items-center justify-content-center mx-3 mt-2 mb-2"}>
                <img src={"/images/recommend.png"}/>
            </div>
            <div className={"mx-3"}>
                <hr className={"mt-0 mb-4"} />
            </div>
            <h5 className={"text-center mb-4 nanumSquareB-font-XNormal"}>{randomComment} {specInfo.company}</h5>
            <div className={"d-flex mb-0"}>
                <img width={225} height={225} className={"ms-4 pe-2"} src={"/images/MainRollingBanner_139003.jpg"} />
                <div>
                    <ul className={"mt-2 ps-4"}>
                        {
                            // 추천 제품 스펙부분
                            partNames.map(item => {
                                return (
                                    <li style={randomSpecListStyle}>
                                        <div style={specInfoSize} className={"d-flex align-items-center justify-content-center mb-3 nanumSquareR-font-normal"}>{item}</div>
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </div>
            {
                // 추천 제품 판매글 & 할인율 & 가격
                randomSpec.map(item => {
                    return (
                        <div key={item.key}>
                            <p className={"mx-4 mt-2 mb-1 nanumSquareR-font-normal"}>{item.productTitle}</p>
                            <div className={"d-flex mx-4"}>
                                {
                                    item.productDiscount == 0 ? <p/> : <p style={{color : "red"}} className={"me-3 nanumSquareB-font-normal"}>{item.productDiscount}% 할인</p>
                                }
                                <p className={"nanumSquareR-font-normal"}>{item.productPrice - ((item.productPrice / 100) * item.productDiscount)}원</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default RandomSpec;