import React, {useState} from "react";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Form from "react-bootstrap/Form";


function NavigationBar() {

    const [textLine, setTextLine] = useState(1)
    const [userLine, setUserLine] = useState(1)


    return (
        <Navbar expand="lg">
            <div className={"container"} >
                <Navbar.Brand href="#">쇼핑 딜</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link href="#action1">컴퓨터</Nav.Link>
                        <Nav.Link href="#action2">데스크탑</Nav.Link>
                        <Nav.Link href="#action2">노트북</Nav.Link>
                        <Nav.Link href="#action2">Link</Nav.Link>


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
                            <a><li style={{listStyle: "none"}}
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
