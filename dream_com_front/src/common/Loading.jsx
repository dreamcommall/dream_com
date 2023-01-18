import React from "react";

// 작성자 : MoonNight285
// 로딩 이미지 중앙 가운데로 고정
// 기본값으로는 이미지가 보이지 않습니다.
const loadingStyle = {
    position : "fixed",
    top : "50%",
    left : "48%",
    zIndex : 5000,
    display : "none"
}

// 작성자 : MoonNight285
// 로딩 이미지를 보여주는 컴포넌트
function Loading() {
    return (
        <div style={loadingStyle}>
            <img src={"/images/loading.gif"} />
        </div>
    );
}

export default Loading;