import React, {useState} from "react";
import axios from "axios";

function InsertCart(){
    const [quantity,setQuantity] = useState(1);
    const [productNum,setProductNum] = useState(11111);

    const quantityhandle = (e) => {
        setQuantity(e.target.value)
    }

    const productNumHandle = (e) => {
        setProductNum(e.target.value)
    }

    const insertCart = () => {
        axios.get('http://localhost:8080/insertCart',{
            params:{
                quantity:quantity,
                productNum:productNum
            }
        })
            .then((req) => {
                alert('통신성공')
            })
            .catch((err)=> {
                alert('통신실패')
            })
    }

    const deleteCart = () => {
        axios.get('http://localhost:8080/deleteCart',{
            params:{
                quantity:quantity,
                productNum:productNum
            }
        })
            .then((req) => {
                alert('장바구니 삭제 완료');
            })
            .catch((err) => {
                alert('통신실패')
            })
    }

    const updateCart = () => {
        axios.get('http://localhost:8080/updateCart',{
            params:{
                quantity:quantity,
                productNum:productNum
            }
        })
            .then((req)=>{
                alert('업데이트 완료')
            })
    }

    return(
        <div className={"container"}>
            <label className={"form-label"}>상품명 : </label>
            <input value={productNum} onChange={productNumHandle}/>
            <label className={"form-control"}>개수 : </label>
            <input value={quantity} onChange={quantityhandle}/>
            <button className={"btn btn-success"} onClick={insertCart}>장바구니 넣기</button>
            <button className={"btn btn-info"} onClick={deleteCart}>장바구니 삭제버튼</button>
            <button className={"btn btn-danger"} onClick={updateCart}>장바구니 업데이트 버튼</button>

        </div>
    );

}

export default InsertCart;