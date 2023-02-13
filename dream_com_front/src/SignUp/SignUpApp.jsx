import React, {useEffect, useState} from "react";
import SignUpMain from "./SignUpMain";
import SignUpUpperContents from "./SignUpUpperContents";
import "./SignUpApp.css";
import "../fonts/fontStyle.css"
import NewSignUpHeader from "./NewSignUpHeader";
import axios from "axios";
import ClickPrevent from "../common/ClickPrevent";
import Loading from "../common/Loading";

function SignUpApp() {
    const [signUserId, setSignUserId] = useState(""); // 새로 가입하는 유저 아이디
    const [isLoad, setIsLoad] = useState(false); // 로딩창

    // 휴대전화 번호
    const [userTel, setUserTel] = useState("");
    // 이메일
    const [userEmail, setUserEmail] = useState("");
    // 우편번호
    const [userPost, setUserPost] = useState("");
    // 주소
    const [userAddr, setUserAddr] = useState("");
    // 상세주소
    const [userEctAddr, setUserEctAddr] = useState("");
    // 인증 완료 state
    const [emailAuth, setEmailAuth] = useState(false);

    // SignUpMain
    const signUpMainProps = {setUserTel: setUserTel, setUserEmail: setUserEmail, setUserPost: setUserPost,
        setUserAddr:setUserAddr, setUserEctAddr:setUserEctAddr, userEmail:userEmail, setEmailAuth: setEmailAuth}

    
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
        const post = parseInt(userPost);
        if(userTel === "" || userEmail === "" || userPost === 0 || userAddr === "") {
            alert("빈 칸을 모두 입력해 주세요")
        } else {
            axios.put("http://localhost:8080/join", null,
                {params: {
                        userId: 'qwer',
                        userName: "양민호",
                        userPw: 1234,
                        userGender: "M",
                        userTel: userTel,
                        userEmail: userEmail,
                        userPost: post,
                        userAddr: userAddr + " " + userEctAddr
                    }})
                .then(req => {
                    console.log(req.data);
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
                <SignUpUpperContents funcSendSignUserId={sendSignUserId} />
                <SignUpMain signUpMainProps={signUpMainProps}  />
            </div>
            <div id={"div-sing-up-SignUpButton"}>
                <button id={"button-sing-up-SignUpButton"} disabled={!emailAuth} onClick={clickJoin}>회원가입</button>
            </div>
        </div>
    )
}

export default SignUpApp;