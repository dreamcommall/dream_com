import React, {useState} from "react";
import axios from "axios";

function Review(){
    const[review, setReview] = useState([]);

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

    return(
        <div>
            <button className={"btn btn-primary"} onClick={getData}>리뷰보기</button>
            {
                review.map((item,index) => {
                    return(
                        <div key={index}>
                            <p>{item.reviewNum}</p>
                            <p>{item.userId}</p>
                            <p>{item.content}</p>
                            <p>{item.productNum}</p>
                            <p>{item.score}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Review;