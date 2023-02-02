import React, {useState} from "react";
import axios from "axios";
import "../fonts/fontStyle.css"
import "./Login.css"
import {Link} from "react-router-dom";

// 작성자 : YMKJJ
// 기능 : 로그인 UI / 로그인 기능
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
    paddingTop:"200px"
}

const loginFooter = {
    fontSize:"12px",
    color:"gray",
    marginTop:"80px"
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
                            <Link to={"/"}><img src={"/images/mainLogo2.png"} style={imgSize}></img></Link>
                        </div>
                        <div>
                            <input placeholder={"아이디"} value={userId} onChange={handleInputId} type={"text"}
                                   className={"border-1 border-bottom-0 nanumSquareR-font-small"} style={inputSize}/>
                        </div>
                        <div>
                            <input placeholder={"비밀번호는 8~20자"} value={userPw} onChange={handleInputPw} type={"password"}
                                    style={inputSize}/>
                        </div>
                        {/* 아이디 비밀번호 확인 글자 들어갈부분 후보 2*/}
                        <div>
                            <button style={loginBtn} onClick={LoginChk} className={"nanumSquareR-font-normal border-0 mt-3"}>로그인</button>
                        </div>
                        <div>
                            {/* 아이디 비밀번호 확인 글자 들어갈부분 후보 1*/}
                            <div className={"d-flex justify-content-between mb-5"}>
                                <div>
                                    <input className={"form-check-input ms-1 me-1"} style={{marginTop:"5px"}} type={"checkbox"} />
                                    <label className={"ms-1 nanumSquareR-font-small"} style={fontSize}>자동로그인</label>
                                </div>
                                <div>
                                    <Link to={"/findId"} className={"text-decoration-none text-dark nanumSquareR-font-small"} style={fontSize}>아이디 찾기</Link>
                                    <span className={"ms-2"}>|</span>
                                    <Link to={"/findPw"} className={"text-decoration-none ms-2 text-dark nanumSquareR-font-small"} style={fontSize}>비밀번호 찾기</Link>
                                </div>
                                </div>
                            <div className={"mt-2"}>
                                <Link to={"/sign"} className={"text-decoration-none text-dark nanumSquareR-font-Normal"} href={"http://localhost:3000"}><b>회원가입</b> ></Link>
                            </div>
                            <p className={"nanumSquareR-font-small"} style={loginFooter}>
                                Copyright © 2023 <b>DreamComputer</b> Co.,Ltd. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}


export default Login;