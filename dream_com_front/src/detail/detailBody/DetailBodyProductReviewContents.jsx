import React from "react";
import "../../fonts/fontStyle.css"
import "./DetailBodyProductReviewContents.css"

// 리뷰의 내용을 표시하는 컴포넌트
function DetailBodyProductReviewContents(props) {
    return (
        <div className={"div-detail-review-contents-wrapper"}>
            <div className={"d-flex justify-content-between"}>
                <p className={"nanumSquareB-font-normal"}>{props.data.userId}</p>
                <p className={"nanumSquareR-font-normal"}>{props.data.createDate}</p>
            </div>
            <div>
                <p>별점</p>
            </div>
            <div className={"d-flex"}>
                <p className={"p-detail-simple-review"}><span>배송</span> {props.data.deliveryReview}</p>
                <p className={"p-detail-simple-review"}><span>성능</span> {props.data.specReview}</p>
                <p className={"p-detail-simple-review"}><span>소음</span> {props.data.noiseReview}</p>
                <p className={"p-detail-simple-review"}><span>포장</span> {props.data.boxingReview}</p>
            </div>
            <div id={"div-detail-review-content"}>
                <p className={"nanumSquareR-font-normal"}>{props.data.reviewContent}</p>
            </div>
            <div id={"div-detail-review-photo"}>
                <p>사진 & 동영상</p>
            </div>
            <div className={"d-flex align-items-center mb-3"}>
                <div className={"d-flex align-items-center div-detail-review-like-wrapper"}>
                    <p className={"mb-0 mt-1 mx-1"}>좋아요</p>
                    <img width={22} height={22} className={"mb-1"} src={"/images/like.png"} />
                    <p className={"mb-0 mx-2 mt-1"}>{props.data.likeCount}</p>
                </div>
                <p className={"mx-3 my-0 nanumSquareR-font-normal"}>이 리뷰가 마음에 들면 추천을 눌러주세요!</p>
            </div>
        </div>
    );
}

export default DetailBodyProductReviewContents;