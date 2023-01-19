import React, {useState} from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Form from "react-bootstrap/Form";


function NavigationBar() {

    const [textLine, setTextLine] = useState(1)
    const [userLine, setUserLine] = useState(1)
    const [bestLine, setBestLine] = useState(1)
    const [specialLine, setSpecialLine] = useState(1)
    const [oneLine, setOneLine] = useState(1)
    const [zoneLine, setZoneLine] = useState(1)
    const [gLine, setGLine] = useState(1)



    return (
        <Navbar expand="lg">
            <div className={"container"} style={{marginLeft:"175px"}} >

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <a><li style={{listStyle: "none"}}
                               onMouseOver={() => setBestLine(0)}
                               onMouseOut={() => setBestLine(1)}
                        >
                            <Nav.Link href="#action1" style={bestLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}>베스트</Nav.Link>

                        </li>
                        </a>
                        <a><li style={{listStyle: "none"}}
                               onMouseOver={() => setSpecialLine(0)}
                               onMouseOut={() => setSpecialLine(1)}
                        >
                            <Nav.Link href="#action1" style={specialLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}>특가상품</Nav.Link>

                        </li>
                        </a>
                        <a><li style={{listStyle: "none"}}
                               onMouseOver={() => setOneLine(0)}
                               onMouseOut={() => setOneLine(1)}
                        >
                            <Nav.Link href="#action1" style={oneLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}>11번가</Nav.Link>

                        </li>
                        </a>
                        <a><li style={{listStyle: "none"}}
                               onMouseOver={() => setZoneLine(0)}
                               onMouseOut={() => setZoneLine(1)}
                        >
                            <Nav.Link href="#action1" style={zoneLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}>컴퓨존</Nav.Link>

                        </li>
                        </a>
                        <a><li style={{listStyle: "none"}}
                               onMouseOver={() => setGLine(0)}
                               onMouseOut={() => setGLine(1)}
                        >
                            <Nav.Link href="#action1" style={gLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}>지마켓</Nav.Link>

                        </li>
                        </a>



                    </Nav>
                    <Form className="d-flex">

                        <Nav className="me-auto my-2 my-auto" style={{ maxHeight: '100px'}} navbarScroll>

                            <a><li style={{listStyle: "none"}}
                                   onMouseOver={() => setTextLine(0)}
                                   onMouseOut={() => setTextLine(1)}
                            >
                                <Nav.Link href="#action1" style={textLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}>로그인</Nav.Link>

                            </li>
                            </a>
                            <a><li style={{listStyle: "none" ,marginRight:"-250px"}}
                                   onMouseOver={() => setUserLine(0)}
                                   onMouseOut={() => setUserLine(1)}
                            >
                                <Nav.Link href="#action2" style={userLine ? {textDecorationLine: "none"} : {textDecorationLine: "underline"}}>회원가입</Nav.Link>

                            </li>
                            </a>




                        </Nav>
                    </Form>


                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavigationBar;
