import React, {useState} from "react";
import axios from "axios";

function EmailTest(){

    const [email,setEmail] = useState("");
    const emailHandleChange = (e) => {
        setEmail(e.target.value);
    }

    const [emailChk,setEmailChk] = useState("");
    const emailChkHandleChange = (e) => {
        setEmailChk(e.target.value);
    }

    const sendEmail = () => {
        axios.post('http://localhost:8080/sendEmail',null, {
            params:{
                email:email
            }})
            .then((req) =>{
                alert("이메일을 전송하였습니다.")
            })
    }

    const sendEmailChk = () => {
        axios.post("http://localhost:8080/EmailChk" ,null,{
            params:{

            }
        })
    }

    return(
        <div>
            <input type="email" value={email} onChange={emailHandleChange} />
            <button className={"btn btn-primary"} onClick={sendEmail}>인증번호 받기</button>
            <input type="text" value={emailChk} onChange={emailChkHandleChange} />
            <button className={"btn btn-primary"} onClick={sendEmail}>인증번호 확인</button>
        </div>
    )
}

export default EmailTest