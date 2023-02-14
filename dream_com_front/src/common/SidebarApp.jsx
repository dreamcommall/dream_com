import React from "react";
import HistoryBox from "./HistoryBox";
import ToTopButton from "./ToTopButton";
import ChatBotButton from "./ChatBotButton";

// 작성자 : MoonNight285
// 화면마다 들어갈 공통적인 부분을 그려주는 컴포넌트
function SidebarApp() {
    return (
        <div>
            <HistoryBox />
            <ToTopButton />
            <ChatBotButton />
        </div>
    );
}

export default SidebarApp;