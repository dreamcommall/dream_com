import React, {useState} from "react";

function SignUpUpperContents({funcSendSignUserId, signUpUpperContentProps}) {
    const sendUserId = () => {
        const input = document.querySelector("#input-sing-up-user-id");
        funcSendSignUserId(input.value);
    }

    const changeName = (e) => {
        signUpUpperContentProps.setSignUserName(e.target.value);
    }
    const changePw = (e) => {
        signUpUpperContentProps.setSignUserPw(e.target.value);
    }
    const changePwdChk = (e) => {
        signUpUpperContentProps.setPwdChk(e.target.value);
    }
    const changeGender =(e) => {
        signUpUpperContentProps.setSignUserGender(e.target.value);
    }

    
    return (
        <div className={"mt-5"}>
            <h4 id={"h4-sing-up-header-title"} className={"mb-0 nanumSquareB-font-large"}>정보 입력</h4>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>이름</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"text"} onChange={changeName}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>아이디</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input id={"input-sing-up-user-id"} type={"text"} />
                    <button id={"button-sing-up-user-id-check"} onClick={sendUserId}>중복체크</button>
                </div>
            </div>
            <form className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>비밀번호</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"password"} onChange={changePw}/>
                </div>
            </form>
            <form className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>비밀번호 확인</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"password"} onChange={changePwdChk}/>
                </div>
            </form>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>성별</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"radio"} name={"gender"} value={"M"} onChange={changeGender} /><span className={"ms-1"}>남성</span>
                    <input type={"radio"} name={"gender"} value={"F"} onChange={changeGender} className={"ms-2"}/><span className={"ms-1"}>여성</span>
                </div>
            </div>
        </div>
    )
}

export default SignUpUpperContents;