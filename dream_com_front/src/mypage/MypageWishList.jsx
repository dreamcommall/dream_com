import React, {useEffect, useState} from "react";
import "./MypageWishList.css"
import axios from "axios";


function MypageWishList() {
    const [userId, setUserId] = useState(null);
    const [wishList, setWishList] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:8080/loginUserId", null, {
            params: {
                userUUID: sessionStorage.getItem("loginUUID"),
                autoUserUUID: localStorage.getItem("autoLoginUUID")
            }
        }).then(response => {
            if (response.data == null || response.data == undefined || response.data == "") {
                setUserId(null);
            } else {
                setUserId(response.data);
            }
        }).catch(err => {
            console.log(`에러메세지 : ${err}`);
            console.log("유저 아이디 취득에 실패했습니다.");
        });

        console.log(userId);

        axios.get("http://localhost:8080/getWishList", {
            params: {
                userId: userId
            }
        })
            .then((req) => {
                console.log(req.data);
                setWishList(req.data);
            })
            .catch((err) => {
                console.log(userId)
            })

    }, [userId]);

    const deleteWishList = () => {
        const inputList = document.querySelectorAll(".wishCheck");

        let productNum = [];

        for (let i = 0; i < inputList.length; i++) {
            if (inputList[i].checked == true) {
                productNum.push(inputList[i].value);
            }
        }

        axios.delete("http://localhost:8080/deleteWishList", {
            params: {
                userId: userId,
                productNum: productNum.join()
            }
        })
            .then((req) => {
                console.log(req);
                alert('해당 찜한 상품을 삭제하였습니다.')
                window.location.reload();
            })
            .catch((err) => {
                alert('선택된 상품이 없습니다.')
            })
    }

    const insertCart = () => {
        const inputList = document.querySelectorAll(".wishCheck");

        let productNum = [];

        for (let i = 0; i < inputList.length; i++) {
            if (inputList[i].checked == true) {
                productNum.push(inputList[i].value);
            }
        }

        axios.post("http://localhost:8080/insertCart", null,{
            params: {
                userId: userId,
                productNum: productNum.join(),
                quantity:1
            }
        })
            .then((req) => {
                console.log(req);
                alert('해당 찜한 상품을 장바구니에 담았습니다.')
                deleteWishList();
                window.location.reload();
            })
            .catch((err) => {
                alert('선택된 상품이 없습니다.')
            })
    }

    return (
        <div className={"container mypageWishList"}>
            <h3 className={"ms-3 nanumSquareB-font-large"}>찜목록</h3>
            <hr className={"ms-3"}/>
            <table className={"table"}>
                <tbody>
                {
                    wishList.map((item) => {
                        return (
                            <tr className={"tableWishList"}>
                                <div className={"ms-1 nanumSquareR-font-normal wishListSection"}>
                                    <input className={"float-start wishCheck"} value={item.productNum}
                                           type={"checkbox"}/>
                                    <a href={"#"}><img className={"wishImg"} src={item.carouselImg[0]}/></a>
                                    <div className={"wishListProductInfo"}>
                                        <div className={"mt-2 productDate"}>{item.productCreateDt}</div>
                                        <div className={"mt-2"}>
                                            <a href={"#"}>
                                                <div className={"mt-0"}>{item.productTitle}</div>
                                            </a>
                                        </div>
                                        <div className={"mt-2"}><strong>{item.productPrice} 원</strong></div>
                                    </div>
                                </div>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <div className={"mb-5"}>
                <button className={"addWishList"} onClick={insertCart}>장바구니 추가</button>
                <button className={"deleteWishList"} onClick={deleteWishList}>찜 해제</button>
            </div>
        </div>
    )
}

export default MypageWishList
