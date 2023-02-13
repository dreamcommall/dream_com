import React from "react";
import "./SignUpMain.css";
import {useDaumPostcodePopup} from 'react-daum-postcode';

function SignUpMain() {
    const daumPostPopUp = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    return (
        <div className={"container-fluid"}>
            <div className={"container"}>
                <div className={"signUpMainForm"}>
                    <label className={"signUpMainLabel"}>휴대전화</label>
                    <input className={"signUpMainInput"} type={"text"} />
                </div>
                <div className={"signUpMainForm row"}>
                    <div className={"col-1"} id={"signUpMainEmailLabel"}>
                        <label className={"signUpMainLabel"}>이메일</label>
                    </div>
                    <div className={"col-11 ps-0"}>
                        <div className={"mb-2"}>
                            <input className={"signUpMainInput"} type={"text"} />
                            <button className={"signUpMainButton"}>인증번호 전송</button>
                        </div>
                        <div>
                            <input className={"signUpMainInput"} type={"text"} />
                            <button className={"signUpMainButton"}>인증번호 확인</button>
                        </div>
                    </div>
                </div>
                <div className={"signUpMainForm"}>
                    <label className={"signUpMainLabel"}>우편번호</label>
                    <input className={"signUpMainInput"} type={"number"} readOnly={true} />
                    <button className={"signUpMainButton"}>우편번호 검색</button>
                </div>
                <div className={"signUpMainForm row"}>
                    <div className={"col-1"} id={"signUpMainAddrLabel"}>
                        <label className={"signUpMainLabel"}>주소</label>
                    </div>
                    <div className={"col-11 ps-0"}>
                        <div>
                            <input className={"signUpMainInput mb-2"} type={"text"} readOnly={true} placeholder={"주소"} />
                        </div>
                        <div>
                            <input className={"signUpMainInput"} type={"text"} placeholder={"상세주소"} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpMain;