import React from "react";
import "../fonts/fontStyle.css"
import "./commonCss/ToTopButton.css"

// 작성자 : MoonNight285
// 화면의 최상단으로 올라가는 버튼을 그려주는 컴포넌트
function ToTopButton() {
    const goToTop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div id={"div-to-top-button"}>
            <div onClick={goToTop} style={{height : "100%"}} className={"d-flex justify-content-center align-items-center"}>
                <p className={"mt-3 nanumSquareB-font-XNormal"}>TOP</p>
            </div>
        </div>
    );
}

export default ToTopButton;