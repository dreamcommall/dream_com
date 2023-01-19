import React, {useState} from "react";
import axios from "axios";

function Address(){
    const[addr,setAddr] = useState([]);
    const[anotherAddr, setAnotherAddr] = useState([]);
    const[newAddr,setNewAddr] = useState("");

    const handleChange = (e) => {
        setNewAddr(e.target.value);
    }

    const address = () => {
        axios.post('http://localhost:8080/address')
            .then((req) => {
                const {data} = req;
                setAddr(data);
            })
            .catch((err) => {
                alert('통신실패')
            })
    }
    const newAddress = () => {
        axios.post('http://localhost:8080/insertAddress',null,{
            params:{
                addr:newAddr
            }
        })
            .then((req) =>{
                alert('정상적으로 저장이 완료')
            })
    }

    const anotherAddress = () => {
        axios.post('http://localhost:8080/anotherAddress')
            .then((req) => {
                const anotherAddress = req.data;
                setAnotherAddr(anotherAddress);
            })
    }

    const deleteAddress = () => {
        axios.post('http://localhost:8080/deleteAddress',null,{
            params:{
                addr:newAddr
            }
        })
            .then((req)=>{
                alert('통신성공')
            })
    }

    return(
        <div>
            <button className={"btn btn-info"} onClick={address}>기존주소 검색</button>
            {
                addr.map((item,index) => {
                    return(
                        <div key={index}>
                            <p>{item.userId}</p>
                            <p>{item.addr}</p>
                        </div>
                    )
                })
            }
            <button className={"btn btn-primary"} onClick={anotherAddress}>다른 배송지 보기</button><br />
            {
                anotherAddr.map((item,index) => {
                    return(
                        <div key={index}>
                            <p>{item.userId}</p>
                            <p>{item.addr}</p>
                        </div>
                    )
                })
            }
            <label>다른 배송지 입력하기</label>
            <input className={"form-control"} value={newAddr} onChange={handleChange} />
            <button className={"btn btn-info"} onClick={newAddress}>다른배송지 저장</button>
            <button className={"btn btn-danger"} onClick={deleteAddress}>배송지 삭제</button>
        </div>
    );
}

export default Address;