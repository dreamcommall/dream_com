import React from "react";
import "./ReviewModalApp.css";
import ReviewModalProductInfo from "./ReviewModalProductInfo";
import TotalScore from "./TotalScore";

function ReviewModalApp() {
    return (
        <div id={"div-reviewModal"}>
            <div style={{borderBottom: "10px solid lightgrey"}}>
                <div className={'nanumSquareB-font-XLarge border-bottom text-center'}>
                <span>
                    리뷰쓰기
                </span>
                    <button id={"button-close"}>X</button>
                </div>
                <ReviewModalProductInfo />
            </div>
            <TotalScore />
        </div>
    )
}

export default ReviewModalApp;