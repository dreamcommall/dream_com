import React from "react";
import "../fonts/fontStyle.css"
import "./SignUpUpperContents.css"

function SignUpUpperContents() {
    return (
        <div className={"mt-5"}>
            <h4 id={"h4-sing-up-header-title"} className={"mb-2 nanumSquareB-font-large"}>정보 입력</h4>
            <div className={"div-sign-up-contents-wrapper"}>
                <div>이름</div>
                <div>
                    <input type={"text"}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div>아이디</div>
                <div>
                    <input type={"text"}/>
                    <button id={"button-sing-up-user-id-check"}>중복체크</button>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div>비밀번호</div>
                <div>
                    <input type={"text"}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div>비밀번호 확인</div>
                <div>
                    <input type={"text"}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div>성별</div>
                <div>
                    <input type={"radio"} name={"gender"}/><span className={"ms-1"}>남성</span>
                    <input type={"radio"} name={"gender"} className={"ms-2"}/><span className={"ms-1"}>여성</span>
                </div>
            </div>
        </div>
    )
}

export default SignUpUpperContents;