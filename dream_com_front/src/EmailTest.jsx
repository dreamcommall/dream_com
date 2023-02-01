import React, {useState} from "react";
import axios from "axios";

function EmailTest(){

    const [email,setEmail] = useState("");
    const emailHandleChange = (e) => {
        setEmail(e.target.value);
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

    return(
        <div>
            <input type="email" value={email} onChange={emailHandleChange} />
            <button className={"btn btn-primary"} onClick={sendEmail}>인증번호 받기</button>
        </div>
    )
}

export default EmailTest