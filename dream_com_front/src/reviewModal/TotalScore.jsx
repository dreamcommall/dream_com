import React, {useState} from "react";
import "./TotalScore.css";

function TotalScore(props) {
    // 별 개수
    const startList = [1, 2, 3, 4, 5];
    // 마우스 호버 유무 state
    const [isHover, setIsHover] = useState(0);
    // 마우스 호버한 별점 위치
    const [hoverStar, setHoverStar] = useState(0);
    // 선택한 마우스 별점 위치
    const [rate, setRate] = useState(0);

    // 마우스 호버 시 별점 번호 저장
    const mouseover = (e) => {
        // 호버 여부
        setIsHover(1);
        // 호버시 해당 별점 번호
        setHoverStar(e);

    }

    // 마우스 호버 아웃 시 별점 번호 초기화
    const mouseout = (e) => {
        setIsHover(0);
        setHoverStar(0);
    }

    // 클릭 시 별점 번호 확정
    const clickStar = (e) => {
        // 현재 컴포넌트에 선택한 별점 저장
        setRate(e);
        // ReviewModalApp.jsx 컴포넌트에 선택한 별점 저장
        props.setting(e);
    }

    return (
        <div id={"div-totalScore"}>
            <p className={"nanumSquareB-font-large"}>상품은 만족하셨나요?</p>
            <div id={"div-stars"}>
                {startList.map(item => {

                    return (
                        <img src={(item <= hoverStar && hoverStar != rate ?
                            (item <= rate ?  "/images/star64_opacity.png" : "/images/star64_opacity.png")
                            : (item <= rate ? "/images/star64.png" : "/images/star64_blank.png"))}
                                key={item} onMouseOver={() => mouseover(item)} onMouseOut={() => mouseout(item)}
                                onClick={() => clickStar(item)} className={"div-starImg"} />
                    )
                })}
            </div>
        </div>
    )
}

export default TotalScore;