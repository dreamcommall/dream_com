import React from "react";
import "../fonts/fontStyle.css"

// 작성자 : MoonNight285
// 화면의 최상단으로 올라가는 버튼의 스타일
const toTopButtonStyle = {
    width : 90,
    height : 50,
    backgroundColor : "#FFD8D8",
    color : "black",
    borderRadius : "10%",
    position : "fixed",
    top : 800,
    left : 1780
}

// 작성자 : MoonNight285
// 화면의 최상단으로 올라가는 버튼을 그려주는 컴포넌트
function ToTopButton() {
    return (
        <div style={toTopButtonStyle}>
            <div style={{height : "100%"}} className={"d-flex justify-content-center align-items-center"}>
                <p className={"mt-3 nanumSquareB-font-XNormal"}>TOP</p>
            </div>
        </div>
    );
}

export default ToTopButton;