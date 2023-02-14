import React, {useEffect, useState} from "react";

function MyPageUserInfoUpdateMain2({userInfo,setUserInfo}) {

    const nameHandleChange = (e) =>{
        setUserInfo.setUserName(e.target.value)
    }

    const passwordHandleChange = (e) =>{
        setUserInfo.setUserPw(e.target.value)
    }

    return (
        <div className={"mt-5"}>
            <h4 id={"h4-sing-up-header-title"} className={"mb-0 nanumSquareB-font-large"}>회원정보 수정</h4>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>이름</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"text"} value={userInfo.userName} onChange={nameHandleChange}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>아이디</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input id={"input-sing-up-user-id"} type={"text"} value={userInfo.userId}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>비밀번호</div>
                <div className={"div-sign-up-contents-secondDiv"} onChange={passwordHandleChange}>
                    <input type={"password"}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>비밀번호 확인</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"password"}/>
                </div>
            </div>
            <div className={"div-sign-up-contents-wrapper"}>
                <div className={"div-sign-up-contents-firstDiv"}>성별</div>
                <div className={"div-sign-up-contents-secondDiv"}>
                    <input type={"radio"} name={"gender"} checked={userInfo.userGender === 'M'} disabled={true} /><span className={"ms-1"}>남성</span>
                    <input type={"radio"} name={"gender"} className={"ms-2"} checked={userInfo.userGender === 'F'} disabled={true} /><span className={"ms-1"}>여성</span>
                </div>
            </div>
        </div>
    )
}

export default MyPageUserInfoUpdateMain2;