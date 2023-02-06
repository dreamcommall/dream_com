import React from "react";
import "./SignUpHeader.css";
import SignMainLogo from "../SignMainLogo.png"
import "../fonts/fontStyle.css";
import {useLocation} from "react-router-dom";

function SignUpHeader() {



    // const location=useLocation();
    // console.log(location);

    const {pathname} = useLocation()
    console.log(pathname);


    return (
        <div>
            <div className={"container"} id={"signMain"}>
                <div id={"Sign-mainLogo"}>
                    <a href={"/"}>
                    <img style={{width:"70%"}} src={SignMainLogo}/>
                    </a>
                </div>
                <div id={"SignText"}>
                    <p style={{fontSize:"40px", paddingTop:"10px"}} className={"nanumSquareB-font-normal"}>회원가입</p>
                </div>
                <div className={"ListHeader"} >
                    <div id={"yac"} >
                        <p style={{
                            color: pathname == "/sign" ? "red" : "black"
                        }} className={"nanumSquareB-font-normal"}>약관 동의</p>
                    </div>
                    <div id={"information"}>
                        <p style={{
                            color: pathname == "/signInfomation" ? "red" : "black"
                        }} className={"nanumSquareB-font-normal"}>정보 입력</p>
                    </div>
                    <div id={"SignUpClear"}>
                        <p style={{
                            color: pathname == "/clearTitle/signClear" ? "red" : "black"
                        }} className={"nanumSquareB-font-normal"}>가입 완료</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpHeader;