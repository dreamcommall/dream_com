import React from "react";
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import MainPageApp from "./main/MainPageApp";
import SearchPageApp from "./search/SearchPageApp";
import PurchaseApp from "./purchase/PurchaseApp";
import DetailApp from "./detail/DetailApp";
import SignInfomation from "./common/SignInfomation";
import EmailTest from "./EmailTest";
import Clause from "./SignUp/Clause";
import LoginChk from "./LoginChk";
import Login from "./login/Login";
import FindId from "./findId/FindId";
import FindPw from "./findId/FindPw";
import ErrorPageApp from "./common/ErrorPage/ErrorPageApp";
import ModalFrameTest from "./reviewModal/ModalFrameTest";
import ProcessClear from "./common/ProcessClear";
import Mypage from "./mypage/Mypage";
import DreamComCart from "./mypage/DreamComCart";
import DreamComWishList from "./mypage/DreamComWishList";
import FindIdSuccess from "./findId/FindIdSuccess";

// 작성자 : MoonNight285
// 라우터 관리 컴포넌트
// url 주소는 임시값으로 나중에 다시 변경할것임
function DreamComRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<MainPageApp />}></Route>
                <Route path={`/search?`} element={<SearchPageApp />}></Route>
                <Route path={"/detail?"} element={<DetailApp />} />
                <Route path={"/error?"} element={<ErrorPageApp />} />
                {/*purchaseApp 컴포넌트에 상세페이지에서 구매버튼 누른 제품 정보 / 로그인 된 아이디 전송*/}
                {/*url : ?productNum= ~ & quantity= ~ */}
                <Route path={"/purchase?"} element={<PurchaseApp />}></Route>
                <Route path={"/sign"} element={<Clause />}></Route>
                <Route path={"/signinfomation"} element={<SignInfomation />}></Route>
                <Route path={"/clearTitle/:titleNames"} element={<ProcessClear />}></Route>
                <Route path={"/emailchk"} element={<EmailTest />}></Route>
                <Route path={"/login?"} element={<Login />}></Route>
                <Route path={"/findId"} element={<FindId />}></Route>
                <Route path={"/findPw"} element={<FindPw />}></Route>
                <Route path={"/idchk"} element={<LoginChk />}></Route>
                {/* 리뷰 작성 모달 적용 방법*/}
                {/*모달 사용 할 페이지에 적용*/}
                {/*-----------------------*/}
                {/* const [modalIsOpen, setModalIsOpen] = useState(false);

                    const modalOpen = () => {
                        setModalIsOpen(true);
                    }

                    return (
                    ... 기타 내용
                    <button onClick={modalOpen}>모달 버튼</button>
                    {modalIsOpen && (
                        <ModalFrame setModalIsOpen={setModalIsOpen}>
                            <ReviewModalApp setModalIsOpen={setModalIsOpen} productNum={productNum} userId={userId} />
                        </ModalFrame>
                    )}
                    ... 기타 내용
                    )
                */}
                {/*------------------------*/}
                {/* 모달 연결 후 아래 Route 의 ModalFrameTest 부분 삭제 + 해당 주석 삭제 필요 */}
                <Route path={"review"} element={<ModalFrameTest />}></Route>
                <Route path={"findIdSuccess"} element={<FindIdSuccess />}></Route>
                <Route path={"*"} element={<ErrorPageApp />}></Route>
                <Route path={"/detail"} element={<DetailApp />} />
                <Route path={"/error"} element={<ErrorPageApp />} />
                <Route path={"/purchase"} element={<PurchaseApp />}></Route>
                <Route path={"/mypageOrder"} element={<Mypage />}></Route>
                <Route path={"/mypageCart"} element={<DreamComCart />}></Route>
                <Route path={"/myPageWishList"} element={<DreamComWishList />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default DreamComRouter;