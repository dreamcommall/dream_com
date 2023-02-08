import React from "react";
import ClickPrevent from "../common/ClickPrevent";
import Loading from "../common/Loading";

function FindIdSuccess({userIdList, isLoad}) {
    return (
        <div className={"container-fluid mt-5"}>
            <ClickPrevent isLoading={isLoad} />
            <Loading loadStatus={isLoad}/>
            <div className={"container mt-4 nanumSquareR-font-normal"}>
                <div id={"findIdSuccessBody"}>
                    <div className={"nanumSquareB-font-large mb-3"}>
                        <span id={"findIdSuccessTitle"}>아이디찾기</span>
                    </div>
                    <p>회원님이 가입하신 아이디 목록 입니다</p>
                    <div id={"findIdSuccessMain"}>
                        {userIdList.map(item => {
                            return (
                                <div className={"text-center"} key={item.userSignDate}>
                                    <div className={"row mb-2"}>
                                        <div className={"col-4"}>{item.userId}</div>
                                        <div className={"col-8"}>가입날짜 : {item.userSignDate.slice(0, 10)}</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className={"row text-center nanumSquareR-font-large"} id={"FindIdToPageButtons"}>
                        <div className={"col-6"}>
                            <button id={"FindIdToLogin"}>로그인</button>
                        </div>
                        <div className={"col-6"}>
                            <button id={"FindIdToFindPw"}>비밀번호 찾기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FindIdSuccess;