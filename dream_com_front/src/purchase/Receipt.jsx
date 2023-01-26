import React, {useState} from "react";
import "./Receipt.css";

const style = {
    button: {width: "300px", height: "60px", backgroundColor: "black", color: "white", borderRadius: "10px", marginTop: "20px"},
    collapse: {borderTop: "1px solid lightgray", borderBottom: "1px solid lightgray", paddingTop: "10px", paddingBottom: "10px", backgroundColor: "lightgray"}
}
function Receipt(props) {
    // 체크박스 클릭 시 값 저장 / 체크박스 연속 클릭 방지
    const [check1, setCheck1] = useState(0);
    const [check2, setCheck2] = useState(0);
    const [time, setTime] = useState(0);
    const onOff1 = () => {
        if(time == 0) {
            if (check1 == 0) {
                setCheck1(1);
            }
            else {
                setCheck1(0);
            }
            setTime(1);
            window.setTimeout(() => {
                setTime(0);
            }, 300);
        }

    }
    const onOff2 = () => {
        if(time == 0) {
            if (check2 == 0) {
                setCheck2(1);
            }
            else {
                setCheck2(0);
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
                console.log(324);
            }, 500);
        }
    }

    // 체크박스 모두 체크 시 안내
    const value = () => {
        if(check1 == 1 && check2 == 1) {
            alert("체크 완료");
        }
    }

    return (
        <div id={"div-receipt"}>
            <div style={{width: "500px", border: "2px solid lightgray", padding: "20px"}}>
                <p className={"nanumSquareB-font-XNormal"} >최종 결제 정보</p>
                <div className={"nanumSquareR-font-normal"}>
                    <div style={{borderBottom: "1px dashed lightgray"}}>
                        <div className={"d-flex justify-content-between"}>
                            <p>상품 금액</p>
                            {props.item.map(item => {
                                return <p key={item.key}>{item.price.toLocaleString("ko-KR")}원</p>
                            })}
                        </div>
                        <div className={"d-flex justify-content-between"}>
                            <p>할인 금액</p>
                            {props.item.map(item => {
                                return <p key={item.key}>{item.discount.toLocaleString("ko-KR")}원</p>
                            })}
                        </div>
                        <div className={"d-flex justify-content-between"}>
                            <p>배송비</p>
                            {props.item.map(item => {
                                return <p key={item.key}>{item.deliveryPrice.toLocaleString("ko-KR")}원</p>
                            })}
                        </div>
                    </div>
                    <div className={"d-flex justify-content-between mt-3"}>
                        <p>최종 결제 금액</p>
                        {props.item.map(item => {
                            return  (<p key={item.key} className={"text-danger"}>
                                        {(item.price - item.discount + item.deliveryPrice).toLocaleString("ko-KR")}원
                                    </p>)
                        })}
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
                                <div href={time == 1 ? "" : "#p-collapse"} data-bs-toggle={"collapse"} aria-controls={"p-collapse"} onClick={shape}>
                                    개인정보 수집 및 이용에 동의합니다.&#8193;&#8193;&#8193;&#8193;&#8193;&#8193;&#8193;&#8193;
                                    {arrow == 0 ? <span>&#9660;</span> : <span>&#9650;</span>}
                                </div>
                            </label>
                        </div>
                        <p className={"collapse"} id={"p-collapse"} style={style.collapse}>
                            고객님께서는 개인정보 수집 및 이용에 대하여 동의를 거부하실 수 있으며, 거부 시 상품배송, 구매 및 결제, 일부 포인트 적립이 제한됩니다.
                        </p>

                    </div>
                    <div className={"d-flex justify-content-center"}>
                        {props.item.map(item => {
                            return <button key={item.key} style={style.button} onClick={value}>
                                {(item.price - item.discount + item.deliveryPrice).toLocaleString("ko-KR")}원 결제하기
                            </button>
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Receipt;