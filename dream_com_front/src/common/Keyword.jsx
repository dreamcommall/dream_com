import React, {useEffect, useRef, useState} from "react";


import arrowUp from "../images/header/arrow-up .png"
import arrowDown from "../images/header/arrow-down.png"

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

// useEffect(()=>{
//     document.getElementById("dropList")?.scrollTo(0,0);
// }, []);
//
// useEffect(()=>{
//     window.removeEventListener('scroll', Keyword);
// },[]);



function Keyword() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);




    const listSearch = [
        {id:1, itemName:"컴퓨터", image:arrowUp},
        {id:2, itemName:"노트북",image:arrowUp},
        {id:3, itemName:"컴퓨터",image:arrowUp},
        {id:4, itemName:"컴퓨터",image:arrowUp},
        {id:5, itemName:"컴퓨터",image:arrowUp},
        {id:6, itemName:"컴퓨터",image:arrowDown},
        {id:7, itemName:"컴퓨터",image:arrowUp},
        {id:8, itemName:"컴퓨터",image:arrowUp},
        {id:9, itemName:"컴퓨터",image:arrowDown},
        {id:10, itemName:"모니터",image:arrowUp}
    ]

 //    const [rank, setRank] = useState(listSearch)
 //    for( let i=0; i<listSearch.length; i++){
 // let timer = setInterval( () => { // function 생략하고 () => 화살표 함수 사용 (func 위치 틀림)
 //            if (listSearch.length < reservedNotifications.length) {
 //                const index = notifications.length;
 //
 //
 //
 //                // state의 상태 수정
 //                this.setState({
 //                    // this.state에 있는 notifications에 현재 componentDidMount안에 있는 지역 변수 notifications의 데이터를 저장
 //                    notifications: reservedNotifications, // notifications, reservedNotifications
 //                });
 //            } else {
 //                clearInterval(timer);
 //            }
 //        }, 1000); // setInterval( ... , time )
 //
 //    }





    return (
        <div>


            {/*<button id={"dropdown-item-button"} onClick={() => {*/}
            {/*    setIsMenuOpen(!isMenuOpen);*/}

            {/*}} style={{marginTop: "14px", backgroundColor:"white", border:"none"}}>*/}


            {/*    <img style={{width: "20px", marginTop:"8px"}} src={isMenuOpen == false ? downIcon : upIcon}/>*/}
            {/*</button>*/}

<div className={"row"} style={{marginRight:"130px", marginTop:"15px" }}>
    <div className={"col-8"} style={{marginTop:"10px"}}>
    <input type={"text"} style={{paddingRight:"10px", marginLeft:"15px"}} readOnly={true}/>
    </div>
    <div id={"dropList"} className={"col-2 "} style={{marginRight:"20px" , marginTop:"8px", zIndex:"5001"}} >
            <DropdownButton id="dropdown-basic-button" variant="white" style={{border:"none"}} title={"live"}>

                <Dropdown.Header><h6 style={{width : 300}}>실시간 키워드</h6></Dropdown.Header>
                {listSearch.map(item=> <Dropdown.Item key={item.id}> {item.id} : {item.itemName} <img src={item.image} style={{float:"right"}}/></Dropdown.Item>)}





            </DropdownButton>
    </div>
</div>

        </div>
    );
}

export default Keyword;
