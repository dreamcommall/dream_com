import React from "react";
import "./SignUpHeader.css";
import SignMainLogo from "../SignMainLogo.png"
import SignInfomation from "../common/SignInfomation";
import "../fonts/fontStyle.css";

function SignUpHeader() {
    return (
        <div>
            <div className={"container"} id={"signMain"}>
                <div id={"Sign-mainLogo"}>
                    <img style={{width:"70%"}} src={SignMainLogo}/>
                </div>
                <div id={"SignText"}>
                    <p style={{fontSize:"40px", paddingTop:"10px"}} className={"nanumSquareB-font-normal"}>회원가입</p>
                </div>
                <div className={"ListHeader"} >
                    <div id={"yac"}>
                        <p className={"nanumSquareB-font-normal"}>약관 동의</p>
                    </div>
                    <div id={"information"}>
                        <p className={"nanumSquareB-font-normal"}>정보 입력</p>
                    </div>
                    <div id={"SignUpClear"}>
                        <p className={"nanumSquareB-font-normal"}>가입 완료</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpHeader;