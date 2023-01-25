import React, {useState} from "react";
import axios from "axios";
import "../fonts/fontStyle.css"
import "./Login.css"
import Footer from "../common/Footer";

// 작성자 : YMKJJ
// 기능 : 로그인 UI / 로그인 기능
// 푸터 연결안함
const imgSize = {
    width:"200px",
    height:"100px",
    marginBottom:"35px"
}

const inputSize = {
    width:"400px",
    height:"50px",
    padding:"1px 16px 3px"
}

const loginBtn = {
    width:"400px",
    height:"50px",
    marginBottom:"16px",
    background:"#e26e6e",
    color:"#fff",
    borderColor:"#e26e6e"
}

const fontSize = {
    fontSize:"14px"
}

const commonStyle = {
    padding:"83px 0",
}

function Login(){

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

    return (
        <div className={"container text-center"} style={commonStyle}>
            <div className={"row"}>
                <div className={"col-4"}>
                </div>
                <div className={"col-4"}>
                    <div>
                        <a href={"#"} ><img src={"/images/mainLogo2.png"} style={imgSize}></img></a>
                    </div>
                    <div>
                        <input placeholder={"아이디"} value={userId} onChange={handleInputId} type={"text"}
                               className={"border-1 border-bottom-0 nanumSquareR-font-small"} style={inputSize}/>
                    </div>
                    <div>
                        <input placeholder={"비밀번호는 8~20자"} value={userPw} onChange={handleInputPw} type={"password"}
                               className={"nanumSquareR-font-small"} style={inputSize}/>
                    </div>
                    <div>
                        <button style={loginBtn} onClick={LoginChk} className={"nanumSquareR-font-normal border-0"}>로그인</button>
                    </div>
                    <div>
                        <div className={"d-flex justify-content-between mb-5"}>
                            <div>
                                <input className={"form-check-input ms-1 me-1"} style={{marginTop:"5px"}} type={"checkbox"} />
                                <label className={"ms-1 nanumSquareR-font-small"} style={fontSize}>자동로그인</label>
                            </div>
                            <div>
                                <a className={"text-decoration-none text-dark nanumSquareR-font-small"} href={"http://localhost:3000"}
                                style={fontSize}>아이디 찾기</a>
                                <span className={"ms-2"}>|</span>
                                <a className={"text-decoration-none ms-2 text-dark nanumSquareR-font-small"} href={"http://localhost:3000"}
                                style={fontSize}>비밀번호 찾기</a>
                            </div>
                            </div>
                        <div className={"mt-2"}>
                            <a className={"text-decoration-none text-dark nanumSquareR-font-Normal"} href={"http://localhost:3000"}><b>회원가입</b> ></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Login;