import React, {useEffect, useState} from "react";
import "../../fonts/fontStyle.css"
import "./DetailBodyProductReviewContents.css"

// 리뷰의 내용을 표시하는 컴포넌트
function DetailBodyProductReviewContents(props) {
    const [stars, setStars] = useState([]); // 별점
    const [defaultStars, setDefaultStars] = useState([]); // 빈 별점
    
    // 평점을 기반으로 별 개수 생성
    const createStars = () => {
        let temp = [];
        let halfValue = props.data.score % 1.0;

        for (let i = 0; i < Math.floor(props.data.score); ++i) {
            temp.push({key: i, src: "/images/star16.png"});
            setStars(temp);
        }

        if (halfValue >= 0.5) {
            temp.push({key: temp.length + 1, src: "/images/starHalf16.png"});
            setStars(temp);
        }
    }

    // 평점을 기반으로 빈 별점 개수 생성
    const createRemindStars = () => {
        let temp = [];

        for (let i = 0; i < Math.floor(5 - props.data.score); ++i) {
            temp.push({key : i, src : "/images/star16_blank.png"});
        }

        setDefaultStars(temp);
    }
    
    useEffect(() => {
        createStars();
        createRemindStars();
    }, [props.data.score]);
    
    return (
        <div className={"div-detail-review-contents-wrapper"}>
            <div className={"d-flex justify-content-between"}>
                <p className={"nanumSquareB-font-normal mb-1"}>{props.data.userId}</p>
                <p className={"nanumSquareR-font-normal mb-1"}>{props.data.createDt}</p>
            </div>
            <div>
                <p>
                    {
                        stars.map(item => {
                            return <img className={"img-detail-product-review-star-score"} width={16} height={16} key={item.key} src={item.src} />
                        })
                    }
                    {
                        defaultStars.map(item => {
                            return <img className={"img-detail-product-review-star-score"} width={16} height={16} key={item.key} src={item.src} />
                        })
                    }
                </p>
            </div>
            <div className={"d-flex"}>
                <p className={"p-detail-simple-review"}><span>배송</span> {props.data.dreviewMsg}</p>
                <p className={"p-detail-simple-review"}><span>성능</span> {props.data.sreviewMsg}</p>
                <p className={"p-detail-simple-review"}><span>소음</span> {props.data.nreviewMsg}</p>
                <p className={"p-detail-simple-review"}><span>포장</span> {props.data.previewMsg}</p>
            </div>
            <div id={"div-detail-review-content"}>
                <p className={"nanumSquareR-font-normal"}>{props.data.content}</p>
            </div>
            <div id={"div-detail-review-photo"}>
                <p>{props.data.imgPath}</p>
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