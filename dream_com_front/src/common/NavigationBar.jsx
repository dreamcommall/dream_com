import React, {useState} from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import "../fonts/fontStyle.css";
import Form from "react-bootstrap/Form";
import "./NavigationBar.css";



function NavigationBar() {

    const [textLine, setTextLine] = useState(1)
    const [userLine, setUserLine] = useState(1)
    const [bestLine, setBestLine] = useState(1)
    const [specialLine, setSpecialLine] = useState(1)
    const [oneLine, setOneLine] = useState(1)
    const [zoneLine, setZoneLine] = useState(1)
    const [gLine, setGLine] = useState(1)



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
                                <li
                                    onMouseOver={() => setTextLine(0)}
                                    onMouseOut={() => setTextLine(1)}
                                >
                                    <Nav.Link to="#action1"
                                              style={textLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}} className={"nanumSquareB-font-normal"}>로그인</Nav.Link>
                                </li>
                            </a>
                            <a>
                                <li
                                    onMouseOver={() => setUserLine(0)}
                                    onMouseOut={() => setUserLine(1)}
                                >
                                    <Nav.Link href="/SignUp"
                                              style={userLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}} className={"nanumSquareB-font-normal"}>회원가입</Nav.Link>
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
