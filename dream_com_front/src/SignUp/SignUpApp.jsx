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
    
    return (
        <div className={"container-fluid"}>
            <ClickPrevent isLoading={isLoad} />
            <Loading loadStatus={isLoad} />
            <NewSignUpHeader pageName={"SignUp"} />
            <div className={"container"}>
                <SignUpUpperContents funcSendSignUserId={sendSignUserId} />
                <SignUpMain />
            </div>
        </div>
    )
}

export default SignUpApp;