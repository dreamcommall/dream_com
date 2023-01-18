import React from "react";

// 작성자 : MoonNight285
// 챗봇을 호출하는 버튼의 스타일을 조정
const chatBotButtonStyle = {
    position : "fixed",
    top : 860,
    left : 1790,
    zIndex : 1000
}

// 작성자 : MoonNight285
// 챗봇을 호출하는 버튼을 그려주는 컴포넌트
function ChatBotButton() {
    return (
        <div style={chatBotButtonStyle}>
            <img src={"/images/information.png"} />
        </div>
    );
}

export default ChatBotButton;