import React, {useEffect, useState} from "react";
import "./SimpleReview.css";
import axios from "axios";

function SimpleReview(props) {
    const [msg, setMsg] = useState(0);
    const radioValue = (e) => {
        setMsg(e.target.value);
    }
    return (
        <div id={"div-simpleReview"}>
            <p className={"text-center nanumSquareB-font-large"}>{props.title}</p>
            <div id={"div-radioList"}>
                {props.msg.map(item => {
                    return (
                        <div key={item.key} className={"div-radio"}>
                            <div>
                                <input type={"radio"} value={item.key} name={props.name} onClick={radioValue} defaultChecked={item.key == 1 ? true : false} />
                            </div>
                            <label htmlFor={item.key} className={"nanumSquareR-font-normal"}>{item.msg}</label>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default SimpleReview;