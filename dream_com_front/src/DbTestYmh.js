import React, {useEffect, useState} from "react";
import axios from "axios";
import {getElement} from "bootstrap/js/src/util";

function DbTestYmh() {

    const [data, setData] = useState([]);
    const [spec, setSpec] = useState([]);
    const [img, setImg] = useState([]);
    const list = [];

    const getRecentProduct = async () => {
        const getData =await axios.get('http://localhost:8080/getRecentProduct');
        for (let i = 0; i < getData.data.length; i++) {
            list.push(getData.data[i]);
        }

        setData(list);
        setSpec([]);
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

    const fullProductInfo = async () => {
        const getData =await axios.get('http://localhost:8080/fullProductInfo',{params: {productNum: data[0].productNum}});
        setData(getData.data.product);
        setSpec(getData.data.spec);
        setImg(getData.data.img);
        console.log(getData.data);
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

    const categoryProduct = () => {
        axios.get('http://localhost:8080/categoryProduct')
            .then((req) => {
                console.log(req.data);
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

    const topClickedProduct = () => {
        axios.get('http://localhost:8080/topClickedProduct')
            .then((req) => {
                console.log(req.data);
            })
            .catch((err) => {
                console.log('에러');
            })
    }

    const buy = () => {
        axios.get('http://localhost:8080/buy', {params: {userId: userId}})
            .then((req) => {
                console.log(req);
            })
            .catch((err) => {
                console.log('에러');
            })
    }

    const [userId, setUserId] = useState("");

    const change = (e) => {
        setUserId(e.target.value);
    }

    return (
        <div>
            <button className={`btn btn-primary`} onClick={getRecentProduct}>최근 5개</button>
            <button className={`btn btn-secondary`} onClick={updateProduct}>제품테이블 업데이트</button>
            <button className={`btn btn-info`} onClick={getRandomProduct}>랜덤 1개</button>
            <button className={`btn btn-warning`} onClick={fullProductInfo}>상세보기</button>
            {
                <div>
                    {data.map((item) => {
                    return(
                    <div key={item.productNum}>
                        <h3 id={item.productNum}>{item.productNum}</h3>
                        <p>{item.imgPath}</p>
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
                    {
                        img.map((item) => {
                            return(
                                <div key={item.idx}>
                                    <p>{item.imgPath}</p>
                                </div>
                            )
                        })
                    }
                </div>
            }
            <div>
                <button className={`btn btn-primary mt-5`} onClick={topClickedProduct}>클릭 수 높은 제품</button>
                <button className={`btn btn-info mt-5`} onClick={categoryProduct}>카테고리별 제품</button>
            </div>
            <div className={`pt-5`}>
                <button className={`btn btn-primary`} onClick={getWishList}>찜목록 불러오기</button>
                <button className={`btn btn-info`} onClick={updateWishList}>찜목록 업데이트</button>
                <button className={`btn btn-danger`} onClick={deleteWishList}>찜목록 삭제</button>
            </div>
            <div className={`pt-5`}>
                <input type={"text"} onChange={change} />
                <button className={`btn btn-primary`} onClick={buy}>구매</button>
            </div>
        </div>
    );
}

export default DbTestYmh;