import React, {useState} from "react";
import axios from "axios";

function SelectCart(){
    const [data,setData] = useState([]);

    const sendData = () => {
    axios.get('http://localhost:8080/selectCart')
        .then((req) => {
            const {data} = req;
            setData(data);
        })
        .catch((err) => {
            alert('통신실패')
        })
    }



    return(
        <div>
            <button className={"btn btn-primary"} onClick={sendData}>장바구니 보기</button>
            {
                data.map((item,index) => {
                    return(
                        <div key={index}>
                            <p>상품명 : {item.productName}</p>
                            <p>이미지 : {item.imgPath}</p>
                            <p>가격 : {item.productPrice}</p>
                            <p>수량 : {item.quantity}</p>
                            <p>할인률 : {item.productDiscount}%</p>
                            <p>배송 소요시간 : {item.deliveryInfo}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default SelectCart;