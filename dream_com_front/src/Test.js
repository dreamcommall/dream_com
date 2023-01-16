import React, {useEffect, useState} from "react";
import axios from "axios";

function Test() {

    const [data, setData] = useState([]);
    const [data1, setData1] = useState({});
    const list = [];

    useEffect(() => {
        axios.get('http://localhost:8080/getProductData')
            .then((req) => {
                console.log(data);
                for (let i = 0; i < req.data.length; i++) {
                    list.push(req.data[i]);
                }
                setData(list);
            })
            .catch((err) => {
                console.log(`에러`);
            });
    }, [])

    const recent5 = async () => {
        const getData =await axios.get('http://localhost:8080/getProductData');
        for (let i = 0; i < getData.data.length; i++) {
            list.push(getData.data[i]);
        }
        setData(list);
    }

    const recent10 = () => {
        axios.get('http://localhost:8080/getProductData10')
            .then((req) => {
                for (let i = 0; i < req.data.length; i++) {
                    list.push(req.data[i]);
                }
                setData(list);
            })
            .catch((err) => {
                console.log(`에러`);
            });
    }

    const update = () => {
        axios.put('http://localhost:8080/updateProduct', null, {params: {num: 11111, title: '컴퓨터2 판매', name: '마우스1', price: 10000, discount: 0, quantity: 50, delivery: "2~3일 소요", click: 0}})
            .then((req) => {
                console.log('업데이트 성공');
            })
            .catch((err) => {
                console.log(`에러`);
            });
    }

    const randomProd = async () => {
        const getData =await axios.get('http://localhost:8080/getProductData10');
        for (let i = 0; i < getData.data.length; i++) {
            list.push(getData.data[i]);
        }
        const random = Math.round(Math.random() * list.length);

        if (random < list.length) {
            setData1(list[random]);
        }
    }


    return (
        <div>
            <button className={`btn btn-primary`} onClick={recent5}>버튼</button>
            <button className={`btn btn-success`} onClick={recent10}>버튼</button>
            <button className={`btn btn-secondary`} onClick={update}>업데이트</button>
            <button className={`btn btn-info`} onClick={randomProd}>버튼</button>
            {
                <div>
                    {data.length > 1 && data.map((item) => {
                    return(
                    <div>
                    <p key={item.productNum}>{item.productNum}</p>
                    </div>
                    )
                    })}
                    <p>{data1.productNum}</p>
                </div>

            }
        </div>
    );
}

export default Test;