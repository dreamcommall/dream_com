import React from "react";
import "./DetailBodyProductReviewSummary.css"

function DetailBodyProductReviewSummary() {
    return (
        <div id={"div-detail-review-summary"} className={"mb-5"}>
            <h4>구매후기 25건</h4>
            <div>
                <div className={"div-detail-review-summary-contents"}>
                    <p className={"mt-4"}>전체 만족도 평점</p>
                    <p>별점</p>
                    <p>숫자</p>
                </div>
                <div className={"div-detail-review-summary-contents"}>
                    <p className={"mt-4"}>평점비율</p>
                    <div id={"div-detail-review-progress-wrapper"}>
                        <div><progress /></div>
                        <div><progress /></div>
                        <div><progress /></div>
                        <div><progress /></div>
                        <div><progress /></div>
                    </div>
                    <div id={"div-detail-review-progress-score"}>
                        <p>5점(10명)</p>
                        <p>4점(7명)</p>
                        <p>3점(5명)</p>
                        <p>2점(6명)</p>
                        <p>1점(0명)</p>
                    </div>
                </div>
                <div className={"div-detail-review-summary-contents"}>
                    <p className={"mt-4"}>다른 구매자들은 이렇게 평가했어요</p>
                    <div>
                        <p className={"p-detail-review-summary-content-title"}>상품</p>
                        <p className={"p-detail-review-summary-content-comment"}>만족해요</p>
                        <p className={"p-detail-review-summary-content-percent"}>100%</p>
                    </div>
                    <div>
                        <p className={"p-detail-review-summary-content-title"}>가격</p>
                        <p className={"p-detail-review-summary-content-comment"}>합리적이에요</p>
                        <p className={"p-detail-review-summary-content-percent"}>100%</p>
                    </div>
                    <div>
                        <p className={"p-detail-review-summary-content-title"}>배송</p>
                        <p className={"p-detail-review-summary-content-comment"}>빨라요</p>
                        <p className={"p-detail-review-summary-content-percent"}>100%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailBodyProductReviewSummary;