import React, {useEffect, useState} from "react";
import "./ReviewModalApp.css";
import ReviewModalProductInfo from "./ReviewModalProductInfo";
import TotalScore from "./TotalScore";
import SimpleReview from "./SimpleReview";
import axios from "axios";

function ReviewModalApp() {
    const [deliveryMsg, setDeliveryMsg] = useState([]);
    const [specMsg, setSpecMsg] = useState([]);
    const [noiseMsg, setNoiseMsg] = useState([]);
    const [packagingMsg, setPackagingMsg] = useState([]);

    let temp = [];
    useEffect(() => {
        axios.get("http://localhost:8080/simpleReviewMsg")
            .then(req => {
                temp = req.data["delivery"];
                setDeliveryMsg(temp);
                temp = req.data["noise"];
                setNoiseMsg(temp);
                temp = req.data["spec"];
                setSpecMsg(temp)
                temp = req.data["packaging"];
                setPackagingMsg(temp);
            })
            .catch(err => {
                console.log("통신 오류")
            })
    }, [])
    return (
        <div id={"div-reviewModal"}>
            <div style={{borderBottom: "10px solid lightgrey"}}>
                <div className={'nanumSquareB-font-XLarge border-bottom text-center'}>
                <span>
                    리뷰쓰기
                </span>
                    <button id={"button-close"}>X</button>
                </div>
                <ReviewModalProductInfo />
            </div>
            <TotalScore />
            <SimpleReview title={"소음은 어떤가요?"} msg={noiseMsg} name={"noise"} />
            <SimpleReview title={"성능은 어떤가요?"} msg={specMsg} name={"spec"} />
            <SimpleReview title={"배송상태는 어떤가요?"} msg={deliveryMsg} name={"delivery"} />
            <SimpleReview title={"포장상태는 어떤가요?"} msg={packagingMsg} name={"packaging"} />
        </div>
    )
}

export default ReviewModalApp;