import React, {useEffect, useState} from "react";
import "./Receipt.css";

function Receipt(props) {

    return (
        <div id={"div-receipt"}>
            <div style={{width: "500px", border: "2px solid lightgray", padding: "20px"}}>
                <p className={"nanumSquareB-font-large"} >최종 결제 정보</p>
                <div className={"nanumSquareR-font-XNormal"}>
                    <div style={{borderBottom: "1px dashed lightgray"}}>
                        <div className={"d-flex justify-content-between"}>
                            <p>상품 금액</p>
                            {props.item.map(item => {
                                return <p key={item.key}>{item.price}원</p>
                            })}
                        </div>
                        <div className={"d-flex justify-content-between"}>
                            <p>할인 금액</p>
                            {props.item.map(item => {
                                return <p key={item.key}>{item.discount}원</p>
                            })}
                        </div>
                        <div className={"d-flex justify-content-between"}>
                            <p>배송비</p>
                            {props.item.map(item => {
                                return <p key={item.key}>{item.deliveryPrice}원</p>
                            })}
                        </div>
                    </div>
                    <div className={"d-flex justify-content-between mt-3"}>
                        <p>배송비</p>
                        {props.item.map(item => {
                            return <p key={item.key} className={"text-danger"}>{item.price - item.discount + item.deliveryPrice}원</p>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Receipt;