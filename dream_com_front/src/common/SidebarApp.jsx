import React from "react";
import HistoryBox from "./HistoryBox";
import ToTopButton from "./ToTopButton";
import ChatBotButton from "./ChatBotButton";

// 작성자 : MoonNight285
// 히스토리 박스(테스트 용도)
const historyItemList = [
    {key : 0, src : "/images/MainRollingBanner_139003.jpg"},
    {key : 1, src : "/images/MainRollingBanner_139003.jpg"},
    {key : 2, src : "/images/MainRollingBanner_139003.jpg"},
    {key : 3, src : "/images/MainRollingBanner_139003.jpg"}
]

// 작성자 : MoonNight285
// 화면마다 들어갈 공통적인 부분을 그려주는 컴포넌트
function SidebarApp() {
    return (
        <div>
            <HistoryBox itemList={historyItemList}/>
            <ToTopButton />
            <ChatBotButton />
        </div>
    );
}

export default SidebarApp;