import React, {useState} from "react";
import "./reviewModalCss/ReviewDetailContent.css";

function ReviewDetailContent(props) {
    // 입력한 길이 저장할 state
    const [length, setLength] = useState(0);
    const textLength = (e) => {
        // 길이 저장
        setLength(e.target.value.length);
        // 입력한 내용 ReviewModalApp.jsx 컴포넌트 state에 저장
        props.setting(e.target.value);
    }
    return (
        <div id={"div-reviewModal-detailContent"}>
            <p className={"text-center nanumSquareB-font-large mt-3 my-0"}>어떤 점이 좋았나요 ?</p>
            <div id={"div-reviewModal-contentText"}>
                <div id={"div-reviewModal-textLength"}>
                    <span>{length} / 150</span>
                </div>
                <textarea rows={5} cols={50} className={"nanumSquareR-font-normal"} id={"textarea-reviewModal"}
                          maxLength={150} onChange={textLength} placeholder={"상세 후기를 입력해 주세요."}
                style={length === 0 ? {backgroundColor: "#f4f4f4"} : {backgroundColor : ""}}></textarea>
            </div>
        </div>
    )
}

export default ReviewDetailContent;