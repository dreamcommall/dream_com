import React, {useState} from "react";
import "./SignUpClear.css"
import clause from "../SignUp/Clause";
import imgChk from "../chk240.png"
import "../fonts/fontStyle.css"
import SignUpHeader from "../SignUp/SignUpHeader";


const ClearPages = {
    //회원가입 완료창
    signClear: {
        mainText: '회원 가입이 완료되었습니다',
        subText:'',
        buttonName: '로그인',
        LinkPage: '/Login'
    },
    //로그아웃 완료창
    logOutClear: {
        mainText: '로그아웃이 되었습니다',
        subText:'',
        buttonName: '로그인',
        LinkPage: '/Login'

    },
    // 기본정보 수정 완료창
    basicInformation: {
        mainText: '정보 수정이 완료되었습니다',
        subText:'',
        buttonName: '',
        LinkPage: '/'
    },
    //마이페이지 로
    //결제완료 창
    paymentClear: {
        mainText: '결제가 완료되었습니다',
        subText:'',
        buttonName:'상세',
        LinkPage: '/'

    }
    //마이페이지 로


}

function SignClear() {


    const handleLogin = () => {
        window.location.href = "/Login"
    }

    // 경매를 선택한 경우
    const handleMain = () => {
        window.location.href = "/"
    }

    return (
        <div>
            <SignUpHeader/>
            <div className={"signClear"}>
                <div id={"signCMain"}>
                    <div className={"signClearMain"}>
                        <div>
                            <img src={imgChk}/>
                        </div>

                        <h1 className={"nanumSquareR-font-XXLarge"}>회원가입이<span
                            style={{color: "#e26e6e"}}> 완료</span> 되었습니다</h1>
                        <h6 className={"nanumSquareR-font-small"}>Dream Computer 홈페이지에 가입해 주셔서 감사합니다</h6>
                        <h6 className={"nanumSquareR-font-small"}>로그인 후 다양한 서비스를 사용하실 수 있습니다</h6>
                    </div>
                    <div style={{borderTop: "1px solid lightgray", marginTop: "30px"}}>

                    </div>
                    <div className={"btnChk"}>

                        <div className={"col"}>

                            <button style={{marginLeft: "50%", backgroundColor: "black", color: "white"}}
                                    id={"btnClear"} onClick={() => handleLogin(true)}>로그인
                            </button>
                        </div>
                        <div className={"col"}>
                            <button style={{
                                marginLeft: "20%",
                                border: "1px solid black",
                                backgroundColor: "white",
                                color: "black"
                            }} id={"btnClear"} onClick={() => handleMain(false)}>메인 창
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignClear;