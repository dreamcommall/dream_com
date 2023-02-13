import React, {useEffect, useState} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../fonts/fontStyle.css";
import Form from "react-bootstrap/Form";
import "./NavigationBar.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import axios from "axios";

function NavigationBar() {
    const [textLine, setTextLine] = useState(1);
    const [userLine, setUserLine] = useState(1);
    const [oneLine, setOneLine] = useState(1);
    const [zoneLine, setZoneLine] = useState(1);
    const [gLine, setGLine] = useState(1);
    const [loginUserId, setLoginUserId] = useState(null); // 로그인 한 유저의 아이디
    const pageUrl = useLocation();
    const navigate = useNavigate(); // 페이지 이동

    // 서버에게 현재 로그인한 유저를 요청합니다.
    // 없는경우 null이 반환됩니다.
    useEffect(() => {
        axios.post("http://localhost:8080/loginUserId", null, {params : {
            userUUID : sessionStorage.getItem("loginUUID"),
            autoUserUUID : localStorage.getItem("autoLoginUUID")
        }}).then(response => {
            if (response.data == null || response.data == undefined || response.data == "") {
                setLoginUserId(null);
            } else {
                setLoginUserId(response.data);
            }
        }).catch(err => {
            console.log(`에러메세지 : ${err}`);
            console.log("유저 아이디 취득에 실패했습니다.");
        });
    }, []);
    
    // 로그인 세션 체크 타이머 설정
    useEffect(() => {
        clearTimeout(Number.parseInt(sessionStorage.getItem("loginSessionCheckTimer")));
        sessionStorage.removeItem("loginSessionCheckTimer");
        let loginSessionCheckTimer = setTimeout(() => {
            window.location.reload();
        }, 600000);
        sessionStorage.setItem("loginSessionCheckTimer", loginSessionCheckTimer.toString());
    }, []);

    // 로그아웃 후 정상적으로 로그아웃이 진행되었다면 세션,로컬 스토리지에 있는 UUID를 제거한다.
    const logout = () => {
        axios.post("http://localhost:8080/logout", null, {params : {
            userUUID : sessionStorage.getItem("loginUUID"),
            autoUserUUID : localStorage.getItem("autoLoginUUID")
            }}).then(response => {
            if (response.data == "fail") { // 로그아웃 실패시 에러 페이지로 이동
                moveErrorPage();
            } else { // 로그아웃 성공시 로그아웃 완료 페이지로 이동
                sessionStorage.removeItem("loginUUID");
                localStorage.removeItem("autoLoginUUID");
                setLoginUserId(null);
                moveLogoutPage();
            }
        }).catch(err => {
            console.log(`에러메세지 : ${err}`);
            console.log("로그아웃에 실패했습니다.");
        });
    }

    // 로그아웃 실패시 에러 페이지로 이동
    const moveErrorPage = () => {
        const button = document.querySelector("#button-header-error-page");
        button.click();
    }
    
    // 로그아웃 성공시 로그아웃 완료 페이지로 이동
    const moveLogoutPage = () => {
        navigate("/clearTitle/logOutClear");
    }
    
    // 외부 페이지 창 띄우기
    const openOutsidePage = (pageName) => {
        switch (pageName) {
            case "11번가" :
                window.open("https://www.11st.co.kr/");
                break;
            case "컴퓨존" :
                window.open("https://www.compuzone.co.kr/main/main.htm");
                break;
            case "지마켓" :
                window.open("https://www.gmarket.co.kr/");
                break;
        }
    }

    return (
        <Navbar className={"container py-1"} id={"nav"}>
            <div>

                <Navbar className={"container-fluid NavCss"} style={{marginLeft: "-8px"}}>
                    <Nav style={{maxHeight: '100px', marginLeft: "10%", position: "sticky"}}>
                        <a>
                            <li style={{listStyle: "none", width: "131%", marginRight: "45px", marginLeft : "70px", marginTop : "5px", marginBottom : "5px"}}
                                onMouseOver={() => setOneLine(0)} onMouseOut={() => setOneLine(1)}>
                                <span style={oneLine ? {textDecorationLine: "none", color: "gray"} : {textDecorationLine: "underline", color: "black"}}
                                      className={"nanumSquareB-font-normal span-header-move-out-link"} onClick={() => {openOutsidePage("11번가")}}>11번가</span>
                            </li>
                        </a>
                        <a>
                            <li style={{listStyle: "none", width: "131%", marginRight: "35px", marginTop : "5px"}}
                                onMouseOver={() => setZoneLine(0)} onMouseOut={() => setZoneLine(1)}>
                                <span style={zoneLine ? {textDecorationLine: "none", color: "gray"} : {textDecorationLine: "underline", color: "black"}}
                                      className={"nanumSquareB-font-normal span-header-move-out-link"} onClick={() => {openOutsidePage("컴퓨존")}}>컴퓨존</span>
                            </li>
                        </a>
                        <a>
                            <li style={{listStyle: "none", width: "131%", marginRight: "10px", marginTop : "5px"}}
                                onMouseOver={() => setGLine(0)} onMouseOut={() => setGLine(1)}>
                                <span style={gLine ? {textDecorationLine: "none", color: "gray"} : {textDecorationLine: "underline", color: "black"}}
                                      className={"nanumSquareB-font-normal span-header-move-out-link"} onClick={() => {openOutsidePage("지마켓")}}>지마켓</span>
                            </li>
                        </a>
                    </Nav>
                    <Form className={"container-fluid"}>
                        <Nav style={{marginLeft: "71%"}}>
                            <li style={{height: "100%"}} className={"d-flex align-items-center me-2"}
                                onMouseOver={() => setTextLine(0)} onMouseOut={() => setTextLine(1)}>
                                {
                                    loginUserId == null ? <Link to={`/login?prev=${pageUrl.pathname + pageUrl.search}`} style={textLine ? {textDecorationLine: "none", color: "gray"}
                                            : {textDecorationLine: "underline", color: "black"}} className={"nanumSquareB-font-normal"}>로그인</Link>
                                        : <Link onClick={logout} style={textLine ? {textDecorationLine: "none", color: "gray"}
                                            : {textDecorationLine: "underline", color: "black"}} className={"nanumSquareB-font-normal"}>로그아웃</Link>
                                }
                            </li>
                            <li
                                onMouseOver={() => setUserLine(0)} onMouseOut={() => setUserLine(1)}>
                                {
                                    loginUserId == null ? <Link to={"/clause"} style={userLine ? {textDecorationLine: "none", color: "gray"}
                                            : {textDecorationLine: "underline", color: "black"}} className={"nanumSquareB-font-normal"}>회원가입</Link>
                                        : <span id={"span-header-welcome"} className={"nanumSquareB-font-normal"}>{loginUserId}님 환영합니다!</span>
                                }
                            </li>
                        </Nav>
                    </Form>
                </Navbar>
            </div>
        </Navbar>
    );
}

export default NavigationBar;
