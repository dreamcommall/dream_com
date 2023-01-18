import React, {useEffect, useRef, useState} from "react";

import upIcon from "../up.png"
import downIcon from "../down.png"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function Keyword() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);


    return (
        <div>


            {/*<button id={"dropdown-item-button"} onClick={() => {*/}
            {/*    setIsMenuOpen(!isMenuOpen);*/}

            {/*}} style={{marginTop: "14px", backgroundColor:"white", border:"none"}}>*/}


            {/*    <img style={{width: "20px", marginTop:"8px"}} src={isMenuOpen == false ? downIcon : upIcon}/>*/}
            {/*</button>*/}

<div className={"row"} style={{marginLeft:"-52px", marginTop:"20px"}}>
    <div className={"col-8"}>
    <input type={"text"} />
    </div>
    <div className={"col-1"} >
            <DropdownButton id="dropdown-basic-button" variant="white" style={{border:"none"}}>

                <Dropdown.Header>실시간 키워드</Dropdown.Header>
                <Dropdown.Item eventKey="1">컴퓨터</Dropdown.Item>
                <Dropdown.Item eventKey="2">LG 그램</Dropdown.Item>
                <Dropdown.Item eventKey="3">삼성 컴퓨터</Dropdown.Item>
                <Dropdown.Item eventKey="3">LG 컴퓨터</Dropdown.Item>
                <Dropdown.Item eventKey="3">노트북</Dropdown.Item>
                <Dropdown.Item eventKey="3">마우스</Dropdown.Item>
                <Dropdown.Item eventKey="3">모니터</Dropdown.Item>
                <Dropdown.Item eventKey="3">최신 모니터</Dropdown.Item>

            </DropdownButton>
    </div>
</div>

        </div>
    );
}

export default Keyword;
