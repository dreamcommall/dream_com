import React, {useEffect, useState} from "react";
import "./SimpleReview.css";
import axios from "axios";

function SimpleReview({review, url}) {
    const axiosUrl = "http://localhost:8080/get" + url + "Msg";
    const [msgList, setMsgList] = useState([]);

    let temp = [];


    useEffect( () => {
        axios.get(axiosUrl)
            .then(req => {
                temp = req.data;
                setMsgList(temp);
            })
            .catch(err => {

            });
    }, [])

    return (
        <div id={"div-simpleReview"}>
            <p className={"text-center nanumSquareB-font-large mt-5"}>{review} 리뷰</p>
            {msgList.map(item => {
                return <div key={item.key}>
                    <input type={"radio"} id={item.key} name={"simpleReview"} />
                    <label htmlFor={item.key}>{item.msg}</label>
                </div>
            })}
        </div>
    )
}

export default SimpleReview;