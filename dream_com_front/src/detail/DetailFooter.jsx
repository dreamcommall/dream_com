import React from "react";
import DetailFooterDeliveryInfo from "./DetailFooterDeliveryInfo";
import DetailFooterCancelInfo from "./DetailFooterCancelInfo";

function DetailFooter() {
    return (
        <div>
            <DetailFooterDeliveryInfo />
            <DetailFooterCancelInfo />
        </div>
    );
}

export default DetailFooter;