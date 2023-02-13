import React, {useState} from "react";
import "./ProcessClear.css"
import imgChk from "../chk240.png"
import "../fonts/fontStyle.css"
import SignUpHeader from "../SignUp/SignUpHeader";
import {Link, useLocation, useParams} from "react-router-dom";

const ClearPages = {
    //회원가입 완료창
    signClear: {
        mainText: '회원 가입이 완료되었습니다',
        subText: '로그인 후 다양한 서비스를 사용하실 수 있습니다',
        buttonName: '로그인',
        url: "/login"
    },
    
    //로그아웃 완료창
    logOutClear: {
        mainText: '로그아웃이 되었습니다',
        subText: '로그인 후 다양한 서비스를 사용하실 수 있습니다',
        buttonName: '로그인',
        url: "/login"

    },

    //메일 전송 완료 창
    emailDataClear:{
        mainText: '이메일에 전송 되었습니다',
        subText: '만료 시간 전에 입력하시오',
        buttonName: '로그인',
        url: "/login"
    },

    // 기본정보 수정 완료창
    basicInformation: {
        mainText: '정보 수정이 완료되었습니다',
        subText: '',
        buttonName: '마이페이지',
        url:'/mypage/order'
    },
    //마이페이지 로
    //결제완료 창
    paymentClear: {
        mainText: '결제가 완료되었습니다',
        subText: '',
        buttonName: '마이페이지',
        url: '/mypage/order'
    }
    //마이페이지로
}

function ProcessClear() {

    // 체인지 버튼
    const [clearBtn, setClearBtn] = useState(true);

    const {titleNames} = useParams();
    const profile = ClearPages[titleNames];

    const location = useLocation();
    const {pathname} = location;

    const handleClear =()=>{
        setClearBtn((prevState)=>prevState)

    }

    return (
        <div>
            {pathname == "/clearTitle/signClear" ? <SignUpHeader/> : null}


            <div className={"signClear"}
                style={{marginTop: pathname !== "/clearTitle/signClear" ? "150px" : null}}>
                <div id={"signCMain"}>
                    <div className={"signClearMain"}>
                        <div>
                            <img src={imgChk} style={{width:"210px"}}/>
                        </div>
                        <h1>{profile.mainText}</h1>
                        <h6>{profile.subText}</h6>

                        {/*<h1 className={"nanumSquareR-font-XXLarge"}>회원가입이<span*/}
                        {/*    style={{color: "#e26e6e"}}> 완료</span> 되었습니다</h1>*/}
                        {/*<h6 className={"nanumSquareR-font-small"}>Dream Computer 홈페이지에 가입해 주셔서 감사합니다</h6>*/}
                        {/*<h6 className={"nanumSquareR-font-small"}>로그인 후 다양한 서비스를 사용하실 수 있습니다</h6>*/}
                    </div>
                    <div style={{borderTop: "1px solid lightgray", marginTop: "30px"}}></div>
                    <div className={"btnChk"}>

                        <div className={"col"}>
                            {clearBtn ?(
                            <Link to={profile.url}>
                            <button style={{marginLeft: "60%", backgroundColor: "black", color: "white"}}
                                    id={"btnClear"} onClick={handleClear}>{profile.buttonName}</button></Link>):
                                (<Link to={profile.url}>
                                    <button style={{marginLeft: "60%", backgroundColor: "black", color: "white"}}
                                            id={"btnClear"} onClick={handleClear}>{profile.buttonName}</button></Link>)
                            }
                        </div>
                        <div className={"col"}>
                            <Link to={"/"}><button style={{
                                marginLeft: "5%",
                                border: "1px solid black",
                                backgroundColor: "white",
                                color: "black"
                            }} id={"btnClear"}>메인 창
                            </button></Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );

}

export default ProcessClear;