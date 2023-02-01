import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPageApp from "./main/MainPageApp";
import SearchPageApp from "./search/SearchPageApp";
import PurchaseApp from "./purchase/PurchaseApp";
import DetailApp from "./detail/DetailApp";
import SignInfomation from "./common/SignInfomation";
import SignClear from "./common/SignUpClear";
import EmailTest from "./EmailTest";
import Clause from "./SignUp/Clause";

import Login from "./login/Login";
import FindId from "./findId/FindId";
import FindPw from "./findId/FindPw";
import ErrorPageApp from "./common/ErrorPage/ErrorPageApp";

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
                <Route path={"/error"} element={<ErrorPageApp />} />
                <Route path={"/purchase"} element={<PurchaseApp />}></Route>
                <Route path={"/sign"} element={<Clause />}></Route>
                <Route path={"/signinfomation"} element={<SignInfomation />}></Route>
                <Route path={"/signClear"} element={<SignClear />}></Route>
                <Route path={"/emailchk"} element={<EmailTest />}></Route>
                <Route path={"/main"} element={<MainPageApp />}></Route>
                <Route path={"/search"} element={<SearchPageApp />}></Route>
                <Route path={"/login"} element={<Login />}></Route>
                <Route path={"/findId"} element={<FindId />}></Route>
                <Route path={"/findPw"} element={<FindPw />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default DreamComRouter;