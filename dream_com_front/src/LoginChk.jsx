import React, {useState} from "react";
import axios from "axios";

function LoginChk(){
    const [userId,setUserId] = useState("");
    const [userPw,setUserPw] = useState("");

    const handleInputId = (e) => {
        setUserId(e.target.value);
    }

    const handleInputPw = (e) => {
        setUserPw(e.target.value)
    }

    const LoginChk = () => {
        axios.post('http://localhost:8080/loginChk',null,{
            params:{
            userId:userId,
            userPw:userPw
            }})
            .then((req) => {
                const {data} = req;
                console.log(data)
                if(data == 0){
                    alert(`아이디 & 비밀번호를 확인해주세요.`);
                }
                else {
                    alert(`${data.userId}님 반갑습니다.`);
                }
            })
            .catch((err) => {
                console.log(err);
                alert('통신실패')
            })
    }

    const idChk = () => {
        axios.post('http://localhost:8080/idChk',null,{
            params:{
                userId:userId
            }
        })
            .then((req)=>{
                console.log(req.data);
            })
    }
    return(
        <div className={"container"}>
                  <label className={"form-label"}>아이디 : </label>
                <input className={"form-control"}  value={userId} onChange={handleInputId}/>
                <button className={"btn btn-primary"} onClick={idChk}>아이디 중복체크</button>
                <label className={"form-label"}>비밀번호 : </label>
                <input className={"form-control"}  value={userPw} onChange={handleInputPw}/>
                <button className={"btn btn-primary"} onClick={LoginChk}>로그인</button>
        </div>
    )
}

export default LoginChk;