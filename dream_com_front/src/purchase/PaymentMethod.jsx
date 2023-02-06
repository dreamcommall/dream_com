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
                <div className={"d-flex justify-content-around"}>
                    <span className={box == 1 ? "text-center span-paymentMethodBoxOn" : "text-center span-paymentMethodBoxOff"}
                          onClick={() => setClick(1, "kakaopay")}>
                        <img src={"/images/kakaoPayLogo.png"} style={{width: "100px"}} />
                        <p>카카오 페이</p>
                    </span>
                    <span className={box == 2 ? "text-center span-paymentMethodBoxOn" : "text-center span-paymentMethodBoxOff"}
                          onClick={() => setClick(2, "tosspay")}>
                        <img src={"/images/tossLogo.png"} style={{width: "100px"}} />
                        <p>toss</p>
                    </span>
                    <span className={box == 3 ? "text-center span-paymentMethodBoxOn" : "text-center span-paymentMethodBoxOff"}
                          onClick={() => setClick(3, "card")}>
                        <p className={"mt-3 "}>카드결제</p>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PaymentMethod;