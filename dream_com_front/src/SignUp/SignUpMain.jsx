import React from "react";
import {useDaumPostcodePopup} from 'react-daum-postcode';

function SignUpMain() {
    const daumPostPopUp = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    return (
        <div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>휴대전화</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"text"} />
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>이메일</div>
                <div id={"div-sign-up-email-content"} className={"row"}>
                    <div className={"pb-2"}>
                        <input type={"text"} />
                        <button className={"button-sing-up-button"}>메일 전송</button>
                    </div>
                    <div>
                        <input type={"text"} />
                        <button className={"button-sing-up-button"}>인증 확인</button>
                    </div>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>우편번호</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"number"} readOnly={true} />
                    <button className={"button-sing-up-button"}>우편번호</button>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>주소</div>
                <div id={"div-sign-up-email-content"} className={"row"}>
                    <div className={"pb-2"}>
                        <input type={"text"} placeholder={"주소"} />
                    </div>
                    <div>
                        <input type={"text"} placeholder={"상세주소"} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpMain;