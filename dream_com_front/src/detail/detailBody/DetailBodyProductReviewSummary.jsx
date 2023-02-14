import React, {useEffect, useState} from "react";
import "../detailCss/DetailBodyProductReviewSummary.css"

// 전체 리뷰를 분석하여 종합적인 정보를 한눈에 모아서 보여주는 컴포넌트
function DetailBodyProductReviewSummary({productInfo, reviewRate, reviews}) {
    const [score, setScore] = useState(0); // 평균 평점
    const [reviewCount, setReviewCount] = useState(0); // 리뷰 개수
    const [stars, setStars] = useState([]); // 별점
    const [defaultStars, setDefaultStars] = useState([]); // 빈 별점
    const [reviewRateObj, setReviewRateObj] = useState({}); // 전체 평점비율을 담은 객체
    const [maxDreviewMsg, setMaxDreviewMsg] = useState({}); // 가장 높은 평점 개수를 가진 배송 리뷰
    const [maxPreviewMsg, setMaxPreviewMsg] = useState({}); // 가장 높은 평점 개수를 가진 성능 리뷰
    const [maxNreviewMsg, setMaxNreviewMsg] = useState({}); // 가장 높은 평점 개수를 가진 소음 리뷰
    
    // 리뷰를 모아 종합적인 리뷰를 생성
    const createTotalReviewSummary = () => {
        const tempDreviewMsg = {};
        let tempPreviewMsg = {};
        let tempNreviewMsg = {};

        reviews.forEach(item => {
            let dreMsg = item.dreviewMsg;
            let preMsg = item.previewMsg;
            let nreMsg = item.nreviewMsg;

            plusReviewNumber(tempDreviewMsg, dreMsg);
            plusReviewNumber(tempPreviewMsg, preMsg);
            plusReviewNumber(tempNreviewMsg, nreMsg);
        });

        setMaxDreviewMsg(getMaxReviewInfo(tempDreviewMsg));
        setMaxPreviewMsg(getMaxReviewInfo(tempPreviewMsg));
        setMaxNreviewMsg(getMaxReviewInfo(tempNreviewMsg));
    }

    // 리뷰 중 가장 개수가 많은 리뷰를 추출한다.
    const getMaxReviewInfo = (reviewObj) => {
        const maxReviewObj = {
            reviewName : "",
            number : 0,
        };
        for (let key in reviewObj) {
            if (reviewObj[key] > maxReviewObj.number) {
                maxReviewObj.reviewName = key;
                maxReviewObj.number = reviewObj[key];
            }
        }
        return maxReviewObj;
    }

    // 리뷰 내용을 키값으로 해서 리뷰 개수를 증가
    const plusReviewNumber = (reviewObj, msg) => {
        if (isNaN(reviewObj[msg])) {
            reviewObj[msg] = 1;
        } else {
            reviewObj[msg] = reviewObj[msg] + 1;
        }
    }
    
    // 평점을 기반으로 별 개수 생성
    const createStars = () => {
        let temp = [];
        let halfValue = score % 1.0;
    
        for (let i = 0; i < Math.floor(score); ++i) {
            temp.push({key: i, src: "/images/star64.png"});
            setStars(temp);
        }
    
        if (halfValue >= 0.5) {
            temp.push({key: temp.length + 1, src: "/images/starHalf64.png"});
            setStars(temp);
        }
    }
    
    // 평점을 기반으로 빈 별점 개수 생성
    const createRemindStars = () => {
        let temp = [];
        
        for (let i = 0; i < Math.floor(5 - score); ++i) {
            temp.push({key : i, src : "/images/star64_blank.png"});
        }
        
        setDefaultStars(temp);
    }
    
    // 데이터 가져오기
    useEffect(() => {
        if (productInfo == undefined) {
            return;
        }
        setScore(productInfo[0].score);
        setReviewCount(productInfo[0].reviewCount);
    }, [productInfo]);
    
    // 전체 평점비율 가져오기
    useEffect(() => {
        if (reviewRate == undefined) {
            return;
        }
        setReviewRateObj(reviewRate);
    }, [reviewRate]);
    
    // 점수가 변동되면 별 개수 생성
    useEffect(() => {
        setStars([]);
        createStars();
        createRemindStars();
    }, [score]);

    useEffect(() => {
        createTotalReviewSummary();
    }, [reviews]);
    
    return (
        <div id={"div-detail-review-summary"} className={"mb-4"}>
            <h4>구매후기 {reviewCount}건</h4>
            <div>
                <div className={"div-detail-review-summary-contents"}>
                    <p className={"mt-4"}>전체 만족도 평균 평점</p>
                    <p>
                        {
                            stars.map(item => {
                                return <img className={"mx-2 mt-4"} width={48} height={48} key={item.key} src={item.src} />
                            })
                        }
                        {
                            defaultStars.map(item => {
                                return <img className={"mx-2 mt-4"} width={48} height={48} key={item.key} src={item.src} />
                            })
                        }
                    </p>
                </div>
                <div className={"div-detail-review-summary-contents"}>
                    <p className={"mt-4"}>전체 평점비율</p>
                    <div id={"div-detail-review-progress-wrapper"}>
                        <div><progress value={reviewRateObj != undefined && reviewCount != 0 ? (reviewRateObj["5점"] / reviewCount).toFixed(1) : 0} /></div>
                        <div><progress value={reviewRateObj != undefined && reviewCount != 0 ? (reviewRateObj["4점"] / reviewCount).toFixed(1) : 0} /></div>
                        <div><progress value={reviewRateObj != undefined && reviewCount != 0 ? (reviewRateObj["3점"] / reviewCount).toFixed(1) : 0} /></div>
                        <div><progress value={reviewRateObj != undefined && reviewCount != 0 ? (reviewRateObj["2점"] / reviewCount).toFixed(1) : 0} /></div>
                        <div><progress value={reviewRateObj != undefined && reviewCount != 0 ? (reviewRateObj["1점"] / reviewCount).toFixed(1) : 0} /></div>
                    </div>
                    <div id={"div-detail-review-progress-score"}>
                        <p>5점({reviewRateObj != undefined ? reviewRateObj["5점"] : 0}명)</p>
                        <p>4점({reviewRateObj != undefined ? reviewRateObj["4점"] : 0}명)</p>
                        <p>3점({reviewRateObj != undefined ? reviewRateObj["3점"] : 0}명)</p>
                        <p>2점({reviewRateObj != undefined ? reviewRateObj["2점"] : 0}명)</p>
                        <p>1점({reviewRateObj != undefined ? reviewRateObj["1점"] : 0}명)</p>
                    </div>
                </div>
                <div className={"div-detail-review-summary-contents"}>
                    <p className={"mt-4"}>다른 구매자들은 이렇게 평가했어요</p>
                    <div>
                        <p className={"p-detail-review-summary-content-title"}>배송</p>
                        <p className={"p-detail-review-summary-content-comment"}>{maxDreviewMsg.reviewName}</p>
                        <p className={"p-detail-review-summary-content-percent"}>{
                            reviews.length != 0 ? (maxDreviewMsg.number / reviews.length * 100).toFixed() : 0
                        }%</p>
                    </div>
                    <div>
                        <p className={"p-detail-review-summary-content-title"}>성능</p>
                        <p className={"p-detail-review-summary-content-comment"}>{maxPreviewMsg.reviewName}</p>
                        <p className={"p-detail-review-summary-content-percent"}>{
                            reviews.length != 0 ? (maxPreviewMsg.number / reviews.length * 100).toFixed() : 0
                        }%</p>
                    </div>
                    <div>
                        <p className={"p-detail-review-summary-content-title"}>소음</p>
                        <p className={"p-detail-review-summary-content-comment"}>{maxNreviewMsg.reviewName}</p>
                        <p className={"p-detail-review-summary-content-percent"}>{
                            reviews.length != 0 ? (maxNreviewMsg.number / reviews.length * 100).toFixed() : 0
                        }%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailBodyProductReviewSummary;