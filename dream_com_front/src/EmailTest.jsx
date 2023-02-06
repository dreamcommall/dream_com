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

    const [uniqueId,setUniqueId] = useState("");




    const sendEmail = () => {
        axios.post('http://localhost:8080/sendEmail',null, {
            params:{
                email:email
            }})
            .then((req) =>{
                alert("이메일을 전송하였습니다.")
                console.log(req.data);
                setUniqueId(req.data);
            })
    }

    const sendEmailChk = () => {
        axios.post("http://localhost:8080/EmailChk" ,null,{
            params:{
                chkNumber:emailChk,
                uniqueId:uniqueId
            }
        })
            .then((req)=>{
                console.log(req.data);
            })
            .catch((err) => {
                alert("만료된 인증번호 입니다.")
            })
    }

    return(
        <div>
            <input type="email" value={email} onChange={emailHandleChange} />
            <button className={"btn btn-primary"} onClick={sendEmail}>인증번호 받기</button>
            <input type="text" value={emailChk} onChange={emailChkHandleChange} />
            <button className={"btn btn-primary"} onClick={sendEmailChk}>인증번호 확인</button>
            <input type={"hidden"} value={{uniqueId}} />
        </div>
    )
}

export default EmailTest