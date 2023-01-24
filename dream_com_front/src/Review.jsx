import React, {useState} from "react";
import axios from "axios";

function Review(){
    const[review, setReview] = useState([]);
    // const[score,setScore] = useState(0);
    const[productNum,setProductNum] = useState(0);
    const[content, setContent] = useState("");
    const[imgPath, setImgPath] = useState("");
    const[dReviewNum,setDReviewNum] = useState(0);
    const[sReviewNum,setSReviewNum] = useState(0);
    const[nReviewNum,setNReviewNum] = useState(0);
    const[pReviewNum,setPReviewNum] = useState(0);

    const scoreHandle = (e) => {
        setScore(e.target.value);
    }

    const productNumHandle = (e) => {
        setProductNum(e.target.value);
    }

    const contentHandle = (e) => {
        setContent(e.target.value);
    }

    const imgPathHandle = (e) => {
        setImgPath(e.target.value);
    }

    const DReviewHandle = (e) => {
        setDReviewNum(e.target.value);
    }
    const SReviewHandle = (e) => {
        setSReviewNum(e.target.value);
    }
    const NReviewHandle = (e) => {
        setNReviewNum(e.target.value);
    }
    const PReviewHandle = (e) => {
        setPReviewNum(e.target.value);
    }

    const getData = () => {
        axios.get('http://localhost:8080/review')
            .then((req) => {
                const{data} = req;
                setReview(data);
                console.log(review);
            })
            .catch((err) => {
                alert('통신실패');
            })
    }

    const insertDetailReview = () => {
        axios.get('http://localhost:8080/insertDetailReview',{
            params:{
                score:score,
                productNum:productNum,
                content:content,
                imgPath:imgPath,

                dReviewNum:dReviewNum,
                sReviewNum:sReviewNum,
                nReviewNum:nReviewNum,
                pReviewNum:pReviewNum
            }
        })
            .then((req) => {
                alert('리뷰 작성이 완료되었습니다.');
            })
    }

    return(
        <div>
            <button className={"btn btn-primary"} onClick={getData}>리뷰보기</button>
            {
                review.map((item,index) => {
                    return(
                        <div key={index}>
                            <p>리뷰 번호 : {item.reviewNum}</p>
                            <p>리뷰쓴 아이디 : {item.userId}</p>
                            <p>후기 : {item.content}</p>
                            <p>상품번호 : {item.productNum}</p>
                            <p>평점 : {item.score}</p>
                            <hr />
                            <p>배송 : {item.dreviewMsg}</p>
                            <p>성능 : {item.sreviewMsg}</p>
                            <p>소음 : {item.nreviewMsg}</p>
                            <p>포장 : {item.previewMsg}</p>
                            <hr />
                        </div>
                    )
                })
            }
            <label>평점</label>
            <input value={score} onChange={scoreHandle} />
            <label>제품번호</label>
            <input value={productNum} onChange={productNumHandle} />
            <label>후기</label>
            <input value={content} onChange={contentHandle} />
            <label>이미지 넣기</label>
            <input value={imgPath} onChange={imgPathHandle} />
            <h4>심플리뷰부분</h4>
            <label>배송 :</label>
            <input value={dReviewNum} onChange={DReviewHandle} />
            <label>성능 :</label>
            <input value={sReviewNum} onChange={SReviewHandle} />
            <label>소음 : </label>
            <input value={nReviewNum} onChange={NReviewHandle} />
            <label>포장 : </label>
            <input value={pReviewNum} onChange={PReviewHandle} />

            <button className={"btn btn-primary"} onClick={insertDetailReview}>리뷰작성</button>
        </div>
    )
}

export default Review;

