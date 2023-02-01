import React, {useEffect, useState} from "react";
import "../fonts/fontStyle.css"

function SearchItem({searchItemInfo}) {
    const [stars, setStars] = useState([]);
    const [defaultStars, setDefaultStars] = useState([]); // 빈값을 표시하기위한 별점
    const [score, setScore] = useState(0); // 평균평점
    const [specList, setSpecList] = useState([]); // 제품의 성능이 담긴 배열
    const [thumbnailImg, setThumbnailImg] = useState(""); // 제품의 섬네일 이미지 경로
    const [productTitle, setProductTitle] = useState(""); // 제품의 판매글 명
    const [productCreateDt, setProductCreateDt] = useState(""); // 제품 판매 등록일
    const [reviewCount, setReviewCount] = useState(0); // 제품 리뷰 글 개수
    const [productDiscount, setProductDiscount] = useState(0); // 제품 할인율
    const [productPrice, setProductPrice] = useState(0); // 제품 가격

    const createStars = () => {
        let temp = [];
        let halfValue = score % 1.0;

        for(let i = 0; i < Math.floor(score); ++i) {
            temp.push({key : i, src : "/images/star16.png"});
            setStars(temp);
        }

        if (halfValue >= 0.5) {
            temp.push({key : temp.length + 1, src : "/images/starHalf16.png"});
            setStars(temp);
        }
    };
    
    const createRemindStars = () => {
        let temp = [];
        
        for (let i = 0; i < Math.floor(5 - score); ++i) {
            temp.push({key : i, src : "/images/star64_blank.png"});
        }
        
        setDefaultStars(temp);
    };

    useEffect( () => {
        if (searchItemInfo == undefined) {
            return;
        }
        setScore(searchItemInfo.score);
        setSpecList(searchItemInfo.partName);
        setThumbnailImg(searchItemInfo.thumbnailImg);
        setProductTitle(searchItemInfo.productTitle);
        setProductCreateDt(searchItemInfo.productCreateDt);
        setReviewCount(searchItemInfo.reviewCount);
        setProductDiscount(searchItemInfo.productDiscount);
        setProductPrice(searchItemInfo.productPrice);
    }, [searchItemInfo]);

    useEffect(() => {
        setStars([]);
        setDefaultStars([]);
        createStars();
        createRemindStars();
    }, [score]);

    return (
        <div className={"d-flex align-items-center"} style={{border : "1px solid lightgray", borderBottom : "none"}}>
            <img className={"m-3"} width={175} height={175} src={thumbnailImg} />
            <div style={{width : "100%"}}>
                <div className={"d-flex"}>
                    <div style={{width : "55%"}}>
                        <p className={"my-2 nanumSquareR-font-normal"}><b>{productTitle}</b></p>
                        <p className={"mb-1 nanumSquareR-font-small"}>
                            {
                                specList.map(item => {
                                    return <span key={item} className={"my-0"}>{item + "/"}</span>;
                                })
                            }
                        </p>
                        <div className={"d-flex align-items-center"}>
                            <p className={"mb-1 nanumSquareR-font-small"}>평균별점 :
                                {
                                    stars.map(item => {
                                        return item.src == "/images/star16.png" ? <img key={item.key} style={{marginBottom : 3, marginLeft : 3}} src={"/images/star16.png"} /> :
                                            <img key={item.key} style={{marginBottom : 3, marginLeft : 3}} src={"/images/starHalf16.png"} />
                                    })
                                }
                                {
                                    defaultStars.map(item => {
                                        return <img key={item.key} style={{marginBottom : 3, marginLeft : 3}} src={"/images/star16_blank.png"} />
                                    })
                                }
                            </p>
                        </div>
                        <div className={"d-flex"}>
                            <p className={"nanumSquareR-font-small"}>등록월 : {productCreateDt}</p>
                            <span className={"mx-1 nanumSquareR-font-small"}>|</span>
                            <p className={"nanumSquareR-font-small"}>상품의견 {reviewCount}건</p>
                            <span className={"mx-1 nanumSquareR-font-small"}>|</span>
                            <p className={"nanumSquareR-font-small"}>찜하기</p>
                        </div>
                    </div>
                    <div style={{width : "30%"}}></div>
                    <div style={{width : "15%"}} className={"d-flex align-items-center"}>
                        <div>
                            {
                                productDiscount == 0 ? null : <p style={{color : "red"}} className={"my-0 nanumSquareB-font-normal"}>{productDiscount}% 할인</p>
                            }
                            <p className={"my-0 nanumSquareR-font-normal"}><b>{productPrice}원</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;