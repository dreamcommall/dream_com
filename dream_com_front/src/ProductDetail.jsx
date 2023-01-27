import React, {useState} from "react";
import axios from "axios";

function ProductDetail(){
const [product, setProduct] = useState([])
    const DetailBtn = () => {
        axios.get('http://localhost:8080/detail')
            .then((req) => {
                const {data} = req;
                setProduct(data);
            })
            .catch((err) => {
                alert('통신실패');
                console.log(err);
            })
    }

    return(
        <div>
        <button className={"btn btn-primary"} onClick={DetailBtn}>상세보기</button>
            {
                product.map((item,index) => {
                    return(
                        <p key={index}>{item.productNum}</p>
                    )
                })
            }
        </div>
    )
}

export default ProductDetail;