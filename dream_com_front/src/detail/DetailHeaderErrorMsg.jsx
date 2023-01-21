import React from "react";
import "./DetailHeaderErrorMsg.css"

function DetailHeaderErrorMsg({errorMsg}) {
    return (
        <div className={"d-flex align-items-center"}>
            <img className={"mx-1"} width={16} height={16} src={"/images/warning.png"} />
            <p className={"my-0 p-detail-header-error-msg"}>{errorMsg}</p>
        </div>
    );
}

export default DetailHeaderErrorMsg;