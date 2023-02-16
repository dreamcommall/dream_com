import React, {useEffect, useState} from "react";
import "./purchaseCss/Receipt.css";
import axios from "axios";
import {Link} from "react-router-dom";

function Receipt({method, receipt, userInfo, purchaseProductList}) {
    // 체크박스 클릭 시 값 저장 / 체크박스 연속 클릭 방지
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);
    const [time, setTime] = useState(0);

    const checkBoxList = document.getElementsByClassName("input-selectPurchaseProduct");

    // 결제창 띄우기 매개변수 결제방법
    const onClickPayment = () => {
        // 아임포트에 들어갈 상품명
        let merchantName = "";
        // 선택한 구매상품 개수
        let etcProduct = "";
        if(checkBoxList.length > 1) {
            etcProduct = `외 ${checkBoxList.length - 1}개`;
        }
        // 선택한 구매상품 중 최상위 상품 이름을 상품명에 저장
        for(let i = 0; i < checkBoxList.length; i++) {
            if(checkBoxList[i].checked) {
                merchantName = `${checkBoxList[i].value} ${etcProduct}`;
                break;
            }
        }

        const {IMP} = window;

        IMP.init("imp43854825");
        if(method == "none") {
            alert("결제방법을 선택해 주세요");
        } else if (receipt.price === 0) {
            alert("구매하실 제품을 선택해 주세요");
        } else {
            const data = {
                pg: 'html5_inicis',                           // PG사
                pay_method: method,                           // 결제수단
                merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
                // amount: receipt.price - receipt.discount + receipt.deliveryPrice,   // 결제금액
                amount: 1000,   // 결제금액
                name: merchantName,                  // 주문명
                buyer_name: userInfo.userName,                           // 구매자 이름
                buyer_tel: userInfo.userTel,                     // 구매자 전화번호
                buyer_email: userInfo.userEmail,               // 구매자 이메일
                buyer_addr: userInfo.userAddr,                    // 구매자 주소
                buyer_postcode: userInfo.userPost,                      // 구매자 우편번호
            };

            /* 4. 결제 창 호출하기 */
            IMP.request_pay(data, callback);
        }
    }

    /* 3. 콜백 함수 정의하기 */
    function callback(response) {
        const {
            success,
            merchant_uid,
            error_msg,
        } = response;
        // 결제 완료 후
        if (success) {
            const list = [];
            // 임의의 리스트에 선택한 결제 제품 정보 저장
            for(let i = 0; i < checkBoxList.length; i++) {
                purchaseProductList.map(item => {
                    if (checkBoxList[i].checked && checkBoxList[i].value == item.productName) {
                        const obj = {
                            productNum: item.productNum,
                            price: item.productPrice * (1 - item.productDiscount / 100) * item.inventoryQuantity,
                            quantity: item.inventoryQuantity
                        }
                        list.push(obj);
                    }
                })
            }
            // 폼 데이터에 paymentDto 정보 문자열로 저장
            const formData = new FormData;
            const paymentDto = {
                deliveryAddr: userInfo.userAddr,
                methodName: method,
                userId: userInfo.userId,
                request: document.getElementById("select-purchaseRequest").value
            }
            formData.append("paymentDto", JSON.stringify(paymentDto))
            // 폼 데이터에 선택한 제품 정보 문자열로 저장
            formData.append("paymentDetail", JSON.stringify(list))
            // 통신
            axios.put("/buy", formData)
                .then(req => {
                    if(req.data) {
                        document.getElementById("link-receipt-Link").click();
                    } else {
                        alert("DB 저장 실패");
                    }
                })
                .catch(err => {

                })
        } else {
            alert(`결제 실패: ${error_msg}`);
        }
    }

    const onOff1 = () => {
        if(time == false) {
            if (check1 == false) {
                setCheck1(true);
            }
            else {
                setCheck1(false);
            }
            setTime(1);
            window.setTimeout(() => {
                setTime(0);
            }, 300);
        }

    }
    const onOff2 = () => {
        if(time == 0) {
            if (!check2) {
                setCheck2(true);
            }
            else {
                setCheck2(false);
            }
            setTime(1);
            window.setTimeout(() => {
                setTime(0);
            }, 300);
        }
    }

    // 개인정보 수집 이용 동의 화살표 모양 변경
    const [arrow, setArrow] = useState(0);

    const shape = () => {
        if(time == 0) {
            if (arrow == 0) {
                setArrow(1);
            }
            else {
                setArrow(0);
            }
            setTime(1);
            window.setTimeout(() => {
                setTime(0);
            }, 500);
        }
    }

    return (
        <div id={"div-purchaseReceipt"}>
            <div style={{width: "500px", border: "2px solid lightgray", padding: "20px"}}>
                <p className={"nanumSquareB-font-XNormal"} >최종 결제 정보</p>
                <div className={"nanumSquareR-font-normal"}>
                    <div style={{borderBottom: "1px dashed lightgray"}}>
                        <div className={"d-flex justify-content-between"}>
                            <p>상품 금액</p>
                            {<p>{receipt.price.toLocaleString("ko-KR")}원</p>}
                        </div>
                        <div className={"d-flex justify-content-between"}>
                            <p>할인 금액</p>
                            <p>{receipt.discount.toLocaleString("ko-KR")}원</p>
                        </div>
                        <div className={"d-flex justify-content-between"}>
                            <p>배송비</p>
                            <p >{receipt.deliveryPrice.toLocaleString("ko-KR")}원</p>
                        </div>
                    </div>
                    <div className={"d-flex justify-content-between mt-3"}>
                        <p>최종 결제 금액</p>
                        {<p className={"text-danger"}>
                            {(receipt.price - receipt.discount + receipt.deliveryPrice).toLocaleString("ko-KR")}원
                        </p>}
                    </div>
                    <div className={"mt-4 form-check"}>
                        <input className={"form-check-input"} type={"checkbox"} id={"ageCheck"} onClick={onOff1} disabled={time == 1 ? true : false} />
                        <div>
                            <label className={"form-check-label"}>
                                만 14세 이상입니다.
                            </label>
                        </div>
                    </div>
                    <div className={"mt-4 form-check"}>
                        <input className={"form-check-input"} type={"checkbox"} id={"Check"} onClick={onOff2} disabled={time == 1 ? true : false} />
                        <div>
                            <label className={"form-check-label d-flex justify-content-between"}>
                                <div href={time == 1 ? "" : "#purchaseReceipt-collapse"}
                                     data-bs-toggle={"collapse"} aria-controls={"purchaseReceipt-collapse"} onClick={shape}>
                                    개인정보 수집 및 이용에 동의합니다.&#8193;&#8193;&#8193;&#8193;&#8193;&#8193;&#8193;&#8193;
                                    {arrow == 0 ? <span>&#9660;</span> : <span>&#9650;</span>}
                                </div>
                            </label>
                        </div>
                        <p className={"collapse"} id={"purchaseReceipt-collapse"}>
                            고객님께서는 개인정보 수집 및 이용에 대하여 동의를 거부하실 수 있으며, 거부 시 상품배송, 구매 및 결제가 제한됩니다.
                        </p>

                    </div>
                    <div className={"d-flex justify-content-center"}>
                        {<button id={check1 && check2 ? "button-OpenIamport" : "button-disableIamport"}
                                 onClick={onClickPayment} disabled={!(check1 && check2)}>
                            {(receipt.price - receipt.discount + receipt.deliveryPrice).toLocaleString("ko-KR")}원 결제하기
                        </button>}
                    </div>
                    <Link to={"/clearTitle/paymentClear"} id={"link-receipt-Link"} style={{display:"none"}}></Link>
                </div>
            </div>
        </div>
    )
}

export default Receipt;