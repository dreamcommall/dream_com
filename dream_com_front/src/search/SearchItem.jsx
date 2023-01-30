import React, {useEffect, useState} from "react";
import "../fonts/fontStyle.css"

function SearchItem({src, title, specList, averageScore, registrationDate, commentCount, price}) {
    const [stars, setStars] = useState([]);
    const [defaultStars, setDefaultStars] = useState([]); // 빈값을 표시하기위한 별점

    const createStars = () => {
        let temp = [];
        let halfValue = averageScore % 1.0;

        for(let i = 0; i < Math.floor(averageScore); ++i) {
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
        
        for (let i = 0; i < Math.floor(5 - averageScore); ++i) {
            temp.push({key : i, src : "/images/star64_blank.png"});
        }
        
        setDefaultStars(temp);
    };

    useEffect(() => {
        createStars();
        createRemindStars();
    }, []);

    return (
        <div className={"d-flex align-items-center"} style={{border : "1px solid lightgray", borderBottom : "none"}}>
            <img className={"m-3"} width={175} height={175} src={src} />
            <div style={{width : "100%"}}>
                <div className={"d-flex"}>
                    <div style={{width : "55%"}}>
                        <p className={"mb-3 nanumSquareR-font-normal"}><b>{title}</b></p>
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
                            <p className={"nanumSquareR-font-small"}>등록월 : {registrationDate}</p>
                            <span className={"mx-1 nanumSquareR-font-small"}>|</span>
                            <p className={"nanumSquareR-font-small"}>상품의견 {commentCount}건</p>
                            <span className={"mx-1 nanumSquareR-font-small"}>|</span>
                            <p className={"nanumSquareR-font-small"}>찜하기</p>
                        </div>
                    </div>
                    <div style={{width : "30%"}}></div>
                    <div style={{width : "15%"}} className={"d-flex align-items-center"}>
                        <p className={"my-0 nanumSquareR-font-normal"}><b>{price}원</b></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchItem;