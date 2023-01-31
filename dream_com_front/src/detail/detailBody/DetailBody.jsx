import React from "react";
import DetailBodyProductInfo from "./DetailBodyProductInfo";
import DetailBodyProductPurchaseTip from "./DetailBodyProductPurchaseTip";
import DetailBodyProductMainImg from "./DetailBodyProductMainImg";
import DetailBodyProductInfoSummary from "./DetailBodyProductInfoSummary";
import DetailBodyProductReviewSummary from "./DetailBodyProductReviewSummary";
import DetailBodyProductReview from "./DetailBodyProductReview";
import DetailBodyProductReviewContents from "./DetailBodyProductReviewContents";
import DetailBodyReviewPagination from "./DetailBodyReviewPagination";

const sampleReviewContentList = [
    {key : 0, userId : "testUser1", createDate : "2023-01-26", deliveryReview : "배송이 빨라요", specReview : "좋아요" ,
        noiseReview : "조용해요", boxingReview : "깔끔해요", reviewContent : "테스트1 리뷰입니다.", likeCount : 5},
    {key : 1, userId : "testUser2", createDate : "2023-01-25", deliveryReview : "배송이 빨라요", specReview : "좋아요" ,
        noiseReview : "조용해요", boxingReview : "깔끔해요", reviewContent : "테스트2 리뷰입니다.", likeCount : 0},
    {key : 2, userId : "testUser3", createDate : "2023-01-24", deliveryReview : "배송이 빨라요", specReview : "좋아요" ,
        noiseReview : "조용해요", boxingReview : "깔끔해요", reviewContent : "테스트3 리뷰입니다.", likeCount : 32},
    {key : 3, userId : "testUser3", createDate : "2023-01-24", deliveryReview : "배송이 빨라요", specReview : "좋아요" ,
        noiseReview : "조용해요", boxingReview : "깔끔해요", reviewContent : "테스트3 리뷰입니다.", likeCount : 32},
    {key : 4, userId : "testUser3", createDate : "2023-01-24", deliveryReview : "배송이 빨라요", specReview : "좋아요" ,
        noiseReview : "조용해요", boxingReview : "깔끔해요", reviewContent : "테스트3 리뷰입니다.", likeCount : 32}
]

// 제품 상세페이지의 가격정보 ~ 리뷰까지 보여주는 부분을 구성하는 컴포넌트
function DetailBody(props) {
    return (
        <div>
            <DetailBodyProductInfo data={props}/>
            <DetailBodyProductPurchaseTip />
            <DetailBodyProductMainImg src={"/images/product_test_main_img.jpg"} />
            <DetailBodyProductInfoSummary />
            <DetailBodyProductReviewSummary score={3.8} />
            <DetailBodyProductReview />
            {
                sampleReviewContentList.map(item => {
                    return <DetailBodyProductReviewContents key={item.key} data={item}/>
                })
            }
            <DetailBodyReviewPagination />
        </div>
    );
}

export default DetailBody;