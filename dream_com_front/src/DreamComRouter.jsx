import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import ChangePwPage from "./findId/ChangePwPage";
import Admin from "./admin/Admin";
import NewProduct from "./admin/NewProduct";
import ModifyProduct from "./admin/ModifyProduct";
import RemoveProduct from "./admin/RemoveProduct";

// 작성자 : MoonNight285
// 라우터 관리 컴포넌트
// url 주소는 임시값으로 나중에 다시 변경할것임
function DreamComRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"*"} element={<ErrorPageApp />}></Route>
                <Route path={"/"} element={<MainPageApp />}></Route>
                <Route path={`/search?`} element={<SearchPageApp />}></Route>
                <Route path={"/detail?"} element={<DetailApp />} />
                <Route path={"/error?"} element={<ErrorPageApp />} />
                <Route path={"/purchase?"} element={<PurchaseApp />}></Route>
                <Route path={"/sign"} element={<Clause />}></Route>
                <Route path={":informationName"} element={<SignInfomation />}></Route>
                <Route path={"/clearTitle/:titleNames"} element={<ProcessClear />}></Route>
                <Route path={"/login?"} element={<Login />}></Route>
                <Route path={"/findId"} element={<FindId />}></Route>
                <Route path={"/findPw"} element={<FindPw />}></Route>
                <Route path={"/changePw/:url"} element={<ChangePwPage />}></Route>
                <Route path={"/findPwSuccess"} element={<ChangePwPage />}></Route>
                <Route path={"/idchk"} element={<LoginChk />}></Route>
                <Route path={"/detail"} element={<DetailApp />} />
                <Route path={"/error"} element={<ErrorPageApp />} />
                <Route path={"/mypage/order"} element={<Mypage />}></Route>
                <Route path={"/mypage/cart"} element={<DreamComCart />}></Route>
                <Route path={"/mypage/wishList"} element={<DreamComWishList />}></Route>
                <Route path={"/admin/product/"} element={<Admin />}>
                    <Route path={"registration"} element={<NewProduct />}/>
                    <Route path={"modification"} element={<ModifyProduct />}/>
                    <Route path={"removal"} element={<RemoveProduct />}/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default DreamComRouter;