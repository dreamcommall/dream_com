import React from "react";
import "../fonts/fontStyle.css"

const toTopButtonStyle = {
    width : 75,
    height : 75,
    backgroundColor : "#FFD8D8",
    color : "black",
    borderRadius : "50%",
    position : "fixed",
    top : 863,
    left : 1785
}

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