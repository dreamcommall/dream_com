import React, {useEffect, useState} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../fonts/fontStyle.css";
import Form from "react-bootstrap/Form";
import "./NavigationBar.css";
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

function NavigationBar() {
    const [textLine, setTextLine] = useState(1);
    const [userLine, setUserLine] = useState(1);
    const [bestLine, setBestLine] = useState(1);
    const [specialLine, setSpecialLine] = useState(1);
    const [oneLine, setOneLine] = useState(1);
    const [zoneLine, setZoneLine] = useState(1);
    const [gLine, setGLine] = useState(1);
    const [loginUserId, setLoginUserId] = useState(null); // 로그인 한 유저의 아이디
    const pageUrl = useLocation();

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

    return (
        <Navbar className={"container py-1"} id={"nav"}>
            <div>

                <Navbar className={"container-fluid NavCss"} style={{marginLeft: "-8px"}}>
                    <Nav style={{maxHeight: '100px', marginLeft: "10%", position: "sticky"}}>
                        <a>
                            <li style={{listStyle: "none", width: "131%", marginRight: "20px"}}
                                onMouseOver={() => setBestLine(0)}
                                onMouseOut={() => setBestLine(1)}
                            >
                                <Nav.Link href="#action1"
                                          style={bestLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}
                                          className={"nanumSquareB-font-normal"}>베스트</Nav.Link>
                            </li>
                        </a>
                        <a>
                            <li style={{listStyle: "none", width: "131%", marginRight: "30px"}}
                                onMouseOver={() => setSpecialLine(0)}
                                onMouseOut={() => setSpecialLine(1)}
                            >
                                <Nav.Link href="#action1"
                                          style={specialLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}
                                          className={"nanumSquareB-font-normal"}>특가상품</Nav.Link>
                            </li>
                        </a>
                        <a>
                            <li style={{listStyle: "none", width: "131%", marginRight: "30px"}}
                                onMouseOver={() => setOneLine(0)}
                                onMouseOut={() => setOneLine(1)}
                            >
                                <Nav.Link href="#action1"
                                          style={oneLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}
                                          className={"nanumSquareB-font-normal"}>11번가</Nav.Link>
                            </li>
                        </a>
                        <a>
                            <li style={{listStyle: "none", width: "131%", marginRight: "30px"}}
                                onMouseOver={() => setZoneLine(0)}
                                onMouseOut={() => setZoneLine(1)}
                            >
                                <Nav.Link href="#action1"
                                          style={zoneLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}
                                          className={"nanumSquareB-font-normal"}>컴퓨존</Nav.Link>
                            </li>
                        </a>
                        <a>
                            <li style={{listStyle: "none", width: "131%", marginRight: "10px"}}
                                onMouseOver={() => setGLine(0)}
                                onMouseOut={() => setGLine(1)}
                            >
                                <Nav.Link href="#action1"
                                          style={gLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}
                                          className={"nanumSquareB-font-normal"}>지마켓</Nav.Link>
                            </li>
                        </a>
                    </Nav>
                    <Form className={"container-fluid"}>
                        <Nav style={{marginLeft: "69%"}}>
                            <a>
                                <li style={{height: "100%"}} className={"d-flex align-items-center me-2"}
                                    onMouseOver={() => setTextLine(0)}
                                    onMouseOut={() => setTextLine(1)}
                                >
                                    {
                                        loginUserId == null ? <Link to={`/login?prev=${pageUrl.pathname + pageUrl.search}`} style={textLine ? {textDecorationLine: "none", color: "gray"}
                                            : {textDecorationLine: "underline", color: "black"}} className={"nanumSquareB-font-normal"}>로그인</Link>
                                            : <Link onClick={logout} style={textLine ? {textDecorationLine: "none", color: "gray"}
                                                : {textDecorationLine: "underline", color: "black"}} className={"nanumSquareB-font-normal"}>로그아웃</Link>
                                    }
                                </li>
                            </a>
                            <a>
                                <li
                                    onMouseOver={() => setUserLine(0)}
                                    onMouseOut={() => setUserLine(1)}
                                >
                                    {
                                        loginUserId == null ? <Link to={"/sign"} style={userLine ? {textDecorationLine: "none", color: "gray"}
                                            : {textDecorationLine: "underline", color: "black"}} className={"nanumSquareB-font-normal"}>회원가입</Link>
                                            : <span id={"span-header-welcome"} className={"nanumSquareB-font-normal"}>{loginUserId}님 환영합니다!</span>
                                    }
                                </li>
                            </a>
                        </Nav>
                    </Form>
                </Navbar>
            </div>
            {/*에러 발생시 에러 페이지 테스트 용도 코드입니다.*/}
            {/*<Link to={`/error?errorNumber=${{test1 : "hello", test2 : "world!"}}&errorMsg=${"test 메세지"}`}>*/}
            {/*    <button id={"button-header-error-page"} onClick={moveErrorPage} hidden={true}/>*/}
            {/*</Link>*/}
        </Navbar>
    );
}

export default NavigationBar;
