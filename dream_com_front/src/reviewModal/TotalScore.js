import React from "react";
import "./TotalScore.css";

function TotalScore() {
    return (
        <div className={"text-center mt-5"}>
            <p className={"nanumSquareB-font-large"}>상품은 만족하셨나요?</p>
            <div>
                <img src={"/images/star64_blank.png"} />
            </div>
        </div>
    )
}

export default TotalScore;