import React, {useEffect, useState} from "react";
import SignUpMain from "./SignUpMain";
import SignUpUpperContents from "./SignUpUpperContents";
import "./signCss/SignUpApp.css";
import "../fonts/fontStyle.css"
import NewSignUpHeader from "./NewSignUpHeader";
import axios from "axios";
import ClickPrevent from "../common/ClickPrevent";
import Loading from "../common/Loading";
import {Link} from "react-router-dom";

function SignUpApp() {
    const [isLoad, setIsLoad] = useState(false); // 로딩창
    const [signUserId, setSignUserId] = useState(""); // 새로 가입하는 유저 아이디
    // 이름
    const [signUserName, setSignUserName] = useState("");
    // 비밀번호
    const [signUserPw, setSignUserPw] = useState("");
    // 비밀번호 확인
    const [pwdChk, setPwdChk] = useState("");
    // 성별
    const[signUserGender, setSignUserGender] = useState("");
    // 휴대전화 번호
    const [signUserTel, setSignUserTel] = useState("");
    // 이메일
    const [signUserEmail, setSignUserEmail] = useState("");
    // 우편번호
    const [signUserPost, setSignUserPost] = useState("");
    // 주소
    const [signUserAddr, setSignUserAddr] = useState("");
    // 상세주소
    const [signUserEctAddr, setSignUserEctAddr] = useState("");
    // 인증 완료 state
    const [emailAuth, setEmailAuth] = useState(false);

    // SignUpUpperContent 컴포넌트 props
    const signUpUpperContentProps = {setSignUserName: setSignUserName, setSignUserPw: setSignUserPw,
        setPwdChk: setPwdChk, setSignUserGender: setSignUserGender}

    // SignUpMain 컴포넌트 props
    const signUpMainProps = {setUserTel: setSignUserTel, setUserEmail: setSignUserEmail, setUserPost: setSignUserPost,
        setUserAddr:setSignUserAddr, setUserEctAddr:setSignUserEctAddr, userEmail:signUserEmail, setEmailAuth: setEmailAuth}

    
    // 하위 컴포넌트에서 사용
    const sendSignUserId = (targetId) => {
        setIsLoad(true);
        checkIdOverlap(targetId);
    }
    
    // 아이디 중복 체크 실행
    const checkIdOverlap = (targetId) => {
        axios.post("http://localhost:8080/idChk", null, {params : {userId : targetId}})
            .then(response => {
                if (response.data == 1) {
                    alert("이미 사용중인 아이디입니다.");
                } else {
                    setSignUserId(targetId); // 신규로 사용할 아이디를 저장
                    alert("사용 가능한 아이디입니다.");
                }
                setIsLoad(false);
            }).catch(err => {
                console.log(`에러 메세지 : ${err}`);
                console.log("아이디 중복확인에 실패했습니다.");
                setIsLoad(false);
        });
    }

    // 회원가입
    const clickJoin = () => {
        const post = parseInt(signUserPost);
        if(signUserTel === "" || signUserEmail === "" || signUserPost === 0 || signUserAddr === "" ||
        signUserName === "" || signUserPw === "" || signUserGender === "") {
            alert("빈 칸을 모두 입력해 주세요");
        } else if (signUserPw !== pwdChk) {
            alert("비밀번호가 일치하지 않습니다.");
        } else {
            axios.put("http://localhost:8080/join", null,
                {params: {
                        userId: signUserId,
                        userName: signUserName,
                        userPw: signUserPw,
                        userGender: signUserGender,
                        userTel: signUserTel,
                        userEmail: signUserEmail,
                        userPost: post,
                        userAddr: signUserAddr + " " + signUserEctAddr
                    }})
                .then(req => {
                    if(req.data === 1) {
                        document.getElementById("link-signUpApp-Link").click();
                    }
                })
                .catch(err => {
                    console.log("통신에러");
                })
        }
    }
    
    return (
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad} />
            <Loading loadStatus={isLoad} />
            <NewSignUpHeader pageName={"SignUp"} />
            <div className={"container"}>
                <SignUpUpperContents funcSendSignUserId={sendSignUserId} signUpUpperContentProps={signUpUpperContentProps} />
                <SignUpMain signUpMainProps={signUpMainProps} setIsLoad={setIsLoad}  />
                <div id={"div-sing-up-SignUpButton"}>
                    <button id={"button-sing-up-SignUpButton"} disabled={!emailAuth} onClick={clickJoin}>회원가입</button>
                </div>
                <Link to={"/clearTitle/signClear"} id={"link-signUpApp-Link"} style={{display:"none"}}>/clearTitle/signClear</Link>
            </div>
        </div>
    )
}

export default SignUpApp;