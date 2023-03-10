import React, {useEffect, useState} from "react";
import axios from "axios";
import "../fonts/fontStyle.css"
import "./Login.css"
import {Link, useLocation, useNavigate} from "react-router-dom";
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
    const [isAutoLogin, setIsAutoLogin] = useState(false); // 자동 로그인
    const [prevUrl, setPrevUrl] = useState(""); // 이전 경로
    const useLocationPrevUrl = useLocation();
    const navigate = useNavigate();

    // 로그인 성공후 이전 링크로 이동한다.
    // 만약 관리자라면 관리자 페이지로 이동한다.
    const moveDestination = (authorization) => {
        if (authorization == "A") {
            navigate("/admin/product");
        } else {
            navigate(prevUrl);
        }
    }

    const handleInputId = (e) => {
        setUserId(e.target.value);
    }

    const handleInputPw = (e) => {
        setUserPw(e.target.value)
    }

    const enterKey = (e) => {
        if(e.key === 'Enter'){
            document.getElementById("loginBtn").click();
        }
    }

    // 로그인 처리 프로세스
    // 로그인 후 성공하면 저장된 UUID를 이용해서 서버에게 유저 아이디를 내려받는다.
    // 최종적으로 로그인 이전 페이지로 이동한다.
    const DataReceive = () => {
        setIsLoad(true);
        LoginChk().then(result => {
            if (result == true) {
                getUserId().then(getResult => {
                    setIsLoad(false);
                    if (getResult == true) {
                        getAuthorization();
                    }
                }).catch(err => {
                    setIsLoad(false);
                })
            } else {
                setIsLoad(false);
            }
        }).catch(err => {
            setIsLoad(false);
        })
    }

    // 로그인 진행
    const LoginChk = async () => {
        let flag = false;
        await axios.post('http://localhost:8080/loginChk',null,{
            params:{
                userId:userId,
                userPw:userPw,
                isAutoLogin : isAutoLogin
            }})
            .then((req) => {
                const {data} = req;
                if(data == 0){
                    alert(`아이디 & 비밀번호를 확인해주세요.`);
                }
                else {
                    if (isAutoLogin == false) { // 자동 로그인을 사용하지 않았다면
                        sessionStorage.setItem("loginUUID", data);
                        localStorage.removeItem("autoLoginUUID");
                    } else { // 자동 로그인을 사용했다면
                        localStorage.setItem("autoLoginUUID", data);
                        sessionStorage.removeItem("loginUUID");
                    }
                    flag = true;
                }
            })
            .catch((err) => {
                console.log(`에러메세지 : ${err}`);
                alert("로그인에 실패하였습니다.");
            });
        return flag;
    }

    // 로그인 후 유저아이디 취득
    const getUserId = async () => {
        let flag = false;
        await axios.post("http://localhost:8080/loginUserId", null,
            {params : {userUUID : sessionStorage.getItem("loginUUID"),
                    autoUserUUID : localStorage.getItem("autoLoginUUID")}})
            .then(response => {
                alert(`${response.data}님 반갑습니다.`);
                flag = true;
            })
            .catch(err => {
                console.log(`에러메세지 : ${err}`);
                console.log("로그인 한 유저정보 취득에 실패했습니다.");
                flag = false;
            });
        return flag;
    }
    
    // 로그인 후 유저의 권한을 얻어오고 만약 관리자라면 관리자 페이지로 이동시킨다.
    const getAuthorization = () => {
        axios.get("http://localhost:8080/user/authorization", {params : {userUUID : sessionStorage.getItem("loginUUID"),
                autoUserUUID : localStorage.getItem("autoLoginUUID")}})
            .then(response => {
                moveDestination(response.data);
            })
            .catch(err => {
                console.log(`에러메세지 : ${err}`);
                console.log("로그인 한 유저의 권한 취득에 실패했습니다.");
            });
    }
    
    // 이전 페이지 경로 가져오기
    useEffect(() => {
        let url = useLocationPrevUrl.search.split("prev=")[1];
        if (url == undefined) {  // 만약 이전 페이지 값이 없는경우 메인 페이지로 이동
            url = "/";
        }
        setPrevUrl(url);
    }, []);


    return (
        <div>
            <ClickPrevent isLoading={isLoad} />
            <Loading loadStatus={isLoad} />
            <div className={"container text-center"} style={commonStyle}>
                <form>
                    <div className={"row"}>
                        <div className={"col-4"}>
                        </div>
                        <div className={"col-4"}>
                            <div>
                                <Link to={"/"}><img src={"/images/mainLogo2.png"} style={imgSize}></img></Link>
                            </div>
                            <div>
                                <input placeholder={"아이디"} value={userId} onChange={handleInputId} type={"text"}
                                       className={"border-1 border-bottom-0 nanumSquareR-font-small"} style={inputSize} onKeyDown={(e)=>{enterKey(e)}}/>
                            </div>
                            <div>
                                <input placeholder={"비밀번호는 8~2  0자"} value={userPw} onChange={handleInputPw} type={"password"}
                                       autoComplete={"off"} style={inputSize} onKeyDown={enterKey} />
                            </div>
                            {/* 아이디 비밀번호 확인 글자 들어갈부분 후보 2*/}
                            <div>
                                <button id={"loginBtn"} type={"button"} style={loginBtn} onClick={DataReceive} className={"nanumSquareR-font-normal border-0 mt-3"}>로그인</button>
                            </div>
                            <div>
                                {/* 아이디 비밀번호 확인 글자 들어갈부분 후보 1*/}
                                <div className={"d-flex justify-content-between mb-5"}>
                                    <div>
                                        <input className={"form-check-input ms-1 me-1"} style={{marginTop:"5px"}}
                                                checked={isAutoLogin} onChange={() => {setIsAutoLogin(!isAutoLogin)}} type={"checkbox"} />
                                        <label onClick={() => {setIsAutoLogin(!isAutoLogin)}} className={"ms-1 nanumSquareR-font-small"} style={fontSize}>자동로그인</label>
                                    </div>
                                    <div>
                                        <Link to={"/findId"} className={"text-decoration-none text-dark nanumSquareR-font-small"} style={fontSize}>아이디 찾기</Link>
                                        <span className={"ms-2"}>|</span>
                                        <Link to={"/findPw"} className={"text-decoration-none ms-2 text-dark nanumSquareR-font-small"} style={fontSize}>비밀번호 찾기</Link>
                                    </div>
                                </div>
                                <div className={"mt-2"}>
                                    <Link to={"/clause"} className={"text-decoration-none text-dark nanumSquareR-font-Normal"}><b>회원가입</b> ></Link>
                                </div>
                                <p className={"nanumSquareR-font-small"} style={loginFooter}>
                                    Copyright © 2023 <b>DreamComputer</b> Co.,Ltd. All Rights Reserved.</p>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}


export default Login;