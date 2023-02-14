import React, {useEffect, useState} from "react";
import {useDaumPostcodePopup} from 'react-daum-postcode';

function MyPageUserInfoUpdateMain({userInfo,setUserInfo}) {
    // 우편번호
    const [postNum, setPostNum] = useState("");
    // 주소
    const [address, setAddress] = useState("");

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
        setUserInfo.setUserPost(data.zonecode);
        setPostNum(data.zonecode);
        setUserInfo.setUserAddr(fullAddress);
        setAddress(fullAddress);
    };

    const telHandleChange = (e) =>{
        setUserInfo.setUserTel(e.target.value)
    }

    const ectAddrHandleChange = (e) => {
        setUserInfo.setUserEctAddr(e.target.value)
    }

    return (
        <div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>휴대전화</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"text"} value={userInfo.userTel} onChange={telHandleChange}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>이메일</div>
                <div id={"div-sign-up-email-content"} className={"row"}>
                    <div className={"pb-2"}>
                        <input type={"text"} value={userInfo.userEmail} readOnly={true}/>
                        <button className={"button-sing-up-button"}>메일 전송</button>
                    </div>
                    <div>
                        <input type={"text"} readOnly={true}/>
                        <button className={"button-sing-up-button"}>인증 확인</button>
                    </div>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>우편번호</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"number"} readOnly={true} value={userInfo.userPost}/>
                    <button className={"button-sing-up-button"} onClick={postPopUpOpen}>우편번호</button>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>주소</div>
                <div id={"div-sign-up-email-content"} className={"row"}>
                    <div className={"pb-2"}>
                        <input className={"input-sign-up-address"} type={"text"} readOnly={true} value={userInfo.userAddr} placeholder={"주소"} />
                    </div>
                    <div>
                        <input className={"input-sign-up-address"} type={"text"} placeholder={"상세주소"} value={userInfo.userEctAddr}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyPageUserInfoUpdateMain;