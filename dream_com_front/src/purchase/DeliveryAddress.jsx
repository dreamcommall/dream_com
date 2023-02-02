import React, {useEffect, useState} from "react";
import Receipt from "./Receipt";

const style = {
    border: {width: "750px", borderTop: "2px solid black", borderBottom: "1px solid lightgray",
        borderLeft: "1px solid lightgray", borderRight: "1px solid lightgray"},
    padding: {paddingTop: "20px", paddingLeft: "20px"},
    form: {width: "700px", marginBottom: "20px"},
}

function DeliveryAddress({addressList, userInfo}) {
    const [addr, setAddr] = useState([]);
    const [request, setRequest] = useState("요청사항 없음");

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
                        {addressList.map(select => {
                            return (
                                select.defaultYn == "Y" && (<select className={"form-select nanumSquareR-font-normal"} defaultValue={select.addr} onChange={setAddress} style={style.form} key={select.idx}>
                                    {addressList.map(option => {
                                        return (
                                            option.defaultYn == "Y" ?
                                                <option value={option.addr} key={option.idx} className={"nanumSquareB-font-normal"}>
                                                    {option.addr}
                                                </option>
                                                : <option value={option.addr} key={option.idx}>{option.addr}</option>
                                        )
                                    })}
                                </select>)
                            )
                        })}
                        <p>{userInfo.userName} : <span>{userInfo.userTel}</span></p>
                        <label htmlFor={"request"} className={"form-label"}>요청사항</label>
                        <select className={"form-select nanumSquareR-font-normal"} onChange={setReq}
                                style={style.form} defaultValue={"없음"}>
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