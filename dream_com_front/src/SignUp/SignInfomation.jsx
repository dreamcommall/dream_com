import React from "react";
import "./SignInfomation.css";
import "../fonts/fontStyle.css";
import DaumPostcodeEmbed from 'react-daum-postcode';





function SignInfomation() {
    return (

        <div className={"container"} id={"div-information"}>
            <div className={"div-userMain"}>
                <p className={"nanumSquareB-font-normal"} style={{fontSize:"25px"}}>정보 입력</p>
            </div>
            <div className={"div-userList"}>
                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>아이디</p>
                    </div>
                    <div className={"col-8"}>
                        <input type={"text"}/>
                        <button  id={"userBtn"} className={"nanumSquareR-font-normal"}>중복 체크</button>
                    </div>
                </div>

                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>비밀 번호</p>
                    </div>
                    <div className={"col-8"}>
                        <input type={"password"}/>

                    </div>
                </div>


                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>비밀 번호 확인</p>
                    </div>
                    <div className={"col-8"}>
                        <input type={"password"}/>

                    </div>
                </div>


                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>성 별</p>
                    </div>
                    <div className={"col-8"}>
                        <input type={"checkbox"}/> 남성
                        <input style={{marginLeft:"10px"}} type={"checkbox"}/> 여성
                    </div>
                </div>



                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>휴대 전화</p>
                    </div>
                    <div className={"col-8"}>
                        <input type={"text"}/>
                    </div>
                </div>


                <div className={"div-userAddClass"}  >
                    <div className={"col-1"}></div>
                    <div className={"col-2"} >
                        <p className={"nanumSquareR-font-normal"}>이메일</p>
                    </div>
                    <div className={"col-8"} >
                        <div id={"div-userAdd" }>
                        <div>
                        <input type={"text"} />
                        <button id={"userBtn"} className={"nanumSquareR-font-normal"}>이메일 전송</button>
                        </div>
                        <div style={{marginTop:"10px"}}>
                        <input type={"text"}/>
                        <button id={"userBtn"} className={"nanumSquareR-font-normal"}>인증 확인</button>
                        </div>
                        </div>
                    </div>
                </div>




                <div className={"div-userId"}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"}>
                        <p className={"nanumSquareR-font-normal"}>우편 번호</p>
                    </div>
                    <div className={"col-8"}>
                        <input type={"text"} id={"postCode"}/>
                        <button id={"userBtn"} className={"nanumSquareR-font-normal"}>우편번호검색</button>
                    </div>
                </div>



                <div className={"div-userAddClass"} style={{borderBottom:"none"}}>
                    <div className={"col-1"}></div>
                    <div className={"col-2"} >
                        <p className={"nanumSquareR-font-normal"}>주소</p>
                    </div>
                    <div className={"col-8"}>
                        <div id={"div-userAdd"}>
                            <div>
                                <input type={"text"} id={"address"} placeholder={"주소"} style={{paddingRight:"15%"}}/>
                            </div>
                           <div style={{marginTop:"10px"}}>
                               <input type={"text"} id={"detailAddress"} placeholder={"상세주소"} style={{paddingRight:"15%"}}/>
                           </div>
                        </div>



                    </div>
                </div>



                <div className={"div-userId"} style={{ borderBottom:"none"}}>
                    <div className={"col-10"}></div>

                    <div className={"col-2"} >
                        <button id={"clearBtn"} className={"nanumSquareR-font-normal"}>가입 완료</button>
                    </div>
                </div>





            </div>


        </div>


    );
}

export default SignInfomation;