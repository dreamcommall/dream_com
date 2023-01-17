import React, {useEffect, useState} from "react";
import axios from "axios";

function Test() {

    const [data, setData] = useState([]);
    const [spec, setSpec] = useState([]);
    const list = [];

    useEffect(() => {
        axios.get('http://localhost:8080/getRecentProduct')
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

    const getRecentProduct = async () => {
        const getData =await axios.get('http://localhost:8080/getRecentProduct');
        for (let i = 0; i < getData.data.length; i++) {
            list.push(getData.data[i]);
        }
        setData(list);
    }

    const getProductData10 = () => {
        axios.get('http://localhost:8080/getProductData10')
            .then((req) => {
                for (let i = 0; i < req.data.length; i++) {
                    list.push(req.data[i]);
                }
                setData(list);
                console.log(data);
            })
            .catch((err) => {
                console.log(`에러`);
            });
    }

    const updateProduct = () => {
        axios.put('http://localhost:8080/updateProduct', null, {params: {num: 11111, title: '컴퓨터2 판매', name: '마우스1', price: 10000, discount: 0, quantity: 50, delivery: "2~3일 소요", click: 0}})
            .then((req) => {
                console.log('업데이트 성공');
            })
            .catch((err) => {
                console.log(`에러`);
            });
    }

    const getRandomProduct = async () => {
        const getData =await axios.get('http://localhost:8080/getRandomProduct');
        setData(getData.data.product);
        setSpec(getData.data.spec);
    }

    const getFullProduct = async () => {
        console.log(data[0].productNum);
        const getData =await axios.get('http://localhost:8080/getFullProduct',{params: {productNum: data[0].productNum}});
        setData(getData.data.product);
        setSpec(getData.data.spec);
        console.log(getData);
    }

    const getWishList = () => {
        axios.get('http://localhost:8080/getWishList', {params: {userId: "test1"}})
            .then((req) => {
                for (let i = 0; i < req.data.length; i++) {
                    list.push(req.data[i]);
                }
                setData(list);
                console.log(data);
            })
            .catch((err) => {
                console.log('에러');
            })
    }

    const updateWishList = () => {
        axios.put('http://localhost:8080/updateWishList',null, {params: {userId: "test1", productNum: 22222}})
            .then((req) => {
                console.log(req);
            })
            .catch((err) => {
                console.log('에러');
            })
    }

    const deleteWishList = () => {
        axios.delete('http://localhost:8080/deleteWishList', {params: {userId: "test1", productNum: 22222}})
            .then((req) => {
                console.log(req);
            })
            .catch((err) => {
                console.log('에러');
            })
    }


    return (
        <div>
            <button className={`btn btn-primary`} onClick={getRecentProduct}>최근 5개</button>
            <button className={`btn btn-success`} onClick={getProductData10}>최근 10개</button>
            <button className={`btn btn-secondary`} onClick={updateProduct}>제품테이블 업데이트</button>
            <button className={`btn btn-info`} onClick={getRandomProduct}>랜덤 1개</button>
            <button className={`btn btn-warning`} onClick={getFullProduct}>상세보기</button>
            {
                <div>
                    {data.map((item) => {
                    return(
                    <div key={item.productNum}>
                    <p>{item.productNum}</p>
                    </div>
                    )
                    })}
                    {
                        spec.map((item) => {
                            return(
                                <div key={item.partNum}>
                                    <p>{item.partName}</p>
                                </div>
                            )
                        })
                    }
                </div>

            }
            <div className={`pt-5`}>
                <button className={`btn btn-primary`} onClick={getWishList}>찜목록 불러오기</button>
                <button className={`btn btn-info`} onClick={updateWishList}>찜목록 업데이트</button>
                <button className={`btn btn-danger`} onClick={deleteWishList}>찜목록 삭제</button>
            </div>
        </div>
    );
}

export default Test;