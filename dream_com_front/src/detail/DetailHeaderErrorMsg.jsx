import React from "react";
import "./DetailHeaderErrorMsg.css"

// 제품을 구매할때 유의사항을 알려주는 컴포넌트
function DetailHeaderErrorMsg({errorMsg}) {
    return (
        <div className={"d-flex align-items-center"}>
            <img className={"mx-1"} width={16} height={16} src={"/images/warning.png"} />
            <p className={"my-0 p-detail-header-error-msg"}>{errorMsg}</p>
        </div>
    );
}

export default DetailHeaderErrorMsg;