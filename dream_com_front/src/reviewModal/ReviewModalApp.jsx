import React, {useEffect, useState} from "react";
import "./ReviewModalApp.css";
import ReviewModalProductInfo from "./ReviewModalProductInfo";
import TotalScore from "./TotalScore";
import SimpleReview from "./SimpleReview";
import axios from "axios";
import ReviewDetailContent from "./ReviewDetailContent";

function ReviewModalApp(props) {
    // 리뷰 메세지 종류
    const [deliveryMsgList, setDeliveryMsgList] = useState([]);
    const [specMsgList, setSpecMsgList] = useState([]);
    const [noiseMsgList, setNoiseMsgList] = useState([]);
    const [packagingMsgList, setPackagingMsgList] = useState([]);

    // 선택한 별점
    const [rate, setRate] = useState(0);

    // 선택한 리뷰 번호
    const [deliveryMsgNum, setDeliveryMsgNum] = useState(1);
    const [specMsgNum, setSpecMsgNum] = useState(1);
    const [noiseMsgNum, setNoiseMsgNum] = useState(1);
    const [packagingMsgNum, setPackagingMsgNum] = useState(1);

    // 입력한 후기
    const [content, setContent] = useState("");
    if(content == "") {
        setContent("내용 없음");
    }

    // 간단리뷰 메시지 목록 불러오기
    let temp = [];
    useEffect(() => {
        axios.get("http://localhost:8080/simpleReviewMsg")
            .then(req => {
                temp = req.data["delivery"];
                setDeliveryMsgList(temp);
                temp = req.data["noise"];
                setNoiseMsgList(temp);
                temp = req.data["spec"];
                setSpecMsgList(temp)
                temp = req.data["packaging"];
                setPackagingMsgList(temp);
            })
            .catch(err => {
                console.log("통신 오류")
            })
    }, []);

    const insertReview = () => {
        if(rate == 0) {
            alert("별점을 선택해주세요");
        } else if (noiseMsgNum == 0) {
            alert("소음리뷰를 선택해주세요");
        }
        alert("선택 완료");
    }

    return (
        <div id={"div-reviewModal"}>
            <div style={{borderBottom: "10px solid lightgrey"}}>
                <div className={'nanumSquareB-font-XLarge border-bottom text-center'}>
                <span>
                    리뷰쓰기
                </span>
                    <button id={"button-close-top"}>X</button>
                </div>
                <ReviewModalProductInfo title={"제품 판매글 제목"} productNum={"제품 번호"} />
            </div>
            <TotalScore setting={setRate} />
            <SimpleReview title={"소음은 어떤가요?"} msg={noiseMsgList} setting={setNoiseMsgNum} name={"noise"} />
            <SimpleReview title={"성능은 어떤가요?"} msg={specMsgList} setting={setSpecMsgNum} name={"spec"} />
            <SimpleReview title={"배송상태는 어떤가요?"} msg={deliveryMsgList} setting={setDeliveryMsgNum} name={"delivery"} />
            <SimpleReview title={"포장상태는 어떤가요?"} msg={packagingMsgList} setting={setPackagingMsgNum} name={"packaging"} />
            <ReviewDetailContent setting={setContent} />
            <div className={"text-center"}>
                <button id={"button-close-bottom"}>취소</button>
                <button id={"button-insert"} onClick={insertReview}>등록</button>
            </div>
        </div>
    )
}

export default ReviewModalApp;