import React, {useState} from "react";
import "./PaymentMethod.css";

function PaymentMethod({setMethod}) {
    const [box, setBox] = useState(0);

    const setClick = (val, paymentName) => {
        if(box == val) {
            setBox(0);
            setMethod("none");
        }
        else {
            setBox(val);
            setMethod(paymentName);
        }
    }

    return (
        <div className={"my-4 p-0 container"}>
            <div className={"nanumSquareB-font-XLarge"} style={{width: "750px"}}>
                <p>결제 수단</p>
            </div>
            <div id={"div-purchase-paymentMethod"} className={"nanumSquareB-font-normal py-4 px-5"}>
                <div className={"d-flex"}>
                    <span className={"text-center span-paymentMethodBox1"} onClick={() => setClick(1, "kakaopay")}
                          style={box == 1 ? {border: "2px solid lightgray"} : {border: "2px solid white"}}>
                        <img src={"/images/kakaoPayLogo.png"} style={{width: "100px"}} />
                        <p>카카오 페이</p>
                    </span>
                    <span className={"text-center span-paymentMethodBox2"} onClick={() => setClick(2, "html5_inicis")}
                          style={box == 2 ? {border: "2px solid lightgray"} : {border: "2px solid white"}}>
                        <img src={"/images/naverPayLogo.png"} style={{width: "100px"}} />
                        <p>네이버 페이</p>
                    </span>
                </div>
                <div className={"d-flex mt-3"}>
                    <span className={"text-center span-paymentMethodBox1"} onClick={() => setClick(3, "tosspay")}
                          style={box == 3 ? {border: "2px solid lightgray"} : {border: "2px solid white"}}>
                        <img src={"/images/tossLogo.png"} style={{width: "100px"}} />
                        <p>toss</p>
                    </span>
                    <span className={"text-center span-paymentMethodBox3"} onClick={() => setClick(4, "bank")}
                          style={box == 4 ? {border: "2px solid lightgray"} : {border: "2px solid white"}}>
                        <p>무통장 입금</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod;