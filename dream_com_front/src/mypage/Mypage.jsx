import React from "react";
// import "./Mypage.css"

const imgSize = {
    width: "150px",
    height: "150px",
    border: "1px solid #e5e5e5"
}


function Mypage(){

    return(
        <div className={"container myPage"}>
            <div className={"row"}>
                <div className={"col"}>
                    <div id={"line"}></div>
                    <span className={"nanumSquareR-font-normal"} id={"buyDate"}>today</span>
                    <ul>
                        <li id={"productInfo"}>
                            <div className={"mt-4"} id={"thumbnail"}>
                                <a href={"#"}>
                                    <img src={"images/logo192.png"} style={imgSize} />
                                </a>
                            </div>
                            <div className={"ms-5 mt-4"}>
                                <a className={"nanumSquareR-font-large productTitle"} href={"#"}>productTitle</a>
                                <div className={"mt-2 nanumSquareR-font-normal"} >
                                    <strong>1,000,000 원 </strong><span id={"date"}> | 2023.01.27</span>
                                </div>
                                <div id={"state"} className={"nanumSquareR-font-normal"}>배송중</div>
                            </div>
                            <div id={"button"} className={"mt-1"}>
                                <button>리뷰쓰기</button><br />
                                <button className={"mt-2"}>배송조회</button><br />
                                <button className={"mt-2"}>장바구니 담기</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Mypage;