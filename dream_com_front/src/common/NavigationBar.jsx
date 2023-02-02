import React, {useEffect, useState} from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../fonts/fontStyle.css";
import Form from "react-bootstrap/Form";
import "./NavigationBar.css";
import {Link} from "react-router-dom";
import axios from "axios";



function NavigationBar() {
    const [textLine, setTextLine] = useState(1);
    const [userLine, setUserLine] = useState(1);
    const [bestLine, setBestLine] = useState(1);
    const [specialLine, setSpecialLine] = useState(1);
    const [oneLine, setOneLine] = useState(1);
    const [zoneLine, setZoneLine] = useState(1);
    const [gLine, setGLine] = useState(1);
    
    useEffect(() => {
        axios.get("http://localhost:8080/loginChk")
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(`에러메세지 : ${err}`);
                console.log("로그인한 유저 정보를 취득하는데 실패했습니다.");
            });
    }, []);
    
    return (
        <Navbar className={"container py-1"} id={"nav"} >
            <div >

                <Navbar className={"container-fluid NavCss" } style={{marginLeft:"-8px"}}>
                    <Nav style={{maxHeight: '100px', marginLeft:"10%",position:"sticky"}}>
                        <a>
                            <li style={{listStyle: "none",width:"131%",marginRight:"20px" }}
                                onMouseOver={() => setBestLine(0)}
                                onMouseOut={() => setBestLine(1)}
                            >
                                <Nav.Link href="#action1"
                                          style={bestLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}} className={"nanumSquareB-font-normal"} >베스트</Nav.Link>
                            </li>
                        </a>
                        <a>
                            <li style={{listStyle: "none",width:"131%",marginRight:"30px"}}
                                onMouseOver={() => setSpecialLine(0)}
                                onMouseOut={() => setSpecialLine(1)}
                            >
                                <Nav.Link href="#action1"
                                          style={specialLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}} className={"nanumSquareB-font-normal"}>특가상품</Nav.Link>
                            </li>
                        </a>
                        <a>
                            <li style={{listStyle: "none",width:"131%",marginRight:"30px"}}
                                onMouseOver={() => setOneLine(0)}
                                onMouseOut={() => setOneLine(1)}
                            >
                                <Nav.Link href="#action1"
                                          style={oneLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}} className={"nanumSquareB-font-normal"}>11번가</Nav.Link>
                            </li>
                        </a>
                        <a>
                            <li style={{listStyle: "none",width:"131%",marginRight:"30px"}}
                                onMouseOver={() => setZoneLine(0)}
                                onMouseOut={() => setZoneLine(1)}
                            >
                                <Nav.Link href="#action1"
                                          style={zoneLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}} className={"nanumSquareB-font-normal"}>컴퓨존</Nav.Link>
                            </li>
                        </a>
                        <a>
                            <li style={{listStyle: "none",width:"131%",marginRight:"10px"}}
                                onMouseOver={() => setGLine(0)}
                                onMouseOut={() => setGLine(1)}
                            >
                                <Nav.Link href="#action1"
                                          style={gLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}} className={"nanumSquareB-font-normal"}>지마켓</Nav.Link>
                            </li>
                        </a>
                    </Nav>


                    <Form className={"container-fluid"}>
                        <Nav style={{marginLeft:"69%"}}>
                            <a>
                                <li style={{height : "100%"}} className={"d-flex align-items-center me-2"}
                                    onMouseOver={() => setTextLine(0)}
                                    onMouseOut={() => setTextLine(1)}
                                >
                                    <Link to={"/login"} style={textLine ? {textDecorationLine: "none", color : "gray"}
                                        : {textDecorationLine: "underline", color : "black"}} className={"nanumSquareB-font-normal"}>로그인</Link>
                                </li>
                            </a>
                            <a>
                                <li
                                    onMouseOver={() => setUserLine(0)}
                                    onMouseOut={() => setUserLine(1)}
                                >
                                    <Link to={"/sign"} style={userLine ? {textDecorationLine: "none", color : "gray"}
                                        : {textDecorationLine: "underline", color : "black"}} className={"nanumSquareB-font-normal"}>회원가입</Link>
                                </li>
                            </a>
                        </Nav>
                    </Form>
                </Navbar>
            </div>
        </Navbar>
    );
}

export default NavigationBar;
