import React, {useEffect, useState} from "react";
import "../fonts/fontStyle.css"

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
    "가성비 최강",
    "가격/스펙 모두 만족하는",
    "요즘 핫한"
]

// 작성자 : MoonNight285
// 나중에 서버에서 가져온걸로 대체
const specInfo = {
    company : "AMD",
    src : "/images/MainRollingBanner_139003.jpg",
    specList : ["스펙1", "스펙2", "스펙3", "스펙4", "스펙5"],
    discountPercent : 7
}

// 작성자 : MoonNight285
// 랜덤으로 견적을 추천해주는 컴포넌트
function RandomSpec() {
    const [randomComment, setRandomComment] = useState("");

    useEffect(() => {
        const randomIdx = Number.parseInt(((Math.random() - 0.1) * (randomSpecComment.length)).toString());
        setRandomComment(randomSpecComment[randomIdx]);
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
                            specInfo.specList.map(item => {
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
            <p className={"mx-4 mb-1 nanumSquareR-font-normal"}>제품설명입니다.</p>
            <div className={"d-flex mx-4"}>
                {
                    specInfo.discountPercent == 0 ? <p/> : <p style={{color : "red"}} className={"me-3 nanumSquareB-font-normal"}>{specInfo.discountPercent}% 할인</p>
                }
                <p className={"nanumSquareR-font-normal"}>가격입니다.</p>
            </div>
        </div>
    );
}

export default RandomSpec;