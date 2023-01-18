import React from "react";
import "./ChatBotButton.css"

// 작성자 : MoonNight285
// 챗봇을 호출하는 버튼을 그려주는 컴포넌트
function ChatBotButton() {
    return (
        <div id={"div-chat-bot-button"}>
            <img src={"/images/information.png"} />
        </div>
    );
}

export default ChatBotButton;