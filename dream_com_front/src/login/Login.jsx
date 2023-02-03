import React, {useEffect, useState} from "react";
import axios from "axios";
import "../fonts/fontStyle.css"
import "./Login.css"
import {Link} from "react-router-dom";
import ClickPrevent from "../common/ClickPrevent";
import Loading from "../common/Loading";

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
    const [isLoad, setIsLoad] = useState(false); // 로딩창

    // 로그인 성공후 목적지 링크로 이동한다.
    const moveDestination = () => {
        // const link = document.querySelector("#link-hidden-user-login");
        // link.click();
    }
    
    const handleInputId = (e) => {
        setUserId(e.target.value);
    }

    const handleInputPw = (e) => {
        setUserPw(e.target.value)
    }

    const test = async () => {
        console.log(sessionStorage.getItem("loginUUID"));

        await axios.post("http://localhost:8080/logout", null,
            {params : {userUUID : sessionStorage.getItem("loginUUID")}})
            .then(response => {
                alert(`${response.data}님 반갑습니다.`);
            })
            .catch(err => {
                console.log(`에러메세지 : ${err}`);
                console.log("로그인 한 유저정보 취득에 실패했습니다.");
            });
    }

    // 로그인 처리 프로세스
    // 로그인 후 성공하면 저장된 UUID를 이용해서 서버에게 유저 아이디를 내려받는다.
    const DataReceive = async () => {
        let flag = false;
        setIsLoad(true);
        await LoginChk().then(result => {
            if (result == true) {
                axios.post("http://localhost:8080/loginUserId", null,
                    {params : {userUUID : sessionStorage.getItem("loginUUID")}})
                    .then(response => {
                        alert(`${response.data}님 반갑습니다.`);
                        flag = true;
                    })
                    .catch(err => {
                        console.log(`에러메세지 : ${err}`);
                        console.log("로그인 한 유저정보 취득에 실패했습니다.");
                    });
            } else {
                console.log("로그인 한 유저정보를 가져오는 도중 문제가 발생했습니다.");
            }
        });
        return flag;
    }

    const LoginChk = async () => {
        let flag = false;
        await axios.post('http://localhost:8080/loginChk',null,{
            params:{
                userId:userId,
                userPw:userPw
            }})
            .then((req) => {
                const {data} = req;
                if(data == 0){
                    alert(`아이디 & 비밀번호를 확인해주세요.`);
                }
                else {
                    sessionStorage.setItem("loginUUID", data);
                    flag = true;
                }
            })
            .catch((err) => {
                console.log(`에러메세지 : ${err}`);
                alert("로그인에 실패하였습니다.");
            });
        return flag;
    }

    return (
        <div>
            <ClickPrevent isLoading={isLoad} />
            <Loading loadStatus={isLoad} />
            <div className={"container text-center"} style={commonStyle}>
                <button onClick={test}>테스트 버튼</button>
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
                            <button style={loginBtn} onClick={() => {DataReceive().then((result) => {
                                setIsLoad(false);
                                if (result == true) {
                                    moveDestination();
                                }
                            })}} className={"nanumSquareR-font-normal border-0 mt-3"}>로그인</button>
                            <Link id={"link-hidden-user-login"} to={"/"}><button hidden={true}/></Link>
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
        </div>
    )
}


export default Login;