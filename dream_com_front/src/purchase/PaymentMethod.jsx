import React from "react";

const style = {
    border: {
        width: "750px", borderTop: "2px solid black", borderBottom: "1px solid lightgray",
        borderLeft: "1px solid lightgray", borderRight: "1px solid lightgray"
    },
}

function PaymentMethod() {
    return (
        <div className={"mt-4 p-0 container"}>
            <div className={"nanumSquareB-font-XLarge"} style={{width: "750px"}}>
                <p>결제 수단</p>
            </div>
            <div style={style.border} className={"nanumSquareB-font-normal d-flex justify-content-around pt-4"}>
                <span className={"text-center"}>
                    <img src={"/images/kakaoPayLogo.png"} style={{width: "100px"}} />
                    <p>카카오 페이</p>
                </span>
                <span className={"text-center"}>
                    <img src={"/images/naverPayLogo.png"} style={{width: "100px"}} />
                    <p>네이버 페이</p>
                </span>
                <span className={"text-center"}>
                    <img src={"/images/tossLogo.png"} style={{width: "100px"}} />
                    <p>toss</p>
                </span>
            </div>
        </div>
    )
}

export default PaymentMethod;