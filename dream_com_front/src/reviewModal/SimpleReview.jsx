import React, {useEffect, useState} from "react";
import "./reviewModalCss/SimpleReview.css";
import axios from "axios";

function SimpleReview(props) {
    const radioValue = (e) => {
        // 선택한 리뷰메세지 번호 ReviewModalApp.jsx 컴포넌트에 저장
        props.setting(e.target.value);
    }
    return (
        <div id={"div-reviewModal-simpleReview"}>
            <p className={"text-center nanumSquareB-font-large"}>{props.title}</p>
            <div id={"div-reviewModal-radioList"}>
                {props.msg.map(item => {
                    return (
                        <div key={item.key} className={"div-reviewModal-radio"}>
                            <div>
                                <input className={"input-reviewModal-radio"} type={"radio"} value={item.key}
                                       name={props.name} onClick={radioValue} defaultChecked={item.key === 1} />
                            </div>
                            <label className={"nanumSquareR-font-normal"}>{item.msg}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SimpleReview;