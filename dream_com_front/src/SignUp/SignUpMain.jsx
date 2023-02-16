import React, {useState} from "react";
import {useDaumPostcodePopup} from 'react-daum-postcode';
import axios from "axios";

function SignUpMain({signUpMainProps, setIsLoad}) {
    // 이메일 전송 시 내려받는 sessionId
    const [uniqueId, setUniqueId] = useState("");
    // 이메일 인증 번호
    const [chkNumber, setChkNumber] = useState("");
    // 우편번호
    const [postNum, setPostNum] = useState("");
    // 주소
    const [address, setAddress] = useState("");
    // 메일 전송 여부
    const [sendAuth, setSendAuth] = useState(false);

    // 다음 주소 찾기 api
    const daumPostPopUp = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

    // 우편번호찾기 버튼
    const postPopUpOpen = () => {
        daumPostPopUp({onComplete: handleComplete})
    }

    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== '' ? ` ${extraAddress}` : '';
        }
        signUpMainProps.setUserPost(data.zonecode);
        setPostNum(data.zonecode);
        signUpMainProps.setUserAddr(fullAddress);
        setAddress(fullAddress);
    };



    // 인증번호 전송
    const sendEmail = async () => {
        setIsLoad(true);
        let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if(!exptext.test(signUpMainProps.userEmail)) {
            alert("이메일 형식이 아닙니다.");
            setIsLoad(false);
        } else {
            await axios.post("/sendEmail", null, {params: {email: signUpMainProps.userEmail}})
                .then(req => {
                    alert("메일이 발송되었습니다.");
                    setUniqueId(req.data);
                    setIsLoad(false);
                    setSendAuth(true);
                })
                .catch(err => {
                    console.log("통신 오류");
                })
        }
    }

    // 인증번호 확인
    const EmailChk = () => {
        setIsLoad(true);
        if(chkNumber === "") {
            alert("인증번호를 입력해주세요");
            setIsLoad(false);
        } else if (uniqueId === "") {
            alert("메일 전송 과정 중 문제가 발생했습니다.");
            setIsLoad(false);
        } else {
            axios.post("/EmailChk", null, {params: {chkNumber: chkNumber, uniqueId: uniqueId}})
                .then(req => {
                    if(req.data === 1) {
                        alert("인증이 완료되었습니다.");
                        signUpMainProps.setEmailAuth(true);
                        setIsLoad(false);
                    } else {
                        alert("인증번호가 틀렸습니다.");
                        setIsLoad(false);
                    }
                })
                .catch(err => {
                    console.log("통신 오류");
                })
        }
    }

    // 휴대전화 번호 입력값 변경 시
    const changeTel = (e) => {
        signUpMainProps.setUserTel(e.target.value);
    }

    // 이메일 입력값 변경 시
    const changeEmail = (e) => {
        signUpMainProps.setUserEmail(e.target.value);
    }

    // 인증번호 입력값 변경 시
    const changeChkNumber = (e) => {
        setChkNumber(e.target.value);
    }
    // 상세 주소 입력값 변경 시
    const changeEctAddr =(e) => {
        signUpMainProps.setUserEctAddr(e.target.value);
    }

    return (
        <div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>휴대전화</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"text"} onChange={changeTel} />
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>이메일</div>
                <div id={"div-sign-up-email-content"} className={"row"}>
                    <div className={"pb-2"}>
                        <input type={"text"} onChange={changeEmail} />
                        <button className={"button-sing-up-button"} onClick={sendEmail}>메일 전송</button>
                    </div>
                    <div>
                        <input type={"text"} onChange={changeChkNumber} />
                        <button className={"button-sing-up-button"} onClick={EmailChk} disabled={!sendAuth}>인증 확인</button>
                    </div>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>우편번호</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"number"} readOnly={true} defaultValue={postNum} />
                    <button className={"button-sing-up-button"} onClick={postPopUpOpen}>우편번호</button>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>주소</div>
                <div id={"div-sign-up-email-content"} className={"row"}>
                    <div className={"pb-2"}>
                        <input type={"text"} className={"input-sign-up-address"} placeholder={"주소"} defaultValue={address} />
                    </div>
                    <div>
                        <input type={"text"} className={"input-sign-up-address"} placeholder={"상세주소"} onChange={changeEctAddr} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUpMain;