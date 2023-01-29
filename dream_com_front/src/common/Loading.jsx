import React, {useEffect, useState} from "react";
import "./Loading.css"

// 작성자 : MoonNight285
// 로딩 이미지를 보여주는 컴포넌트
function Loading({loadStatus}) {
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        setIsLoad(loadStatus);
    }, [loadStatus]);

    return (
        <div id={"div-loading-wrapper"} className={isLoad == true ? "active" : ""}>
            <img src={"/images/loading.gif"} />
        </div>
    );
}

export default Loading;