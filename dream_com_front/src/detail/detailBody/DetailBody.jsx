import React, {useEffect, useState} from "react";
import DetailBodyProductInfo from "./DetailBodyProductInfo";
import DetailBodyProductPurchaseTip from "./DetailBodyProductPurchaseTip";
import DetailBodyProductMainImg from "./DetailBodyProductMainImg";
import DetailBodyProductInfoSummary from "./DetailBodyProductInfoSummary";
import DetailBodyProductReviewSummary from "./DetailBodyProductReviewSummary";
import DetailBodyProductReview from "./DetailBodyProductReview";
import DetailBodyProductReviewContents from "./DetailBodyProductReviewContents";
import DetailBodyReviewPagination from "./DetailBodyReviewPagination";
import * as sessionStorageManager from "../../common/js/sessionStorageManager";

// 제품 상세페이지의 가격정보 ~ 리뷰까지 보여주는 부분을 구성하는 컴포넌트
function DetailBody({productInfo, reviewRate, reviewInfo, loginUserId, func}) {
    const [firstPage, setFirstPage] = useState(1); // 상품 리뷰의 시작 페이지 번호
    const [currentPage, setCurrentPage] = useState(1); // 상품 리뷰의 현재 페이지 번호
    const [lastPage, setLastPage] = useState(1); // 상품 리뷰의 마지막 페이지 번호
    const [reviews, setReviews] = useState([]); // 상품의 리뷰내용
    const [productNum, setProductNum] = useState(0); // 상품번호
    
    
    // 서버로부터 값 받아오기
    useEffect(() => {
        if (reviewInfo == undefined) {
            return;
        }
        setFirstPage(reviewInfo.FirstPage);
        setCurrentPage(reviewInfo.currentPage);
        setLastPage(reviewInfo.LastPage);
        setReviews(reviewInfo.reviews);
    }, [reviewInfo]);
    
    // 서버로부터 제품번호 가져오기 및 가져올때 세션 스토리지에 값 저장
    useEffect(() => {
        if (productInfo == undefined) {
            return;
        }
        sessionStorageManager.saveHistory(productInfo[0].productTitle, productInfo[0].thumbnailImg, productInfo[0].productNum);
        setProductNum(productInfo[0].productNum);
    }, [productInfo]);
    
    return (
        <div>
            <DetailBodyProductInfo productInfo={productInfo} loginUserId={loginUserId} func={func}/>
            <DetailBodyProductPurchaseTip />
            <DetailBodyProductMainImg productInfo={productInfo} />
            <DetailBodyProductInfoSummary productInfo={productInfo} />
            <DetailBodyProductReviewSummary productInfo={productInfo} reviewRate={reviewRate} reviews={reviews} />
            <DetailBodyProductReview />
            {
                reviews.map(item => {
                    return <DetailBodyProductReviewContents key={item.reviewNum} reviewData={item} funcPlusReviewLikeCount={func.plusReviewLikeCount}/>
                })
            }
            <DetailBodyReviewPagination firstPageNumber={firstPage} lastPageNumber={lastPage} currentPageNumber={currentPage} productNumber={productNum} />
        </div>
    );
}

export default DetailBody;