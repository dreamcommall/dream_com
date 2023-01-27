import React, {useState} from "react";

const style = {
    border: {
        width: "750px", borderTop: "2px solid black", borderBottom: "1px solid lightgray",
        borderLeft: "1px solid lightgray", borderRight: "1px solid lightgray"
    },
    box1on: {
        padding: "3px", border: "2px solid lightgray", borderRadius: "5px",
        height: "82.438px", width: "120px", marginLeft: "108px", marginRight: "213px"
    },
    box1off: {
        padding: "3px", marginLeft: "110px", marginRight: "225px"
    },
    box2on: {
        padding: "3px", border: "2px solid lightgray", borderRadius: "5px",
        height: "82.438px", width: "120px"
    },
    box2off: {
        padding: "3px"
    },
    box4on: {
        paddingTop: "25px", border: "2px solid lightgray",
        borderRadius: "5px", height: "82.438px", width: "120px"
    },
    box4off: {
        width: "100px", paddingTop: "20px"
    },
}

function PaymentMethod() {
    const [box, setBox] = useState(0);
    const [method, setMethod] = useState("");

    const setClick = (val, paymentName) => {
        if(box == val) {
            setBox(0);
            setMethod("");
        }
        else {
            setBox(val);
            setMethod(paymentName);
        }
    }

    return (
        <div className={"mt-4 p-0 container"}>
            <div className={"nanumSquareB-font-XLarge"} style={{width: "750px"}}>
                <p>결제 수단</p>
            </div>
            <div style={style.border} className={"nanumSquareB-font-normal py-4 px-5"}>
                <div className={"d-flex"}>
                    <span className={"text-center"} onClick={() => setClick(1, "카카오 페이")}
                          style={box == 1 ? style.box1on : style.box1off}>
                        <img src={"/images/kakaoPayLogo.png"} style={{width: "100px"}} />
                        <p>카카오 페이</p>
                    </span>
                    <span className={"text-center"} onClick={() => setClick(2, "네이버 페이")}
                          style={box == 2 ? style.box2on : style.box2off}>
                        <img src={"/images/naverPayLogo.png"} style={{width: "100px"}} />
                        <p>네이버 페이</p>
                    </span>
                </div>
                <div className={"d-flex mt-3"}>
                    <span className={"text-center"} onClick={() => setClick(3, "토스 결제")}
                          style={box == 3 ? style.box1on : style.box1off}>
                        <img src={"/images/tossLogo.png"} style={{width: "100px"}} />
                        <p>toss</p>
                    </span>
                    <span className={"text-center"} onClick={() => setClick(4, "무통장 입금")}
                          style={box == 4 ? style.box4on : style.box4off}>
                        <p>무통장 입금</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod;