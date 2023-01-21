import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import MainPageApp from "./main/MainPageApp";
import SearchPageApp from "./search/SearchPageApp";
import DetailApp from "./detail/DetailApp";

// 작성자 : MoonNight285
// 라우터 관리 컴포넌트
// url 주소는 임시값으로 나중에 다시 변경할것임
function DreamComRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path={"/main"} element={<MainPageApp />}></Route>
                <Route path={"/search"} element={<SearchPageApp />}></Route>
                <Route path={"/detail"} element={<DetailApp />} />
            </Routes>
        </BrowserRouter>
    )
}

export default DreamComRouter;