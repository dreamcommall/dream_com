import React, {useEffect, useState} from "react";
import "./DetailBodyProductReviewSummary.css"

function DetailBodyProductReviewSummary({score}) {
    const [stars, setStars] = useState([]);
    const [defaultStars, setDefaultStars] = useState([]);
    
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
    
    const createRemindStars = () => {
        let temp = [];
        
        for (let i = 0; i < Math.floor(5 - score); ++i) {
            temp.push({key : i, src : "/images/star64_blank.png"});
        }
        
        setDefaultStars(temp);
    }
    
    useEffect(() => {
        createStars();
        createRemindStars();
    }, []);
    
    return (
        <div id={"div-detail-review-summary"} className={"mb-5"}>
            <h4>구매후기 25건</h4>
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