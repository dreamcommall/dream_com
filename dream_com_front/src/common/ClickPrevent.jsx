import React, {useEffect, useState} from "react";
import "./ClickPrevent.css"

// 로딩시 클릭을 방지하기 위한 컴포넌트
function ClickPrevent({isLoading}) {
    const [isLoad, setIsLoad] = useState(false);

    useEffect(() => {
        setIsLoad(isLoading);
    }, [isLoading]);

    return (
        <div id={"div-click-prevent"} className={isLoad == true ? "container-fluid active" : "container-fluid"}></div>
    );
}

export default ClickPrevent;