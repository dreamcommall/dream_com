import React, {useEffect, useState} from "react";
import Receipt from "./Receipt";

const style = {
    border: {width: "750px", borderTop: "2px solid black", borderBottom: "1px solid lightgray",
        borderLeft: "1px solid lightgray", borderRight: "1px solid lightgray"},
    padding: {paddingTop: "20px", paddingLeft: "20px"},
    form: {width: "700px", marginBottom: "20px"},
}

function DeliveryAddress(props) {
    const [addr, setAddr] = useState("");
    const [request, setRequest] = useState("요청사항 없음");

    // 페이지 로딩 시 기본 배송지를 저장
    useEffect(() => {
        setAddr(props.item[0].addr);
    }, []);

    // 배송지 설정
    const setAddress = (e) => {
        setAddr(e.target.value);
    }

    // 요청사항 설정
    const setReq = (e) => {
        setRequest(e.target.value);
    }

    return (
        <div className={"mt-4 p-0 container"}>
            <div className={"nanumSquareB-font-XLarge"} style={{width: "750px"}}>
                <p>배송 정보</p>
            </div>
            <div style={style.border} className={"nanumSquareB-font-normal"}>
                <div style={style.padding}>
                    <p><img src={"/images/placeholder.png"} style={{width: "40px"}} />배송지</p>
                    <div style={{paddingLeft: "5px"}}>
                        <select className={"form-select nanumSquareR-font-normal"} defaultValue={props.item.addr} onChange={setAddress}
                                style={style.form}>
                            {props.item.map((item) => {
                                return (
                                    <option value={item.addr} key={item.key}>{item.addr}</option>
                                )
                            })}
                        </select>
                        <p>홍길동 : <span>010-1111-1111</span></p>
                        <label htmlFor={"request"} className={"form-label"}>요청사항</label>
                        <select className={"form-select nanumSquareR-font-normal"} onChange={setReq}
                                style={style.form}>
                            <option value={"없음"}>요청사항을 선택해 주세요.</option>
                            <option value={"부재시 문앞에 놓아주세요."}>부재시 문앞에 놓아주세요.</option>
                            <option value={"부재시 경비실에 맡겨주세요."}>부재시 경비실에 맡겨주세요.</option>
                            <option value={"배송 후 연락주세요."}>배송 후 연락주세요.</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeliveryAddress;