import React, {useState} from "react";

function SignUpUpperContents({funcSendSignUserId}) {
    const sendUserId = () => {
        const input = document.querySelector("#input-sing-up-user-id");
        funcSendSignUserId(input.value);
    }
    
    return (
        <div className={"mt-5"}>
            <h4 id={"h4-sing-up-header-title"} className={"mb-0 nanumSquareB-font-large"}>정보 입력</h4>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>이름</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"text"}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>아이디</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input id={"input-sing-up-user-id"} type={"text"} />
                    <button id={"button-sing-up-user-id-check"} onClick={sendUserId}>중복체크</button>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>비밀번호</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"text"}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>비밀번호 확인</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"text"}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>성별</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"radio"} name={"gender"}/><span className={"ms-1"}>남성</span>
                    <input type={"radio"} name={"gender"} className={"ms-2"}/><span className={"ms-1"}>여성</span>
                </div>
            </div>
        </div>
    )
}

export default SignUpUpperContents;