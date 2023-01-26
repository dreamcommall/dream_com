import React from "react";
import DetailFooterDeliveryInfo from "./DetailFooterDeliveryInfo";
import DetailFooterCancelInfo from "./DetailFooterCancelInfo";

// 제품 상세페이지의 하단에 배치되는 컴포넌트
function DetailFooter() {
    return (
        <div>
            <DetailFooterDeliveryInfo />
            <DetailFooterCancelInfo />
        </div>
    );
}

export default DetailFooter;