import React from "react";
import {BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes} from "react-router-dom";
import MainPageApp from "./main/MainPageApp";
import SearchPageApp from "./search/SearchPageApp";
import PurchaseApp from "./purchase/PurchaseApp";
import DetailApp from "./detail/DetailApp";
import SignClear from "./common/SignUpClear";
import EmailTest from "./EmailTest";
import Clause from "./SignUp/Clause";
import LoginChk from "./LoginChk";
import Login from "./login/Login";
import FindId from "./findId/FindId";
import FindPw from "./findId/FindPw";
import ErrorPageApp from "./common/ErrorPage/ErrorPageApp";
import ModalFrameTest from "./reviewModal/ModalFrameTest";
import SignInfomation from "./common/SignInfomation";
import BuyProductList from "./mypage/BuyProductList";
import MypageCart from "./mypage/MypageCart";
import MypageWishList from "./mypage/MypageWishList";
import Mypage from "./mypage/Mypage";
import DreamComCart from "./mypage/DreamComCart";
import DreamComWishList from "./mypage/DreamComWishList";

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
                <Route path={"/purchase?"} element={<PurchaseApp loginId={"testUser1"} />}></Route>
                <Route path={"/sign"} element={<Clause />}></Route>
                <Route path={"/signinfomation"} element={<SignInfomation />}></Route>
                <Route path={"/signClear"} element={<SignClear />}></Route>
                <Route path={"/emailchk"} element={<EmailTest />}></Route>
                <Route path={"/login?"} element={<Login />}></Route>
                <Route path={"/findId"} element={<FindId />}></Route>
                <Route path={"/findPw"} element={<FindPw />}></Route>
                <Route path={"/idchk"} element={<LoginChk />}></Route>
                <Route path={"review"} element={<ModalFrameTest />}></Route>
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